import { useLang } from "~/context/LanguageContext";
import contactCss from "~/styles/contact.css?url";

export const links = () => [{ rel: "stylesheet", href: contactCss }];

const HERO_STAT_ICONS = ["bi-chat-heart", "bi-flower2", "bi-clock"];

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.1487758210487!2d80.95561882410848!3d26.907787495698997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399957bf17d5cee9%3A0xe3d4fb0de752fd8d!2sTedhi%20Pulia%2C%20Adil%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226022!5e1!3m2!1sen!2sin!4v1744911510772!5m2!1sen!2sin";

export function meta() {
  return [
    { title: "Contact Us | Mind Heal" },
    {
      name: "description",
      content:
        "Contact Mind Heal for Bach Flower remedy guidance. Your healing starts with a message — we're here to listen and support you.",
    },
  ];
}

export default function Contact() {
  const { t } = useLang();
  const heroStats = t("contact.heroStats");

  return (
    <main className="main contact-page">
      <section className="ct-hero">
        <div className="ct-hero-glow" aria-hidden />
        <div className="ct-hero-glow ct-hero-glow--left" aria-hidden />
        <div className="container">
          <div className="ct-hero-logo" aria-hidden>
            <img
              src="/assets/img/mind-heal-logo-vertical-white.png"
              alt=""
            />
          </div>

          <h1 className="ct-hero-title">{t("contact.heroTitle")}</h1>

          <p className="ct-hero-lead">{t("contact.heroLead")}</p>

          <div className="ct-hero-stats">
            {(Array.isArray(heroStats) ? heroStats : []).map((label, index) => (
              <span className="ct-stat" key={label}>
                <i className={`bi ${HERO_STAT_ICONS[index] ?? "bi-clock"}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="ct-main">
        <div className="container" data-aos="fade">
          <div className="ct-section-head">
            <span className="ct-section-eyebrow">{t("contact.sectionEyebrow")}</span>
            <h2>{t("contact.sectionTitle")}</h2>
            <p className="ct-section-tagline">{t("contact.sectionTagline")}</p>
          </div>

          <div className="ct-map-wrap">
            <iframe
              src={MAP_EMBED}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mind Heal clinic location on Google Maps"
            />
          </div>

          <div className="ct-grid">
            <div className="ct-info-card">
              <h3>{t("contact.infoTitle")}</h3>
              <h5>{t("contact.infoSubtitle")}</h5>
              <p>{t("contact.infoText")}</p>

              <div className="ct-info-item">
                <i className="bi bi-geo-alt" />
                <div>
                  <h4>{t("contact.locationLabel")}</h4>
                  <p>{t("contact.locationValue")}</p>
                </div>
              </div>

              <div className="ct-info-item">
                <i className="bi bi-envelope" />
                <div>
                  <h4>{t("contact.emailLabel")}</h4>
                  <p>
                    <a href="mailto:mindheal@gmail.com">mindheal@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="ct-info-item">
                <i className="bi bi-phone" />
                <div>
                  <h4>{t("contact.callLabel")}</h4>
                  <p>
                    <a href="tel:+917457988355">+91 7457988355</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="ct-form-card">
              <form
                action="forms/contact.php"
                method="post"
                role="form"
                className="php-email-form"
              >
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder={t("contact.formName")}
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder={t("contact.formEmail")}
                      required
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    placeholder={t("contact.formSubject")}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder={t("contact.formMessage")}
                    required
                    defaultValue=""
                  />
                </div>
                <div className="my-3">
                  <div className="loading">{t("contact.formLoading")}</div>
                  <div className="error-message" />
                  <div className="sent-message">{t("contact.formSent")}</div>
                </div>
                <div className="text-center">
                  <button type="submit">
                    <i className="bi bi-send" />
                    {t("contact.formSend")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="ct-cta">
        <div className="container">
          <h4>{t("contact.ctaHeading")}</h4>
          <p className="ct-cta-tagline">{t("contact.ctaTagline")}</p>
        </div>
      </section>
    </main>
  );
}
