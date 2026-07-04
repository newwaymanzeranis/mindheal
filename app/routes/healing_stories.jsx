import { Link, useLoaderData } from "react-router";

import { useLang } from "~/context/LanguageContext";
import { fetchPosts } from "~/lib/fetchApi.server";
import { formatPostDate, imageSrc } from "~/utils/format";
import healingStoriesCss from "~/styles/healing-stories.css?url";

export const links = () => [{ rel: "stylesheet", href: healingStoriesCss }];

const HERO_STAT_ICONS = ["bi-heart", "bi-chat-heart", "bi-flower2"];

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
  const { t, tc } = useLang();
  const { stories } = useLoaderData();
  const heroStats = t("healingStories.stats");

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

          <h1 className="hs-hero-title">{t("healingStories.heroTitle")}</h1>

          <p className="hs-hero-lead">{t("healingStories.heroLead")}</p>

          <div className="hs-hero-stats">
            {(Array.isArray(heroStats) ? heroStats : []).map((label, index) => (
              <span className="hs-stat" key={label}>
                <i className={`bi ${HERO_STAT_ICONS[index] ?? "bi-heart"}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="hs-main" id="healing-stories">
        <div className="container" data-aos="fade-up">
          <div className="hs-section-head">
            <span className="hs-section-eyebrow">
              {t("healingStories.sectionEyebrow")}
            </span>
            <h2>{t("healingStories.sectionTitle")}</h2>
            <p>{t("healingStories.sectionSubtitle")}</p>
          </div>

          <div className="hs-grid">
            {stories.length === 0 && (
              <div className="hs-empty">
                <i className="bi bi-journal-heart" />
                <p>{t("healingStories.empty")}</p>
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
                    <h3 className="hs-card-title">{tc(story, "title")}</h3>
                    <StoryMeta story={story} />
                  </div>
                </div>

                {story.image && (
                  <div className="hs-card-media">
                    <img src={imageSrc(story.image)} alt={tc(story, "title")} />
                  </div>
                )}

                <div
                  className="hs-content"
                  dangerouslySetInnerHTML={{ __html: tc(story, "content") }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hs-cta">
        <div className="container">
          <h4>{t("blog.ctaHeading")}</h4>
          <p className="hs-cta-tagline">{t("blog.ctaTagline")}</p>
          <div className="hs-cta-actions">
            <Link to="/contact" className="hs-cta-btn hs-cta-btn--primary">
              <i className="bi bi-chat-dots" />
              {t("blog.contactUs")}
            </Link>
            <Link to="/buy_mh_mix" className="hs-cta-btn hs-cta-btn--ghost">
              <i className="bi bi-bag-heart" />
              {t("blog.exploreRemedies")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
