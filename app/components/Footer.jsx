import { Link } from "react-router";

import { useLang } from "~/context/LanguageContext";

const PRODUCTION_EMAIL = "mindhealbbfr@gmail.com";
const PRODUCTION_PHONE = "+917457988355";
const BRANCH_PHONE = "+917607487607";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer dark-background">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-12 footer-about">
              <Link to="/" className="logo d-flex align-items-center">
                <span className="sitename">Mind Heal</span>
              </Link>

              <div className="footer-contact pt-3">
                <p className="footer-unit-title">
                  <span aria-hidden="true">🌿 </span>
                  {t("footer.productionTitle")}
                </p>
                <p>
                  <strong>{t("footer.productionLab")}</strong>
                </p>
                <p>{t("footer.productionAddress1")}</p>
                <p>{t("footer.productionAddress2")}</p>
                <p>{t("footer.productionRole")}</p>
                <p>
                <span aria-hidden="true">✉️ </span>
                  <a href={`mailto:${PRODUCTION_EMAIL}`}>{PRODUCTION_EMAIL}</a>
                </p>
                <p>
                  <span aria-hidden="true">📞 </span>
                  <a href={`tel:${PRODUCTION_PHONE}`}>+91 74579 88355</a>
                </p>
              </div>

              
            </div>
            <div className="col-lg-3 col-md-12 footer-links">
            <div className="footer-contact pt-3">
                <p className="footer-unit-title">
                  <span aria-hidden="true">🏢 </span>
                  {t("footer.branchTitle")}
                </p>
                <p>
                  <strong>{t("footer.branchName")}</strong>
                </p>
                <p>{t("footer.branchAddress1")}</p>
                <p>{t("footer.branchAddress2")}</p>
                <p>{t("footer.branchAddress3")}</p>
                <p>
                  <strong>{t("footer.branchManager")}</strong>
                  <br />
                  {t("footer.branchManagerName")}
                </p>
                
                <p>
                  <span aria-hidden="true">✉️ </span>
                  <a href={`mailto:${PRODUCTION_EMAIL}`}>{PRODUCTION_EMAIL}</a>
                </p>
                <p>
                  <span aria-hidden="true">📞 </span>
                  <a href={`tel:${BRANCH_PHONE}`}>+91 76074 87607</a>
                </p>
              </div>

            </div>

            <div className="col-lg-3 col-md-6 footer-links">
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

            <div className="col-lg-3 col-md-6 footer-links">
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
