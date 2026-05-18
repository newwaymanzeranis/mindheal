import { useEffect, useState } from "react";
import { Link } from "react-router";

import PageTitle from "~/components/PageTitle";
import RequireAuth from "~/components/RequireAuth";
import { useAuth } from "~/context/AuthContext";
import { ordersApi } from "~/lib/api";
import { formatPrice } from "~/utils/format";
import { STATUS_LABELS, orderStatusBadgeClass } from "~/utils/orderStatus";

import cartCss from "~/styles/cart.css?url";

export const links = () => [{ rel: "stylesheet", href: cartCss }];

function OrdersList() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    setLoading(true);
    ordersApi
      .list()
      .then((data) => setOrders(data.orders))
      .catch((err) => setError(err.message || "Could not load orders"))
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-3">You have not placed any orders yet.</p>
        <Link to="/buy_mh_mix" className="btn btn-success">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-items-card">
      <ul className="order-history-list">
        {orders.map((order) => (
          <li key={order.id} className="order-history-item">
            <div>
              <Link to={`/orders/${order.id}`} className="order-history-number">
                {order.orderNumber}
              </Link>
              <span className="text-muted small d-block">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="text-end">
              <span className={orderStatusBadgeClass(order.status)}>
                {STATUS_LABELS[order.status] || order.status}
              </span>
              <div>
                <strong>{formatPrice(Number(order.subtotal))}</strong>
                <span className="small text-muted d-block">COD</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AccountOrdersPage() {
  return (
    <main className="main">
      <PageTitle
        title="My Orders"
        description="Your Mind Heal orders"
        current="My Orders"
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

      <section className="section cart-page">
        <div className="container">
          <RequireAuth>
            <OrdersList />
          </RequireAuth>
        </div>
      </section>
    </main>
  );
}
