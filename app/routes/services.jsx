import { Link } from "react-router";

import servicesCss from "~/styles/services.css?url";

export const links = () => [{ rel: "stylesheet", href: servicesCss }];

const HERO_STATS = [
  { icon: "bi-heart-pulse", label: "Holistic Emotional Care" },
  { icon: "bi-gift", label: "Free Support Available" },
  { icon: "bi-flower2", label: "Bach Flower Experts" },
];

const SERVICE_GROUPS = [
  {
    icon: "bi-chat-heart",
    title: "Free Support Services",
    items: [
      { name: "Free Consult", text: "Personalized guidance to choose the right remedies." },
      { name: "Free Discussion", text: "Open talk to understand your emotions deeply." },
      { name: "Free Mixing Help", text: "Help in preparing the right blend of remedies." },
      { name: "Free Emotional Test / Quiz", text: "Find your emotional type via simple questions." },
      { name: "Reminder Setup", text: "Get gentle reminders for follow-ups or refills." },
      { name: "WhatsApp Support", text: "Quick emotional support and remedy help anytime." },
    ],
  },
  {
    icon: "bi-person-check",
    title: "Personal Support Services",
    items: [
      { name: "Direct Meet", text: "Face-to-face session at our center." },
      { name: "Telephonic Support", text: "Talk to us from home for support and guidance." },
      { name: "Follow-Up Check", text: "We check your progress and suggest changes if needed." },
      { name: "Emotion Tracker Help", text: "Track your emotions daily with our simple guidance." },
    ],
  },
  {
    icon: "bi-box-seam",
    title: "Remedy & Delivery Services",
    items: [
      { name: "Remedy Suggestion Only", text: "Just tell your problem, we'll suggest a mix." },
      { name: "Repeat Blend Service", text: "Reorder your previous remedy easily." },
      { name: "Remedy Delivery", text: "Get your remedy delivered to your doorstep." },
      { name: "Custom Combo Packs", text: "Pre-made mixes for focus, sleep, stress, exams, etc." },
      { name: "Emergency Care Drop", text: "Quick support for sudden stress or anxiety." },
    ],
  },
  {
    icon: "bi-people",
    title: "Child & Parent Care",
    items: [
      { name: "Child Behavior Support", text: "Care plans for hyper, fearful, or emotional kids." },
      { name: "ReParent Guidance Session", text: "Helping parents manage emotional situations calmly." },
    ],
  },
  {
    icon: "bi-brightness-high",
    title: "Group & Emotional Growth Services",
    items: [
      { name: "Group Healing Session", text: "Join group talks or workshops for emotional healing." },
      { name: "Stress Release Circle", text: "Gentle group sharing and Bach support for stress relief." },
      { name: "Inner Peace Session", text: "Guided talk + remedy suggestions for calming the mind." },
      { name: "Confidence Rebuild Session", text: "Specially for self-doubt, fear, stage fright, etc." },
      { name: "Grief & Loss Care", text: "Emotional support after loss, breakups, or deep sadness." },
      { name: "Anger Balance Care", text: "Help for uncontrolled anger, frustration, or irritation." },
    ],
  },
  {
    icon: "bi-stars",
    title: "Special Add-On Services",
    items: [
      { name: "Pre-Made Kids Kits", text: "Gentle remedy kits for school stress, tantrums, fears." },
      { name: "Exam Calm Packs", text: "Remedy sets for students under exam pressure." },
      { name: "Daily Positivity Reminder", text: "We send short, positive healing quotes/messages." },
      { name: "Couple Harmony Support", text: "Bach blends and talks for emotional connection." },
      { name: "Healing Routine Setup", text: "Help in making a daily wellness habit with remedies." },
      { name: "Quick Mood Check", text: "Send your emotion, get a quick remedy reply." },
    ],
  },
];

export function meta() {
  return [
    { title: "Services | Mind Heal" },
    {
      name: "description",
      content:
        "Explore Mind Heal services — free consults, personal support, remedy delivery, child care, and emotional wellness with Bach Flower Remedies.",
    },
  ];
}

export default function Services() {
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

          <h1 className="sv-hero-title">Mind Heal Services</h1>

          <p className="sv-hero-lead">
            We provide professionally pre-mixed Bach Flower Remedies and caring
            support services — simple, gentle, and designed for your emotional
            wellness.
          </p>

          <div className="sv-hero-stats">
            {HERO_STATS.map((stat) => (
              <span className="sv-stat" key={stat.label}>
                <i className={`bi ${stat.icon}`} />
                {stat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="sv-main" id="testimonials">
        <div className="container" data-aos="fade-up">
          <div className="sv-section-head">
            <span className="sv-section-eyebrow">What We Offer</span>
            <h2>MIND HEAL is your Healing Partner — Services</h2>
            <p>Full List of Services — Simple, Gentle &amp; Supportive</p>
          </div>

          <div className="sv-grid">
            {SERVICE_GROUPS.map((group) => (
              <article className="sv-card" key={group.title}>
                <div className="sv-card-head">
                  <span className="sv-card-icon">
                    <i className={`bi ${group.icon}`} />
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
          <h4>
            No pressure. Just gentle healing. Your feelings are valid.
            We&apos;re here to support you. Let&apos;s talk, not just treat.
          </h4>
          <p className="sv-cta-tagline">
            Begin with calm. Heal with care. Grow with love.
          </p>
          <div className="sv-cta-actions">
            <Link to="/contact" className="sv-cta-btn sv-cta-btn--primary">
              <i className="bi bi-chat-dots" />
              Contact Us
            </Link>
            <Link to="/buy_mh_mix" className="sv-cta-btn sv-cta-btn--ghost">
              <i className="bi bi-bag-heart" />
              Explore Remedies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
