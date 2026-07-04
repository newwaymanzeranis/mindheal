import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";

import HeaderAuth from "~/components/HeaderAuth";
import HeaderCart from "~/components/HeaderCart";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import MobileMenu from "~/components/MobileMenu";
import { useLang } from "~/context/LanguageContext";

function navClass({ isActive }) {
  return isActive ? "active" : undefined;
}

export default function Header() {
  const { t } = useLang();
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
            <img
              src="/assets/img/logo.png"
              alt="Mind Heal"
              className="site-logo-full"
            />
            <img
              src="/assets/img/logo-icon.png"
              alt="Mind Heal"
              className="site-logo-icon"
            />
          </NavLink>

          {/* Desktop navigation */}
          <nav id="navmenu" className="navmenu site-nav-desktop">
            <ul>
              <li>
                <NavLink to="/" end className={navClass}>
                  {t("nav.home")}
                </NavLink>
              </li>
              <li
                className={`dropdown${aboutContactActive ? " active" : ""}`}
              >
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <span>{t("nav.aboutContact")}</span>
                  <i className="bi bi-chevron-down toggle-dropdown" aria-hidden />
                </a>
                <ul>
                  <li>
                    <NavLink to="/about" className={navClass}>
                      {t("nav.about")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" className={navClass}>
                      {t("nav.contact")}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/services" className={navClass}>
                  {t("nav.services")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/healing_stories" className={navClass}>
                  {t("nav.stories")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/buy_mh_mix" className={navClass}>
                  {t("nav.shop")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className={navClass}>
                  {t("nav.blog")}
                </NavLink>
              </li>
              <HeaderAuth />
              <li className="header-cart-item">
                <HeaderCart />
              </li>
              <li className="header-lang-item">
                <LanguageSwitcher />
              </li>
            </ul>
          </nav>

          <div className="site-mobile-actions">
            <LanguageSwitcher />
            <HeaderCart />
            <button
              type="button"
              className="site-mobile-trigger"
              aria-label={t("nav.openMenu")}
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
