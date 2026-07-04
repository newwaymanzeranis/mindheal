import { useLang } from "~/context/LanguageContext";

const FEATURE_ICONS = ["bi-droplet-half", "bi-heart", "bi-stars"];

export default function WhyChooseUs() {
  const { t } = useLang();
  const features = t("home.wcu.features");

  return (
    <section id="about" className="about section wcu-section">
      <div className="content">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="wcu-media" data-aos="zoom-out">
                <img
                  src="/assets/img/img_long_5.jpg"
                  alt="Handcrafted Bach Flower remedies"
                  className="wcu-img"
                />
                <div className="wcu-badge">
                  <span className="wcu-badge-num">5+</span>
                  <span className="wcu-badge-text">
                    {t("home.wcu.yearsExperience")}
                  </span>
                </div>
                <div className="wcu-chip">
                  <i className="bi bi-patch-check-fill" />
                  {t("home.wcu.natural")}
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
              <span className="wcu-eyebrow">{t("home.wcu.eyebrow")}</span>
              <h2 className="wcu-title">{t("home.wcu.title")}</h2>
              <p className="wcu-lead">{t("home.wcu.lead")}</p>

              <div className="wcu-features">
                {(Array.isArray(features) ? features : []).map(
                  (feature, index) => (
                    <div className="wcu-feature" key={feature.title}>
                      <span className="wcu-feature-icon">
                        <i
                          className={`bi ${
                            FEATURE_ICONS[index] ?? "bi-check-circle"
                          }`}
                        />
                      </span>
                      <div className="wcu-feature-body">
                        <h4 className="wcu-feature-title">{feature.title}</h4>
                        <p className="wcu-feature-text">{feature.text}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
