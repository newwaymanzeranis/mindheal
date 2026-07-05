import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import PageTitle from "~/components/PageTitle";
import RequireAuth from "~/components/RequireAuth";
import { useAuth } from "~/context/AuthContext";
import { useCart } from "~/context/CartContext";
import { ordersApi } from "~/lib/api";
import { formatPrice, productMindHealLabel } from "~/utils/format";
import { buildPageMeta } from "~/utils/seo";

import cartCss from "~/styles/cart.css?url";

export const links = () => [{ rel: "stylesheet", href: cartCss }];

export function meta() {
  return buildPageMeta({
    title: "Checkout",
    description: "Complete your Mind Heal Bach Flower remedy order with Cash on Delivery.",
    path: "/checkout",
    noindex: true,
  });
}

function CheckoutForm() {
  const { user } = useAuth();
  const { items, subtotal, totalMrp, totalSavings, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shippingName: "",
    phone: "",
    shippingAddress: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      shippingName: prev.shippingName || user.name || "",
      phone: prev.phone || user.phone || "",
    }));
  }, [user]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-3">Your cart is empty.</p>
        <Link to="/buy_mh_mix" className="btn btn-success">
          Shop Mind Heal Mix
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { order } = await ordersApi.create({
        items: items.map((i) => ({
          productId: i.id,
          quantity: i.quantity,
        })),
        ...form,
      });
      clearCart();
      navigate(`/orders/${order.id}`, { replace: true });
    } catch (err) {
      setError(err.message || "Could not place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row g-4">
      <div className="col-lg-7">
        <div className="cart-items-card">
          <h2 className="h5 mb-3">Delivery Details</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} id="checkout-form">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="shippingName">
                  Full name *
                </label>
                <input
                  id="shippingName"
                  className="form-control"
                  value={form.shippingName}
                  onChange={(e) => update("shippingName", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="phone">
                  Phone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="form-control"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="shippingAddress">
                  Address *
                </label>
                <textarea
                  id="shippingAddress"
                  className="form-control"
                  rows={3}
                  value={form.shippingAddress}
                  onChange={(e) => update("shippingAddress", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="city">
                  City *
                </label>
                <input
                  id="city"
                  className="form-control"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="state">
                  State
                </label>
                <input
                  id="state"
                  className="form-control"
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="pincode">
                  PIN code *
                </label>
                <input
                  id="pincode"
                  className="form-control"
                  value={form.pincode}
                  onChange={(e) => update("pincode", e.target.value)}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="notes">
                  Order notes (optional)
                </label>
                <textarea
                  id="notes"
                  className="form-control"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="col-lg-5">
        <div className="cart-summary">
          <h2 className="h5">Order Summary</h2>
          <ul className="checkout-item-list mb-3">
            {items.map((item) => (
              <li key={item.id} className="checkout-item">
                <span>
                  {productMindHealLabel(item.mindHealNo)} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="cart-summary-row">
            <span>MRP Total</span>
            <span className="text-muted text-decoration-line-through">
              {formatPrice(totalMrp)}
            </span>
          </div>
          <div className="cart-summary-row text-success">
            <span>You save</span>
            <strong>{formatPrice(totalSavings)}</strong>
          </div>
          <div className="cart-summary-row cart-summary-total">
            <span>Pay on delivery</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>

          <div className="checkout-cod-badge">
            <i className="bi bi-cash-coin me-2" />
            Cash on Delivery (COD)
          </div>
          <p className="small text-muted mb-0">
            Pay {formatPrice(subtotal)} when your order is delivered.
          </p>

          <button
            type="submit"
            form="checkout-form"
            className="btn btn-success w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Placing order..." : "Place COD Order"}
          </button>
          <Link to="/cart" className="btn btn-outline-success w-100 mt-2">
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="main">
      <PageTitle
        title="Checkout"
        description="Cash on Delivery — Mind Heal Bach Flower Mixtures"
        current="Checkout"
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

      <section className="section cart-page checkout-page">
        <div className="container">
          <RequireAuth>
            <CheckoutForm />
          </RequireAuth>
        </div>
      </section>
    </main>
  );
}
