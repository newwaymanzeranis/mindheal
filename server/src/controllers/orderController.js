import { prisma } from "../lib/prisma.js";
import {
  sendOrderPlacedEmail,
  sendOrderStatusChangeEmail,
} from "../services/emailService.js";
import { generateOrderNumber } from "../utils/orderNumber.js";
import { fail, ok } from "../utils/response.js";

const orderInclude = {
  items: {
    include: {
      product: {
        select: { id: true, slug: true, image: true },
      },
    },
  },
  user: {
    select: { id: true, email: true, name: true },
  },
};

export const create = async (req, res) => {
  const {
    items,
    phone,
    shippingName,
    shippingAddress,
    city,
    state,
    pincode,
    notes,
  } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return fail(res, "Cart is empty");
  }

  if (!phone || !shippingName || !shippingAddress || !city || !pincode) {
    return fail(res, "Please fill all required delivery details");
  }

  const qtyByProduct = new Map();
  for (const item of items) {
    const productId = Number(item.productId);
    if (!productId) return fail(res, "Invalid cart items");
    const qty = Math.max(1, Math.min(99, Number(item.quantity) || 1));
    qtyByProduct.set(productId, (qtyByProduct.get(productId) || 0) + qty);
  }

  const productIds = [...qtyByProduct.keys()];
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, published: true },
  });

  if (products.length !== productIds.length) {
    return fail(res, "Some products are unavailable");
  }

  const orderItems = [];
  let subtotal = 0;
  let totalMrp = 0;

  for (const [productId, qty] of qtyByProduct) {
    const product = products.find((p) => p.id === productId);
    const unitPrice = Number(product.price);
    const unitMrp = Number(product.mrp);

    orderItems.push({
      productId: product.id,
      name: product.name,
      mindHealNo: product.mindHealNo,
      quantity: qty,
      unitPrice,
      unitMrp,
    });

    subtotal += unitPrice * qty;
    totalMrp += unitMrp * qty;
  }

  const orderNumber = await generateOrderNumber();

  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: req.user.id,
      paymentMethod: "COD",
      status: "PENDING",
      phone: String(phone).trim(),
      shippingName: String(shippingName).trim(),
      shippingAddress: String(shippingAddress).trim(),
      city: String(city).trim(),
      state: state ? String(state).trim() : null,
      pincode: String(pincode).trim(),
      notes: notes ? String(notes).trim() : null,
      subtotal,
      totalMrp,
      totalSavings: totalMrp - subtotal,
      items: { create: orderItems },
    },
    include: orderInclude,
  });

  sendOrderPlacedEmail(order).catch((err) =>
    console.error("[order.create] email error:", err.message)
  );

  return ok(res, { order }, 201);
};

/** Logged-in user's own orders only (account page). */
export const list = async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return ok(res, { orders });
};

const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

/** Admin dashboard: counts and revenue by order status. */
export const dashboardStats = async (req, res) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [grouped, activeTotals, newToday, recentOrders] = await Promise.all([
    prisma.order.groupBy({
      by: ["status"],
      _count: { id: true },
      _sum: { subtotal: true },
    }),
    prisma.order.aggregate({
      where: { status: { not: "CANCELLED" } },
      _count: { id: true },
      _sum: { subtotal: true },
    }),
    prisma.order.count({
      where: {
        status: "PENDING",
        createdAt: { gte: startOfToday },
      },
    }),
    prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        subtotal: true,
        shippingName: true,
        createdAt: true,
        user: { select: { name: true, email: true } },
      },
    }),
  ]);

  const byStatus = Object.fromEntries(
    ORDER_STATUSES.map((status) => [
      status,
      { count: 0, amount: 0 },
    ])
  );

  for (const row of grouped) {
    byStatus[row.status] = {
      count: row._count.id,
      amount: Number(row._sum.subtotal ?? 0),
    };
  }

  const inPipeline =
    byStatus.PENDING.count +
    byStatus.CONFIRMED.count +
    byStatus.SHIPPED.count;

  return ok(res, {
    byStatus,
    totals: {
      orders: activeTotals._count.id,
      revenue: Number(activeTotals._sum.subtotal ?? 0),
      allOrders:
        Object.values(byStatus).reduce((n, s) => n + s.count, 0),
    },
    newToday,
    inPipeline,
    recentOrders: recentOrders.map((o) => ({
      ...o,
      subtotal: Number(o.subtotal),
    })),
  });
};

/** All orders — admin panel only. */
export const listAll = async (req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
      user: {
        select: { id: true, email: true, name: true, phone: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  return ok(res, { orders });
};

export const getOne = async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return fail(res, "Invalid order id");

  const order = await prisma.order.findUnique({
    where: { id },
    include: orderInclude,
  });

  if (!order) return fail(res, "Order not found", 404);
  if (req.user.role !== "ADMIN" && order.userId !== req.user.id) {
    return fail(res, "Forbidden", 403);
  }

  return ok(res, { order });
};

export const updateStatus = async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const allowed = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];
  if (!allowed.includes(status)) {
    return fail(res, "Invalid status");
  }

  const existing = await prisma.order.findUnique({ where: { id } });
  if (!existing) return fail(res, "Order not found", 404);

  const order = await prisma.order.update({
    where: { id },
    data: { status },
    include: orderInclude,
  });

  const notifyStatuses = ["CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];
  if (existing.status !== status && notifyStatuses.includes(status)) {
    sendOrderStatusChangeEmail(order, status).catch((err) =>
      console.error("[order.updateStatus] email error:", err.message)
    );
  }

  return ok(res, { order });
};
