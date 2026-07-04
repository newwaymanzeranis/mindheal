import { useLang } from "~/context/LanguageContext";

const HIGHLIGHT_EMOJIS = ["🌿", "🌸", "🌱", "💖", "🌍", "✨", "🍃", "🌟"];

export default function RemediesExpert() {
  const { t } = useLang();
  const highlightTexts = t("home.remedies.highlights");
  const highlights = (Array.isArray(highlightTexts) ? highlightTexts : []).map(
    (text, index) => ({ emoji: HIGHLIGHT_EMOJIS[index] ?? "✨", text })
  );

  return (
    <section id="about-3" className="about-3 section re-section">
      <div className="container">
        <div className="row gy-5 justify-content-between align-items-center">
          <div className="col-lg-6 order-lg-2" data-aos="zoom-out">
            <div className="re-media">
              <img
                src="/assets/img/img_sq_1.jpeg"
                alt="Bach Flower Remedies Expert"
                className="re-img"
              />
              <a
                href="https://www.youtube.com/watch?v=9PFB2v_fEaA"
                className="glightbox re-play pulsating-play-btn"
                aria-label="Play introduction video"
              >
                <span className="play">
                  <i className="bi bi-play-fill" />
                </span>
              </a>
              <div className="re-media-badge">
                <i className="bi bi-patch-check-fill" />
                <span>{t("home.remedies.certified")}</span>
              </div>
            </div>
          </div>

          <div
            className="col-lg-6 order-lg-1"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <span className="re-eyebrow">{t("home.remedies.eyebrow")}</span>
            <h2 className="re-title">
              {t("home.remedies.titlePre")}
              <strong>{t("home.remedies.titleStrong")}</strong>
              {t("home.remedies.titlePost")}
            </h2>
            <p className="re-lead">{t("home.remedies.lead")}</p>

            <ul className="re-checklist">
              {highlights.map((item) => (
                <li className="re-check-item" key={item.text}>
                  <span className="re-check-emoji">{item.emoji}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
