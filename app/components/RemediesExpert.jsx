const HIGHLIGHTS = [
  { emoji: "🌿", text: "Experience the healing power of nature" },
  { emoji: "🌸", text: "Gentle, natural & effective emotional balance" },
  { emoji: "🌱", text: "Personalized Bach Flower blends for you" },
  { emoji: "💖", text: "Harmonize mind, body & soul" },
  { emoji: "🌍", text: "Pure, authentic & 100% natural" },
  { emoji: "✨", text: "Find inner peace & emotional stability" },
  { emoji: "🍃", text: "Restore balance & reduce stress" },
  { emoji: "🌟", text: "Guiding you to a healthier, happier life" },
];

export default function RemediesExpert() {
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
                <span>Certified Bach Flower Practitioner</span>
              </div>
            </div>
          </div>

          <div
            className="col-lg-6 order-lg-1"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <span className="re-eyebrow">Meet Your Expert</span>
            <h2 className="re-title">
              Your Trusted <strong>Bach Flower Remedies</strong> Expert
            </h2>
            <p className="re-lead">
              With 5+ years of experience, we craft natural, personalized healing
              solutions for emotional well-being. Using only genuine, chemical-free
              Bach Flower essences, our custom blends gently restore balance,
              clarity, and inner peace — whether you face stress, anxiety, fear, or
              emotional imbalance.
            </p>

            <ul className="re-checklist">
              {HIGHLIGHTS.map((item) => (
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
