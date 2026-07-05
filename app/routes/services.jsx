import { Link } from "react-router";

import { useLang } from "~/context/LanguageContext";
import { buildPageMeta } from "~/utils/seo";
import servicesCss from "~/styles/services.css?url";

export const links = () => [{ rel: "stylesheet", href: servicesCss }];

const HERO_STAT_ICONS = ["bi-heart-pulse", "bi-gift", "bi-flower2"];

const GROUP_ICONS = [
  "bi-chat-heart",
  "bi-person-check",
  "bi-box-seam",
  "bi-people",
  "bi-brightness-high",
  "bi-stars",
];

export function meta() {
  return buildPageMeta({
    title: "Mind Heal Services — Bach Flower Emotional Wellness",
    description:
      "Explore Mind Heal services — free consult, free discussion, free mixing help, emotional test, remedy delivery, child care, group healing and personalized Bach Flower support.",
    path: "/services",
    image: "/assets/img/services/consultent.jpg",
  });
}

export default function Services() {
  const { t } = useLang();
  const heroStats = t("services.heroStats");
  const groups = t("services.groups");

  return (
    <main className="main services-page">
      <section className="sv-hero">
        <div className="sv-hero-glow" aria-hidden />
        <div className="sv-hero-glow sv-hero-glow--left" aria-hidden />
        <div className="container">
          <div className="sv-hero-logo" aria-hidden>
            <img
              src="/assets/img/mind-heal-logo-vertical-white.png"
              alt=""
            />
          </div>

          <h1 className="sv-hero-title">{t("services.heroTitle")}</h1>

          <p className="sv-hero-lead">{t("services.heroLead")}</p>

          <div className="sv-hero-stats">
            {(Array.isArray(heroStats) ? heroStats : []).map((label, index) => (
              <span className="sv-stat" key={label}>
                <i className={`bi ${HERO_STAT_ICONS[index] ?? "bi-flower2"}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="sv-main" id="testimonials">
        <div className="container" data-aos="fade-up">
          <div className="sv-section-head">
            <span className="sv-section-eyebrow">{t("services.sectionEyebrow")}</span>
            <h2>{t("services.sectionTitle")}</h2>
            <p>{t("services.sectionSubtitle")}</p>
          </div>

          <div className="sv-grid">
            {(Array.isArray(groups) ? groups : []).map((group, index) => (
              <article className="sv-card" key={group.title}>
                <div className="sv-card-head">
                  <span className="sv-card-icon">
                    <i className={`bi ${GROUP_ICONS[index] ?? "bi-stars"}`} />
                  </span>
                  <h3>{group.title}</h3>
                </div>
                <ul className="sv-list">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <b>{item.name}</b> — {item.text}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sv-cta">
        <div className="container">
          <h4>{t("services.ctaHeading")}</h4>
          <p className="sv-cta-tagline">{t("services.ctaTagline")}</p>
          <div className="sv-cta-actions">
            <Link to="/contact" className="sv-cta-btn sv-cta-btn--primary">
              <i className="bi bi-chat-dots" />
              {t("services.contactUs")}
            </Link>
            <Link to="/buy_mh_mix" className="sv-cta-btn sv-cta-btn--ghost">
              <i className="bi bi-bag-heart" />
              {t("services.exploreRemedies")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
