import { prisma } from "../lib/prisma.js";
import { slugify } from "../utils/slug.js";
import { fail, ok } from "../utils/response.js";

const productInclude = {
  emotionalTag: true,
};

export const list = async (req, res) => {
  const { published, tagId, tagSlug, page = 1, limit = 12 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const where = {};

  if (req.user?.role === "ADMIN") {
    if (published === "true") where.published = true;
    else if (published === "false") where.published = false;
  } else if (published === "true" || published !== "false") {
    where.published = true;
  } else if (published === "false") {
    where.published = false;
  }

  if (tagId) {
    where.emotionalTagId = Number(tagId);
  }
  if (tagSlug) {
    where.emotionalTag = { slug: tagSlug };
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: productInclude,
      orderBy: [{ mindHealNo: "asc" }, { sortOrder: "asc" }],
      skip,
      take: Number(limit),
    }),
    prisma.product.count({ where }),
  ]);

  return ok(res, {
    products,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  });
};

export const getById = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(req.params.id) },
    include: productInclude,
  });
  if (!product) return fail(res, "Product not found", 404);
  return ok(res, product);
};

export const getBySlug = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { slug: req.params.slug },
    include: productInclude,
  });
  if (!product) return fail(res, "Product not found", 404);
  return ok(res, product);
};

export const create = async (req, res) => {
  const {
    name,
    slug,
    mindHealNo,
    description,
    mrp,
    price,
    image,
    published,
    sortOrder,
    emotionalTagId,
  } = req.body;

  if (!name) return fail(res, "Name is required");
  if (!mindHealNo) return fail(res, "Mind Heal No is required");

  const existingNo = await prisma.product.findUnique({
    where: { mindHealNo: String(mindHealNo) },
  });
  if (existingNo) return fail(res, "Mind Heal No already exists", 409);

  const product = await prisma.product.create({
    data: {
      name,
      mindHealNo: String(mindHealNo),
      slug: slug || slugify(name),
      description,
      mrp: mrp != null ? mrp : 400,
      price: price != null ? price : 250,
      image,
      published: published ?? true,
      sortOrder: sortOrder ?? 0,
      emotionalTagId: emotionalTagId ? Number(emotionalTagId) : null,
    },
    include: productInclude,
  });

  return ok(res, product, 201);
};

export const update = async (req, res) => {
  const id = Number(req.params.id);
  const {
    name,
    slug,
    mindHealNo,
    description,
    mrp,
    price,
    image,
    published,
    sortOrder,
    emotionalTagId,
  } = req.body;

  if (mindHealNo) {
    const duplicate = await prisma.product.findFirst({
      where: {
        mindHealNo: String(mindHealNo),
        NOT: { id },
      },
    });
    if (duplicate) return fail(res, "Mind Heal No already exists", 409);
  }

  const data = {
    ...(name && { name }),
    ...(slug && { slug }),
    ...(mindHealNo && { mindHealNo: String(mindHealNo) }),
    ...(description !== undefined && { description }),
    ...(mrp !== undefined && { mrp }),
    ...(price !== undefined && { price }),
    ...(image !== undefined && { image }),
    ...(published !== undefined && { published }),
    ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
    ...(emotionalTagId !== undefined && {
      emotionalTagId: emotionalTagId ? Number(emotionalTagId) : null,
    }),
  };

  const product = await prisma.product.update({
    where: { id },
    data,
    include: productInclude,
  });

  return ok(res, product);
};

export const remove = async (req, res) => {
  await prisma.product.delete({ where: { id: Number(req.params.id) } });
  return ok(res, { message: "Product deleted" });
};
