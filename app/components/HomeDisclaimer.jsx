const SUPPORTS = [
  "Stress and tension",
  "Fear and anxiety",
  "Overthinking",
  "Emotional sensitivity",
  "Lack of confidence",
  "Mood-related challenges",
  "Relationship and social difficulties",
  "Emotional reactions to life events",
];

const NOT_INTENDED = [
  "Brain tumors",
  "Neurological disorders",
  "Severe psychiatric illnesses",
  "Medical emergencies",
  "Structural brain injuries",
  "Other major physical diseases",
];

const TIMELINE_FACTORS = [
  "Emotional history",
  "Severity of emotional stress",
  "Lifestyle and environment",
  "Individual responsiveness",
];

const BENEFITS = [
  "Greater calmness",
  "Better emotional balance",
  "Improved confidence",
  "Reduced emotional overwhelm",
  "A more positive outlook on daily life",
];

const BEST_PRACTICES = [
  "Use the remedy consistently as directed",
  "Give your emotional healing journey adequate time",
  "Observe gradual improvements rather than expecting overnight changes",
  "Maintain healthy sleep, hydration, and daily routines",
];

export default function HomeDisclaimer() {
  return (
    <section id="disclaimer" className="home-disclaimer section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Important Note &amp; Gentle Disclaimer</h2>
        <p>Mind Heal Bach Flower Remedies — A Gentle Healing Process</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <p className="home-disclaimer-intro text-center mx-auto">
          Mind Heal Bach Flower Remedies are based on a natural healing system developed from
          flower essences. These remedies are designed to support emotional, mental, and social
          well-being by helping individuals achieve greater emotional balance, calmness,
          confidence, and inner peace.
        </p>

        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <article className="home-disclaimer-card home-disclaimer-card--support h-100">
              <div className="home-disclaimer-card__head">
                <i className="bi bi-flower1" aria-hidden />
                <h3>What Our Blends Support</h3>
              </div>
              <p className="home-disclaimer-card__lead">
                Our blends are intended for concerns such as:
              </p>
              <ul className="home-disclaimer-list">
                {SUPPORTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="col-lg-6">
            <article className="home-disclaimer-card home-disclaimer-card--caution h-100">
              <div className="home-disclaimer-card__head">
                <i className="bi bi-exclamation-circle" aria-hidden />
                <h3>What These Remedies Are Not Intended For</h3>
              </div>
              <p className="home-disclaimer-card__lead">
                Mind Heal remedies are not intended to diagnose, treat, cure, or replace
                professional medical care for serious medical conditions such as:
              </p>
              <ul className="home-disclaimer-list">
                {NOT_INTENDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="home-disclaimer-note mb-0">
                If you are experiencing a serious medical or psychological condition, please
                consult a qualified healthcare professional.
              </p>
            </article>
          </div>
        </div>

        <article className="home-disclaimer-panel mb-4">
          <div className="home-disclaimer-panel__head">
            <i className="bi bi-hourglass-split" aria-hidden />
            <h3>Why Does Natural Healing Take Time?</h3>
          </div>
          <p>
            Every person is unique. Emotional patterns often develop over months or years, so
            natural emotional healing may also require time and consistency.
          </p>
          <p className="mb-0">
            Many people begin noticing positive emotional changes within{" "}
            <strong>20 days</strong>, while others may require <strong>1 to 3 months</strong> of
            regular use depending on individual factors. Natural healing works gradually by
            supporting emotional balance rather than simply masking symptoms.
          </p>
        </article>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <article className="home-disclaimer-subpanel h-100">
              <h4>Factors That Influence Results</h4>
              <ul className="home-disclaimer-list home-disclaimer-list--compact">
                {TIMELINE_FACTORS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <div className="col-md-6">
            <article className="home-disclaimer-subpanel h-100">
              <h4>What Mind Heal Encourages Over Time</h4>
              <ul className="home-disclaimer-list home-disclaimer-list--compact">
                {BENEFITS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        <article className="home-disclaimer-tips mb-4">
          <div className="home-disclaimer-panel__head">
            <i className="bi bi-heart-pulse" aria-hidden />
            <h3>For the Best Experience</h3>
          </div>
          <ul className="home-disclaimer-list home-disclaimer-list--compact mb-3">
            {BEST_PRACTICES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mb-0">
            Healing emotions is a journey, not a race. Small positive changes often lead to
            meaningful long-term improvements.
          </p>
        </article>

        <div className="home-disclaimer-footer">
          <i className="bi bi-info-circle" aria-hidden />
          <p className="mb-0">
            Mind Heal Bach Flower Remedies are designed to support emotional and social
            well-being through natural flower essences and should be viewed as a complementary
            wellness approach, not a substitute for professional medical diagnosis or treatment.
          </p>
        </div>
      </div>
    </section>
  );
}
