import { Link, useLoaderData } from "react-router";

import ProductPrice from "~/components/ProductPrice";
import { useAuth } from "~/context/AuthContext";
import { useCart } from "~/context/CartContext";
import { useLang } from "~/context/LanguageContext";
import { fetchAllProducts } from "~/lib/fetchApi.server";
import {
  DEFAULT_BOTTLE_IMAGE,
  formatPrice,
  productMindHealLabel,
} from "~/utils/format";
import { buildAuthRedirectUrl } from "~/utils/navigation";

import cartCss from "~/styles/cart.css?url";

export const links = () => [{ rel: "stylesheet", href: cartCss }];

const HERO_STAT_ICONS = ["bi-bag-heart", "bi-percent", "bi-truck"];

export function meta() {
  return [
    { title: "Your Cart | Mind Heal" },
    {
      name: "description",
      content: "Review your Mind Heal Bach Flower mixtures before checkout with Cash on Delivery.",
    },
  ];
}

export async function loader({ request }) {
  const products = await fetchAllProducts("published=true", { request });
  return { products: products ?? [] };
}

function CartHero({ itemCount }) {
  const { t } = useLang();
  const heroStats = t("cart.heroStats");

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

        <h1 className="cp-hero-title">{t("cart.heroTitle")}</h1>

        <p className="cp-hero-lead">{t("cart.heroLead")}</p>

        <div className="cp-hero-stats">
          {(Array.isArray(heroStats) ? heroStats : []).map((label, index) => (
            <span className="cp-stat" key={label}>
              <i className={`bi ${HERO_STAT_ICONS[index] ?? "bi-truck"}`} />
              {label}
            </span>
          ))}
          {itemCount > 0 && (
            <span className="cp-stat">
              <i className="bi bi-cart-check" />
              {itemCount}{" "}
              {itemCount === 1 ? t("cart.itemSingular") : t("cart.itemPlural")}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const { t, tc } = useLang();
  const { products } = useLoaderData();
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

  const productMap = new Map((products ?? []).map((p) => [p.id, p]));
  const displayName = (item) => {
    const product = productMap.get(item.id);
    if (product) return tc(product, "name");
    return tc(item, "name") || item.name;
  };

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
              <p className="mt-3 mb-0">{t("cart.loading")}</p>
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
              <h2>{t("cart.emptyTitle")}</h2>
              <p>{t("cart.emptyText")}</p>
              <Link to="/buy_mh_mix" className="cp-btn cp-btn--primary">
                <i className="bi bi-bag-heart" />
                {t("cart.shopMix")}
              </Link>
            </div>
          ) : (
            <div className="cp-layout">
              <div className="cp-items">
                <div className="cart-items-card">
                  <div className="cp-items-head">
                    <h2>
                      <i className="bi bi-cart3" />
                      {t("cart.itemsHead", { count: items.length })}
                    </h2>
                    <button
                      type="button"
                      className="cp-clear-btn"
                      onClick={clearCart}
                    >
                      <i className="bi bi-trash3" />
                      {t("cart.clearCart")}
                    </button>
                  </div>

                  <ul className="cart-item-list">
                    {items.map((item) => (
                      <li key={item.id} className="cart-item">
                        <div className="cart-item-media">
                          <div className="cart-item-scene-wrap">
                            <img
                              src={item.image}
                              alt={displayName(item)}
                              className="cart-item-scene"
                            />
                          </div>
                          <img
                            src={item.bottleImage || DEFAULT_BOTTLE_IMAGE}
                            alt=""
                            className="cart-item-bottle"
                            aria-hidden
                          />
                        </div>

                        <div className="cart-item-body">
                          <div className="cart-item-info">
                            <h3 className="cart-item-title">{displayName(item)}</h3>
                            <span className="cart-item-mh">
                              {productMindHealLabel(item.mindHealNo)}
                            </span>
                          </div>

                          <div className="cart-item-footer">
                            <ProductPrice
                              product={{ price: item.price, mrp: item.mrp }}
                            />

                            <div className="cart-item-actions">
                              <button
                                type="button"
                                className="cp-remove-btn"
                                onClick={() => removeFromCart(item.id)}
                                aria-label={t("cart.removeAria", {
                                  name: displayName(item),
                                })}
                              >
                                <i className="bi bi-trash3" aria-hidden />
                              </button>

                              <div className="cart-item-qty">
                                <label
                                  className="visually-hidden"
                                  htmlFor={`qty-${item.id}`}
                                >
                                  {t("cart.quantity")}
                                </label>
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
                                <input
                                  id={`qty-${item.id}`}
                                  type="number"
                                  min={1}
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      item.id,
                                      Number(e.target.value)
                                    )
                                  }
                                  className="cart-qty-input"
                                  readOnly
                                  tabIndex={-1}
                                />
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
                              </div>
                            </div>
                          </div>
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
                    {t("cart.orderSummary")}
                  </h2>

                  <div className="cart-summary-row">
                    <span>{t("cart.mrpTotal")}</span>
                    <span className="cp-mrp">{formatPrice(totalMrp)}</span>
                  </div>
                  <div className="cart-summary-row cp-savings">
                    <span>{t("cart.youSave")}</span>
                    <strong>{formatPrice(totalSavings)}</strong>
                  </div>
                  <div className="cart-summary-row cart-summary-total">
                    <span>{t("cart.subtotal")}</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>

                  <p className="cart-summary-note">
                    <i className="bi bi-info-circle" />
                    {t("cart.summaryNote")}
                  </p>

                  <div className="cp-cod-badge">
                    <i className="bi bi-truck" />
                    {t("cart.codAvailable")}
                  </div>

                  {isAuthenticated ? (
                    <Link to="/checkout" className="cp-btn cp-btn--primary">
                      <i className="bi bi-bag-check" />
                      {t("cart.proceedCheckout")}
                    </Link>
                  ) : (
                    <>
                      <Link to={loginHref} className="cp-btn cp-btn--primary">
                        <i className="bi bi-box-arrow-in-right" />
                        {t("cart.loginToCheckout")}
                      </Link>
                      <Link
                        to={registerHref}
                        className="cp-btn cp-btn--outline"
                      >
                        <i className="bi bi-person-plus" />
                        {t("cart.createAccountCheckout")}
                      </Link>
                    </>
                  )}

                  <Link to="/buy_mh_mix" className="cp-btn cp-btn--ghost">
                    <i className="bi bi-arrow-left" />
                    {t("cart.continueShopping")}
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
