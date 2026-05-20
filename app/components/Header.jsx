import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";

import HeaderAuth from "~/components/HeaderAuth";
import HeaderCart from "~/components/HeaderCart";
import MobileMenu from "~/components/MobileMenu";

function navClass({ isActive }) {
  return isActive ? "active" : undefined;
}

export default function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const aboutContactActive =
    pathname === "/about" || pathname === "/contact";

  useEffect(() => {
    setMobileOpen(false);
    setAboutOpen(false);
    document.body.classList.remove("mobile-nav-active");
  }, [pathname]);

  useEffect(() => {
    document.body.classList.remove("mobile-nav-active");
  }, []);

  return (
    <>
      <header id="header" className="header d-flex align-items-center">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between site-header-inner">
          <NavLink to="/" className="logo d-flex align-items-center" end>
            <img src="/assets/img/logo.png" alt="Mind Heal" />
          </NavLink>

          {/* Desktop navigation */}
          <nav id="navmenu" className="navmenu site-nav-desktop">
            <ul>
              <li>
                <NavLink to="/" end className={navClass}>
                  Home
                </NavLink>
              </li>
              <li
                className={`dropdown${aboutContactActive ? " active" : ""}`}
              >
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <span>About & Contact</span>
                  <i className="bi bi-chevron-down toggle-dropdown" aria-hidden />
                </a>
                <ul>
                  <li>
                    <NavLink to="/about" className={navClass}>
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" className={navClass}>
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/services" className={navClass}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/healing_stories" className={navClass}>
                  Stories
                </NavLink>
              </li>
              <li>
                <NavLink to="/buy_mh_mix" className={navClass}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className={navClass}>
                  Blog
                </NavLink>
              </li>
              <HeaderAuth />
              <li className="header-cart-item">
                <HeaderCart />
              </li>
            </ul>
          </nav>

          <div className="site-mobile-actions">
            <HeaderCart />
            <button
              type="button"
              className="site-mobile-trigger"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <i className="bi bi-list" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        aboutOpen={aboutOpen}
        setAboutOpen={setAboutOpen}
      />
    </>
  );
}
