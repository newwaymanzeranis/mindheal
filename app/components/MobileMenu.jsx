import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router";

import { useAuth } from "~/context/AuthContext";
import { useCart } from "~/context/CartContext";
import { useLang } from "~/context/LanguageContext";
import LanguageSwitcher from "~/components/LanguageSwitcher";

function navClass({ isActive }) {
  return isActive ? "active" : undefined;
}

export default function MobileMenu({ open, onClose, aboutOpen, setAboutOpen }) {
  const { t } = useLang();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const { cartCount, hydrated } = useCart();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return createPortal(
    <div className="site-mobile-overlay" onClick={onClose} role="presentation">
      <div
        className="site-mobile-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="site-mobile-panel__head">
          <Link to="/" className="site-mobile-logo" onClick={onClose}>
            <img src="/assets/img/white_logo.png" alt="Mind Heal" />
          </Link>
          <button
            type="button"
            className="site-mobile-close"
            onClick={onClose}
            aria-label={t("nav.closeMenu")}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <nav className="site-mobile-nav">
          <LanguageSwitcher className="site-mobile-lang" />

          <NavLink to="/" end className={navClass} onClick={onClose}>
            {t("nav.home")}
          </NavLink>
          <button
            type="button"
            className={`site-mobile-nav__toggle${aboutOpen ? " is-open" : ""}`}
            onClick={() => setAboutOpen((o) => !o)}
          >
            {t("nav.aboutContact")}
            <i className="bi bi-chevron-down" />
          </button>
          {aboutOpen && (
            <div className="site-mobile-sub">
              <NavLink to="/about" className={navClass} onClick={onClose}>
                {t("nav.about")}
              </NavLink>
              <NavLink to="/contact" className={navClass} onClick={onClose}>
                {t("nav.contact")}
              </NavLink>
            </div>
          )}
          <NavLink to="/services" className={navClass} onClick={onClose}>
            {t("nav.services")}
          </NavLink>
          <NavLink to="/healing_stories" className={navClass} onClick={onClose}>
            {t("nav.stories")}
          </NavLink>
          <NavLink to="/buy_mh_mix" className={navClass} onClick={onClose}>
            {t("nav.shop")}
          </NavLink>
          <NavLink to="/blog" className={navClass} onClick={onClose}>
            {t("nav.blog")}
          </NavLink>

          <div className="site-mobile-nav__divider" />

          {!loading && !isAuthenticated && (
            <NavLink to="/login" className={navClass} onClick={onClose}>
              {t("nav.login")}
            </NavLink>
          )}
          {!loading && isAuthenticated && (
            <>
              <span className="site-mobile-user">
                {user?.name || user?.email}
              </span>
              <NavLink to="/account/orders" className={navClass} onClick={onClose}>
                {t("nav.myOrders")}
              </NavLink>
              <button
                type="button"
                className="site-mobile-nav__btn"
                onClick={handleLogout}
              >
                {t("nav.logout")}
              </button>
            </>
          )}

          <Link to="/cart" className="site-mobile-cart" onClick={onClose}>
            <i className="bi bi-cart3" />
            <span>{t("nav.viewCart")}</span>
            {hydrated && cartCount > 0 && (
              <span className="site-mobile-cart-count">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </div>,
    document.body
  );
}
