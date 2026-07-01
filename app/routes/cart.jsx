import { Link } from "react-router";

import ProductPrice from "~/components/ProductPrice";
import { useAuth } from "~/context/AuthContext";
import { useCart } from "~/context/CartContext";
import { formatPrice, productMindHealLabel } from "~/utils/format";
import { buildAuthRedirectUrl } from "~/utils/navigation";

import cartCss from "~/styles/cart.css?url";

export const links = () => [{ rel: "stylesheet", href: cartCss }];

const HERO_STATS = [
  { icon: "bi-bag-heart", label: "Bach Flower Mixes" },
  { icon: "bi-percent", label: "38% Off Every Mix" },
  { icon: "bi-truck", label: "Cash on Delivery" },
];

export function meta() {
  return [
    { title: "Your Cart | Mind Heal" },
    {
      name: "description",
      content: "Review your Mind Heal Bach Flower mixtures before checkout with Cash on Delivery.",
    },
  ];
}

function CartHero({ itemCount }) {
  return (
    <section className="cp-hero">
      <div className="cp-hero-glow" aria-hidden />
      <div className="cp-hero-glow cp-hero-glow--left" aria-hidden />
      <div className="container">
        <div className="cp-hero-logo" aria-hidden>
          <img
            src="/assets/img/mind-heal-logo-vertical-white.png"
            alt=""
          />
        </div>

        <h1 className="cp-hero-title">Your Cart</h1>

        <p className="cp-hero-lead">
          Review your Mind Heal mixtures before checkout — gentle healing,
          delivered to your door.
        </p>

        <div className="cp-hero-stats">
          {HERO_STATS.map((stat) => (
            <span className="cp-stat" key={stat.label}>
              <i className={`bi ${stat.icon}`} />
              {stat.label}
            </span>
          ))}
          {itemCount > 0 && (
            <span className="cp-stat">
              <i className="bi bi-cart-check" />
              {itemCount} {itemCount === 1 ? "Item" : "Items"}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const {
    items,
    hydrated,
    subtotal,
    totalMrp,
    totalSavings,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const loginHref = buildAuthRedirectUrl("/login", "/checkout");
  const registerHref = buildAuthRedirectUrl("/register", "/checkout");

  if (!hydrated) {
    return (
      <main className="main cp-page">
        <CartHero itemCount={0} />
        <section className="cp-main">
          <div className="container">
            <div className="cp-loading">
              <div className="spinner-border" role="status" />
              <p className="mt-3 mb-0">Loading your cart…</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="main cp-page">
      <CartHero itemCount={items.length} />

      <section className="cp-main cart-page">
        <div className="container">
          {items.length === 0 ? (
            <div className="cp-empty">
              <div className="cp-empty-icon">
                <i className="bi bi-cart-x" />
              </div>
              <h2>Your cart is empty</h2>
              <p>
                Browse our Bach Flower mixtures and add your favourites to begin
                your healing journey.
              </p>
              <Link to="/buy_mh_mix" className="cp-btn cp-btn--primary">
                <i className="bi bi-bag-heart" />
                Shop Mind Heal Mix
              </Link>
            </div>
          ) : (
            <div className="cp-layout">
              <div className="cp-items">
                <div className="cart-items-card">
                  <div className="cp-items-head">
                    <h2>
                      <i className="bi bi-cart3" />
                      Cart Items ({items.length})
                    </h2>
                    <button
                      type="button"
                      className="cp-clear-btn"
                      onClick={clearCart}
                    >
                      <i className="bi bi-trash3" />
                      Clear cart
                    </button>
                  </div>

                  <ul className="cart-item-list">
                    {items.map((item) => (
                      <li key={item.id} className="cart-item">
                        <div className="cart-item-img-wrap">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item-img"
                          />
                        </div>

                        <div className="cart-item-info">
                          <span className="cart-item-mh">
                            {productMindHealLabel(item.mindHealNo)}
                          </span>
                          <h3 className="cart-item-title">{item.name}</h3>
                          <ProductPrice
                            product={{ price: item.price, mrp: item.mrp }}
                          />
                        </div>

                        <div className="cart-item-qty">
                          <label
                            className="visually-hidden"
                            htmlFor={`qty-${item.id}`}
                          >
                            Quantity
                          </label>
                          <button
                            type="button"
                            className="cp-qty-btn"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <input
                            id={`qty-${item.id}`}
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, Number(e.target.value))
                            }
                            className="cart-qty-input"
                          />
                          <button
                            type="button"
                            className="cp-qty-btn"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="cart-item-total">
                          <strong>{formatPrice(item.price * item.quantity)}</strong>
                          <button
                            type="button"
                            className="cp-remove-btn"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="bi bi-x-lg" />
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside className="cp-sidebar">
                <div className="cart-summary">
                  <h2 className="cp-summary-title">
                    <i className="bi bi-receipt" />
                    Order Summary
                  </h2>

                  <div className="cart-summary-row">
                    <span>MRP Total</span>
                    <span className="cp-mrp">{formatPrice(totalMrp)}</span>
                  </div>
                  <div className="cart-summary-row cp-savings">
                    <span>You save</span>
                    <strong>{formatPrice(totalSavings)}</strong>
                  </div>
                  <div className="cart-summary-row cart-summary-total">
                    <span>Subtotal</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>

                  <p className="cart-summary-note">
                    <i className="bi bi-info-circle" />
                    MRP ₹400 per mix · Special price ₹250 each
                  </p>

                  <div className="cp-cod-badge">
                    <i className="bi bi-truck" />
                    Cash on Delivery available
                  </div>

                  {isAuthenticated ? (
                    <Link to="/checkout" className="cp-btn cp-btn--primary">
                      <i className="bi bi-bag-check" />
                      Proceed to Checkout (COD)
                    </Link>
                  ) : (
                    <>
                      <Link to={loginHref} className="cp-btn cp-btn--primary">
                        <i className="bi bi-box-arrow-in-right" />
                        Login to Checkout
                      </Link>
                      <Link
                        to={registerHref}
                        className="cp-btn cp-btn--outline"
                      >
                        <i className="bi bi-person-plus" />
                        Create Account &amp; Checkout
                      </Link>
                    </>
                  )}

                  <Link to="/buy_mh_mix" className="cp-btn cp-btn--ghost">
                    <i className="bi bi-arrow-left" />
                    Continue Shopping
                  </Link>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
