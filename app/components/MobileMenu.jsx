import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router";

import { useAuth } from "~/context/AuthContext";
import { useCart } from "~/context/CartContext";

function navClass({ isActive }) {
  return isActive ? "active" : undefined;
}

export default function MobileMenu({ open, onClose, aboutOpen, setAboutOpen }) {
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
            aria-label="Close menu"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <nav className="site-mobile-nav">
          <NavLink to="/" end className={navClass} onClick={onClose}>
            Home
          </NavLink>
          <button
            type="button"
            className={`site-mobile-nav__toggle${aboutOpen ? " is-open" : ""}`}
            onClick={() => setAboutOpen((o) => !o)}
          >
            About & Contact
            <i className="bi bi-chevron-down" />
          </button>
          {aboutOpen && (
            <div className="site-mobile-sub">
              <NavLink to="/about" className={navClass} onClick={onClose}>
                About Us
              </NavLink>
              <NavLink to="/contact" className={navClass} onClick={onClose}>
                Contact
              </NavLink>
            </div>
          )}
          <NavLink to="/services" className={navClass} onClick={onClose}>
            Services
          </NavLink>
          <NavLink to="/healing_stories" className={navClass} onClick={onClose}>
            Stories
          </NavLink>
          <NavLink to="/buy_mh_mix" className={navClass} onClick={onClose}>
            Shop
          </NavLink>
          <NavLink to="/blog" className={navClass} onClick={onClose}>
            Blog
          </NavLink>

          <div className="site-mobile-nav__divider" />

          {!loading && !isAuthenticated && (
            <NavLink to="/login" className={navClass} onClick={onClose}>
              Login
            </NavLink>
          )}
          {!loading && isAuthenticated && (
            <>
              <span className="site-mobile-user">
                {user?.name || user?.email}
              </span>
              <NavLink to="/account/orders" className={navClass} onClick={onClose}>
                My Orders
              </NavLink>
              <button
                type="button"
                className="site-mobile-nav__btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          <Link to="/cart" className="site-mobile-cart" onClick={onClose}>
            <i className="bi bi-cart3" />
            <span>View Cart</span>
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
