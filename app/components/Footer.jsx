import { Link } from "react-router";

import { useLang } from "~/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer dark-background">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <Link to="/" className="logo d-flex align-items-center">
                <span className="sitename">Mind Heal</span>
              </Link>
              <div className="footer-contact pt-3">
                <p>Lucknow Kursi Road</p>
                <p>U.P., INDIA 226022</p>
                <p>
                  <strong>{t("footer.phone")}</strong> +7457988355
                </p>
                <p>
                  <strong>{t("footer.email")}</strong> newway.manzer@gmail.com
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>{t("footer.usefulLinks")}</h4>
              <ul>
                <li>
                  <Link to="/">{t("nav.home")}</Link>
                </li>
                <li>
                  <Link to="/about">{t("footer.aboutUs")}</Link>
                </li>
                <li>
                  <Link to="/services">{t("nav.services")}</Link>
                </li>
                <li>
                  <Link to="/contact">{t("nav.contact")}</Link>
                </li>
                <li>
                  <Link to="/blog">{t("nav.blog")}</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>{t("footer.ourServices")}</h4>
              <ul>
                <li>
                  <Link to="/services">{t("footer.freeConsult")}</Link>
                </li>
                <li>
                  <Link to="/services">{t("footer.freeDiscussion")}</Link>
                </li>
                <li>
                  <Link to="/services">{t("footer.freeMixingHelp")}</Link>
                </li>
                <li>
                  <Link to="/services">{t("footer.freeEmotionalTest")}</Link>
                </li>
                <li>
                  <Link to="/services">{t("footer.followUpCheck")}</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 footer-links" />
            <div className="col-lg-2 col-md-3 footer-links" />
          </div>
        </div>
      </div>
      <div className="copyright text-center">
        <div className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
          <div className="d-flex flex-column align-items-center align-items-lg-start">
            <div>
              © Copyright <strong><span>Mind Heal</span></strong>.{" "}
              {t("footer.rights")}
            </div>
          </div>
          <div className="social-links order-first order-lg-last mb-3 mb-lg-0">
            <a href="#" aria-label="Twitter">
              <i className="bi bi-twitter-x" />
            </a>
            <a href="#" aria-label="Facebook">
              <i className="bi bi-facebook" />
            </a>
            <a href="#" aria-label="Instagram">
              <i className="bi bi-instagram" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="bi bi-linkedin" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
