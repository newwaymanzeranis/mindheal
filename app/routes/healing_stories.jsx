import { Link, useLoaderData } from "react-router";

import { fetchPosts } from "~/lib/fetchApi.server";
import { formatPostDate, imageSrc } from "~/utils/format";
import healingStoriesCss from "~/styles/healing-stories.css?url";

export const links = () => [{ rel: "stylesheet", href: healingStoriesCss }];

const HERO_STATS = [
  { icon: "bi-heart", label: "Real Journeys Shared" },
  { icon: "bi-chat-heart", label: "Emotions Honored" },
  { icon: "bi-flower2", label: "Gentle Healing" },
];

export async function loader({ request }) {
  const stories = await fetchPosts("published=true&limit=50&categorySlug=healing-stories", {
    request,
  });
  return { stories };
}

export function meta() {
  return [
    { title: "Healing Stories | Mind Heal" },
    {
      name: "description",
      content:
        "Read real healing stories from Mind Heal clients — emotional wellness journeys with Bach Flower Remedies, shared with care and compassion.",
    },
  ];
}

function StoryMeta({ story }) {
  const { day, month } = formatPostDate(story.publishedAt);
  const dateLabel = day && month ? `${month} ${day}` : "";

  if (!dateLabel && !story.author) return null;

  return (
    <div className="hs-card-meta">
      {dateLabel && (
        <span>
          <i className="bi bi-calendar3" />
          {dateLabel}
        </span>
      )}
      {story.author && (
        <span>
          <i className="bi bi-person-heart" />
          {story.author}
        </span>
      )}
    </div>
  );
}

export default function HealingStories() {
  const { stories } = useLoaderData();

  return (
    <main className="main hs-page">
      <section className="hs-hero">
        <div className="hs-hero-glow" aria-hidden />
        <div className="hs-hero-glow hs-hero-glow--left" aria-hidden />
        <div className="container">
          <div className="hs-hero-logo" aria-hidden>
            <img
              src="/assets/img/mind-heal-logo-vertical-white.png"
              alt=""
            />
          </div>

          <h1 className="hs-hero-title">Healing Stories</h1>

          <p className="hs-hero-lead">
            Your journey to emotional wellness starts here — real stories of
            calm, balance, and healing with Bach Flower Remedies.
          </p>

          <div className="hs-hero-stats">
            {HERO_STATS.map((stat) => (
              <span className="hs-stat" key={stat.label}>
                <i className={`bi ${stat.icon}`} />
                {stat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="hs-main" id="healing-stories">
        <div className="container" data-aos="fade-up">
          <div className="hs-section-head">
            <span className="hs-section-eyebrow">Shared with Care</span>
            <h2>MIND HEAL is your Healing Partner — Healing Stories</h2>
            <p>
              Your Emotions, Our Care — After Healing, We Honor and Share Every
              Emotional Story
            </p>
          </div>

          <div className="hs-grid">
            {stories.length === 0 && (
              <div className="hs-empty">
                <i className="bi bi-journal-heart" />
                <p>No healing stories yet. Check back soon for inspiring journeys.</p>
              </div>
            )}

            {stories.map((story) => (
              <article className="hs-card" key={story.id}>
                <span className="hs-card-accent" aria-hidden />
                <i className="bi bi-quote hs-quote" aria-hidden />

                <div className="hs-card-top">
                  <span className="hs-card-icon">
                    <i className="bi bi-heart-pulse" />
                  </span>
                  <div className="hs-card-title-wrap">
                    <h3 className="hs-card-title">{story.title}</h3>
                    <StoryMeta story={story} />
                  </div>
                </div>

                {story.image && (
                  <div className="hs-card-media">
                    <img src={imageSrc(story.image)} alt={story.title} />
                  </div>
                )}

                <div
                  className="hs-content"
                  dangerouslySetInnerHTML={{ __html: story.content }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hs-cta">
        <div className="container">
          <h4>
            No pressure. Just gentle healing. Your feelings are valid.
            We&apos;re here to support you. Let&apos;s talk, not just treat.
          </h4>
          <p className="hs-cta-tagline">
            Begin with calm. Heal with care. Grow with love.
          </p>
          <div className="hs-cta-actions">
            <Link to="/contact" className="hs-cta-btn hs-cta-btn--primary">
              <i className="bi bi-chat-dots" />
              Contact Us
            </Link>
            <Link to="/buy_mh_mix" className="hs-cta-btn hs-cta-btn--ghost">
              <i className="bi bi-bag-heart" />
              Explore Remedies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
