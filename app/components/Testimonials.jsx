import { useLang } from "~/context/LanguageContext";
import { imageSrc } from "~/utils/format";

function Stars({ rating = 5 }) {
  const count = Math.max(0, Math.min(5, Number(rating) || 5));
  return (
    <div className="tm-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`bi ${i < count ? "bi-star-fill" : "bi-star"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials({ items = [] }) {
  const { t, tc } = useLang();
  if (!items.length) return null;

  return (
    <section className="testimonials section tm-section" id="testimonials">
      <div className="container tm-head" data-aos="fade-up">
        <span className="tm-eyebrow">{t("testimonials.eyebrow")}</span>
        <h2 className="tm-title">{t("testimonials.title")}</h2>
        <p className="tm-subtitle">{t("testimonials.subtitle")}</p>
      </div>

      <div className="container">
        <div className="row g-4">
          {items.map((item) => (
            <div className="col-lg-4 col-md-6" key={item.id} data-aos="fade-up">
              <figure className="tm-card">
                <i className="bi bi-quote tm-quote" aria-hidden />
                <Stars rating={item.rating} />
                <blockquote className="tm-content">
                  {tc(item, "content")}
                </blockquote>
                <figcaption className="tm-author">
                  <img
                    src={imageSrc(item.image)}
                    alt={item.name}
                    className="tm-avatar"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/assets/img/testimonials/testi1.png";
                    }}
                  />
                  <div>
                    <span className="tm-name">{item.name}</span>
                    <span className="tm-role">{t("testimonials.role")}</span>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
