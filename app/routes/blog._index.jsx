import { Link, useLoaderData } from "react-router";

import { fetchPosts } from "~/lib/fetchApi.server";
import { formatPostDate, imageSrc } from "~/utils/format";
import blogCss from "~/styles/blog.css?url";

export const links = () => [{ rel: "stylesheet", href: blogCss }];

const HERO_STATS = [
  { icon: "bi-journal-richtext", label: "Expert Insights" },
  { icon: "bi-flower2", label: "Bach Flower Wisdom" },
  { icon: "bi-lightbulb", label: "Learn & Thrive" },
];

export async function loader({ request }) {
  const posts = await fetchPosts("published=true&limit=50&categorySlug=bach-flower", {
    request,
  });
  return { posts };
}

export function meta() {
  return [
    { title: "Blogs | Mind Heal" },
    {
      name: "description",
      content:
        "Learn and thrive with Mind Heal blogs — Bach Flower Remedies wisdom, emotional wellness tips, and expert guidance from our experience.",
    },
  ];
}

export default function Blog() {
  const { posts } = useLoaderData();

  return (
    <main className="main blog-page">
      <section className="bl-hero">
        <div className="bl-hero-glow" aria-hidden />
        <div className="bl-hero-glow bl-hero-glow--left" aria-hidden />
        <div className="container">
          <div className="bl-hero-logo" aria-hidden>
            <img
              src="/assets/img/mind-heal-logo-vertical-white.png"
              alt=""
            />
          </div>

          <h1 className="bl-hero-title">Mind Heal Blogs</h1>

          <p className="bl-hero-lead">
            Your Healing Partner with Bach Flower Remedies — learn and thrive
            with the wisdom of our experience.
          </p>

          <div className="bl-hero-stats">
            {HERO_STATS.map((stat) => (
              <span className="bl-stat" key={stat.label}>
                <i className={`bi ${stat.icon}`} />
                {stat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bl-main" id="blog-posts">
        <div className="container" data-aos="fade-up">
          <div className="bl-section-head">
            <span className="bl-section-eyebrow">From Our Experience</span>
            <h2>MIND HEAL is your Healing Partner — Blogs</h2>
            <p>Learn &amp; Thrive with the Wisdom of Our Experience!</p>
          </div>

          <div className="bl-grid">
            {posts.length === 0 && (
              <div className="bl-empty">
                <i className="bi bi-journal-text" />
                <p>No blog posts yet. Add posts from admin.</p>
              </div>
            )}

            {posts.map((post) => {
              const { day, month } = formatPostDate(post.publishedAt);

              return (
                <article className="bl-card" key={post.id}>
                  <div className="bl-card-media">
                    <img src={imageSrc(post.image)} alt={post.title} />
                    {day && month && (
                      <div className="bl-card-date">
                        <span>{day}</span>
                        <small>{month}</small>
                      </div>
                    )}
                  </div>

                  <div className="bl-card-body">
                    <div className="bl-card-meta">
                      {post.author && (
                        <span>
                          <i className="bi bi-person" />
                          {post.author}
                        </span>
                      )}
                      {post.category?.name && (
                        <span>
                          <i className="bi bi-folder2" />
                          {post.category.name}
                        </span>
                      )}
                    </div>

                    <h3 className="bl-card-title">{post.title}</h3>

                    {post.excerpt && (
                      <p className="bl-card-excerpt">{post.excerpt}</p>
                    )}

                    <Link to={`/blog/${post.slug}`} className="bl-card-link">
                      Read More
                      <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bl-cta">
        <div className="container">
          <h4>
            No pressure. Just gentle healing. Your feelings are valid.
            We&apos;re here to support you. Let&apos;s talk, not just treat.
          </h4>
          <p className="bl-cta-tagline">
            Begin with calm. Heal with care. Grow with love.
          </p>
          <div className="bl-cta-actions">
            <Link to="/contact" className="bl-cta-btn bl-cta-btn--primary">
              <i className="bi bi-chat-dots" />
              Contact Us
            </Link>
            <Link to="/buy_mh_mix" className="bl-cta-btn bl-cta-btn--ghost">
              <i className="bi bi-bag-heart" />
              Explore Remedies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
