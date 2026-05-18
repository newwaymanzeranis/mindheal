import { Link } from "react-router";

import PageTitle from "~/components/PageTitle";
import ProductPrice from "~/components/ProductPrice";
import { useAuth } from "~/context/AuthContext";
import { useCart } from "~/context/CartContext";
import { formatPrice, productMindHealLabel } from "~/utils/format";

import cartCss from "~/styles/cart.css?url";

export const links = () => [{ rel: "stylesheet", href: cartCss }];

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

  const checkoutHref = isAuthenticated
    ? "/checkout"
    : `/login?redirect=${encodeURIComponent("/checkout")}`;

  if (!hydrated) {
    return (
      <main className="main">
        <PageTitle
          title="Your Cart"
          description="Mind Heal Bach Flower Mixtures"
          current="Cart"
          backgroundImage="/assets/img/page-title-bg.jpg"
        />
        <section className="section">
          <div className="container text-center py-5">
            <div className="spinner-border text-success" role="status" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="main">
      <PageTitle
        title="Your Cart"
        description="Review your Mind Heal mixtures before checkout"
        current="Cart"
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

      <section className="section cart-page">
        <div className="container">
          {items.length === 0 ? (
            <div className="cart-empty text-center py-5">
              <i className="bi bi-cart-x display-1 text-muted" />
              <h3 className="mt-3">Your cart is empty</h3>
              <p className="text-muted mb-4">Browse our Bach Flower mixtures and add your favourites.</p>
              <Link to="/buy_mh_mix" className="btn btn-success">
                Shop Mind Heal Mix
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="cart-items-card">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h5 mb-0">Cart Items ({items.length})</h2>
                    <button type="button" className="btn btn-link text-danger btn-sm" onClick={clearCart}>
                      Clear cart
                    </button>
                  </div>
                  <ul className="cart-item-list">
                    {items.map((item) => (
                      <li key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-img" />
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
                          <label className="visually-hidden" htmlFor={`qty-${item.id}`}>
                            Quantity
                          </label>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
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
                            className="form-control form-control-sm cart-qty-input"
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="cart-item-total">
                          <strong>{formatPrice(item.price * item.quantity)}</strong>
                          <button
                            type="button"
                            className="btn btn-link text-danger btn-sm p-0 mt-1"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="cart-summary">
                  <h2 className="h5">Order Summary</h2>
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
                    <span>Subtotal</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <p className="cart-summary-note small text-muted">
                    MRP ₹400 per mix · Special price ₹250 each
                  </p>
                  <Link to={checkoutHref} className="btn btn-success w-100 mt-3">
                    {isAuthenticated ? "Proceed to Checkout (COD)" : "Login to Checkout"}
                  </Link>
                  <Link to="/buy_mh_mix" className="btn btn-outline-success w-100 mt-2">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
