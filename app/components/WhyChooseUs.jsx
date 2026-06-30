const FEATURES = [
  {
    icon: "bi-droplet-half",
    title: "100% Natural & Pure",
    text: "Only authentic, high-quality Bach Flower essences — free from artificial additives, preservatives, or chemicals for gentle yet effective healing.",
  },
  {
    icon: "bi-heart",
    title: "Handcrafted with Love & Care",
    text: "Every blend is thoughtfully prepared in small batches, with careful attention to detail and the highest quality standards.",
  },
  {
    icon: "bi-stars",
    title: "Custom Formulations",
    text: "Each person is unique. We create custom blends tailored to your specific emotional and mental health concerns.",
  },
];

export default function WhyChooseUs() {
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
                    Years of
                    <br />
                    Experience
                  </span>
                </div>
                <div className="wcu-chip">
                  <i className="bi bi-patch-check-fill" />
                  100% Natural
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
              <span className="wcu-eyebrow">Why Choose Us</span>
              <h2 className="wcu-title">
                More than <strong>5+ years of experience</strong> in Bach Flower
                mix remedies
              </h2>
              <p className="wcu-lead">
                Expertly crafted, 100% natural &amp; pure remedies with a holistic
                approach to emotional health — custom formulations, handcrafted
                with love and trusted by many.
              </p>

              <div className="wcu-features">
                {FEATURES.map((feature) => (
                  <div className="wcu-feature" key={feature.title}>
                    <span className="wcu-feature-icon">
                      <i className={`bi ${feature.icon}`} />
                    </span>
                    <div className="wcu-feature-body">
                      <h4 className="wcu-feature-title">{feature.title}</h4>
                      <p className="wcu-feature-text">{feature.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
