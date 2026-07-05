import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import PageTitle from "~/components/PageTitle";
import RequireAuth from "~/components/RequireAuth";
import { ordersApi } from "~/lib/api";
import { formatPrice, productMindHealLabel } from "~/utils/format";
import { buildPageMeta } from "~/utils/seo";
import { STATUS_LABELS, orderStatusBadgeClass } from "~/utils/orderStatus";

import cartCss from "~/styles/cart.css?url";

export const links = () => [{ rel: "stylesheet", href: cartCss }];

export function meta() {
  return buildPageMeta({
    title: "Order Details",
    description: "View your Mind Heal order details.",
    path: "/orders",
    noindex: true,
  });
}

const STATUS_DETAIL_LABELS = {
  ...STATUS_LABELS,
  PENDING: "Pending confirmation",
};

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi
      .get(id)
      .then((data) => setOrder(data.order))
      .catch((err) => setError(err.message || "Could not load order"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-5">
        <p className="text-danger">{error || "Order not found"}</p>
        <Link to="/account/orders" className="btn btn-success">
          My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="order-success-card text-center mb-4">
          <i className="bi bi-check-circle-fill text-success display-4" />
          <h2 className="h4 mt-3">Order placed successfully!</h2>
          <p className="text-muted mb-0">
            Order <strong>{order.orderNumber}</strong> · Cash on Delivery
          </p>
        </div>

        <div className="cart-items-card mb-4">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
            <div>
              <h3 className="h6 text-muted mb-1">Status</h3>
              <span className={orderStatusBadgeClass(order.status)}>
                {STATUS_DETAIL_LABELS[order.status] || order.status}
              </span>
            </div>
            <div className="text-end">
              <h3 className="h6 text-muted mb-1">Amount due on delivery</h3>
              <strong className="fs-5 text-success">
                {formatPrice(Number(order.subtotal))}
              </strong>
            </div>
          </div>

          <h3 className="h6 mb-2">Delivery to</h3>
          <p className="mb-0">
            {order.shippingName}
            <br />
            {order.shippingAddress}
            <br />
            {order.city}
            {order.state ? `, ${order.state}` : ""} — {order.pincode}
            <br />
            Phone: {order.phone}
          </p>
        </div>

        <div className="cart-items-card">
          <h3 className="h6 mb-3">Items</h3>
          <ul className="checkout-item-list">
            {order.items.map((item) => (
              <li key={item.id} className="checkout-item">
                <span>
                  {productMindHealLabel(item.mindHealNo)} — {item.name} ×{" "}
                  {item.quantity}
                </span>
                <span>
                  {formatPrice(Number(item.unitPrice) * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="cart-summary-row cart-summary-total mt-3">
            <span>Total (COD)</span>
            <strong>{formatPrice(Number(order.subtotal))}</strong>
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 mt-4 justify-content-center">
          <Link to="/buy_mh_mix" className="btn btn-success">
            Continue Shopping
          </Link>
          <Link to="/account/orders" className="btn btn-outline-success">
            My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="main">
      <PageTitle
        title="Order Confirmed"
        description="Thank you for your order"
        current="Order"
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

      <section className="section cart-page">
        <div className="container">
          <RequireAuth>
            <OrderDetail />
          </RequireAuth>
        </div>
      </section>
    </main>
  );
}
