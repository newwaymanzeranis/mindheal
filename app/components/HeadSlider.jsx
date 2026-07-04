import { useLang } from "~/context/LanguageContext";
import { imageSrc } from "~/utils/format";

const FALLBACK_SLIDES = [
  {
    title: "Harmonizing the Mind - Emotional Balance and Inner Peace",
    subtitle:
      "Harmonizing the Mind: Bach Flower Remedies for Emotional Balance and Inner Peace",
    image: "/assets/img/hero_1.jpeg",
  },
  {
    title: "Bach Flowers Restore Mental Clarity and Calm",
    subtitle: "Nature's Emotional Alchemy: How Bach Flowers Restore Mental Clarity and Calm",
    image: "/assets/img/hero_2.png",
  },
  {
    title: "Gentle Healing - Bach Flower Medicine for Modern Mental Health",
    subtitle:
      "Gentle Healing, Profound Results: Bach Flower Medicine for Modern Mental Health",
    image: "/assets/img/hero_3.png",
  },
];

export default function HeadSlider({ slides = [] }) {
  const { tc } = useLang();
  const items = slides.length > 0 ? slides : FALLBACK_SLIDES;

  return (
    <section id="hero" className="hero section dark-background">
      <div
        id="hero-carousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        {items.map((slide, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={slide.id ?? index}
          >
            <img src={imageSrc(slide.image)} alt={tc(slide, "title")} />
            <div className="carousel-container">
              <h2>{tc(slide, "title")}</h2>
              <p>{tc(slide, "subtitle")}</p>
            </div>
          </div>
        ))}

        <a
          className="carousel-control-prev"
          href="#hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true" />
        </a>
        <a
          className="carousel-control-next"
          href="#hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
