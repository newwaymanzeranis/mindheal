import contactCss from "~/styles/contact.css?url";

export const links = () => [{ rel: "stylesheet", href: contactCss }];

const HERO_STATS = [
  { icon: "bi-chat-heart", label: "We're Here to Listen" },
  { icon: "bi-flower2", label: "Bach Flower Guidance" },
  { icon: "bi-clock", label: "Reach Out Anytime" },
];

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

          <h1 className="ct-hero-title">Contact Mind Heal</h1>

          <p className="ct-hero-lead">
            Your Healing Partner with Bach Flower Remedies — reach out for
            guidance, support, or help choosing the right remedy for you.
          </p>

          <div className="ct-hero-stats">
            {HERO_STATS.map((stat) => (
              <span className="ct-stat" key={stat.label}>
                <i className={`bi ${stat.icon}`} />
                {stat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="ct-main">
        <div className="container" data-aos="fade">
          <div className="ct-section-head">
            <span className="ct-section-eyebrow">Get in Touch</span>
            <h2>MIND HEAL is your Healing Partner — Contact Us</h2>
            <p className="ct-section-tagline">Your Healing Starts with a Message</p>
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
              <h3>Get in touch</h3>
              <h5>We&apos;re here to listen, guide, and support you.</h5>
              <p>
                Whether you have a question, need help choosing the right remedy,
                or just want to share your story — feel free to reach out to us
                anytime. Your emotional wellness matters, and we&apos;re just a
                message away.
              </p>

              <div className="ct-info-item">
                <i className="bi bi-geo-alt" />
                <div>
                  <h4>Location</h4>
                  <p>Aadil Nagar Tehri Pulia Lucknow</p>
                </div>
              </div>

              <div className="ct-info-item">
                <i className="bi bi-envelope" />
                <div>
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:mindheal@gmail.com">mindheal@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="ct-info-item">
                <i className="bi bi-phone" />
                <div>
                  <h4>Call</h4>
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
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Your Email"
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
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder="Message"
                    required
                    defaultValue=""
                  />
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message" />
                  <div className="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit">
                    <i className="bi bi-send" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="ct-cta">
        <div className="container">
          <h4>
            No pressure. Just gentle healing. Your feelings are valid.
            We&apos;re here to support you. Let&apos;s talk, not just treat.
          </h4>
          <p className="ct-cta-tagline">
            Begin with calm. Heal with care. Grow with love.
          </p>
        </div>
      </section>
    </main>
  );
}
