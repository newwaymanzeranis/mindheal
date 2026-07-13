import { Link, useLoaderData } from "react-router";

import { useLang } from "~/context/LanguageContext";
import { fetchPostsPaginated } from "~/lib/fetchApi.server";
import { formatPostDate, imageSrc } from "~/utils/format";
import { buildPageMeta } from "~/utils/seo";
import blogCss from "~/styles/blog.css?url";

export const links = () => [{ rel: "stylesheet", href: blogCss }];

const HERO_STAT_ICONS = ["bi-journal-richtext", "bi-flower2", "bi-lightbulb"];
const POSTS_PER_PAGE = 20;

export async function loader({ request }) {
  const url = new URL(request.url);
  const requestedPage = Math.max(1, Number(url.searchParams.get("page")) || 1);

  const { posts, pagination } = await fetchPostsPaginated(
    `published=true&limit=${POSTS_PER_PAGE}&page=${requestedPage}&categorySlug=bach-flower`,
    { request }
  );

  const totalPages = Math.max(1, pagination.pages || 1);
  const page = Math.min(requestedPage, totalPages);

  // If user requested a page past the end, refetch the last valid page
  if (page !== requestedPage && pagination.pages > 0) {
    const result = await fetchPostsPaginated(
      `published=true&limit=${POSTS_PER_PAGE}&page=${page}&categorySlug=bach-flower`,
      { request }
    );
    return {
      posts: result.posts,
      pagination: { ...result.pagination, page },
    };
  }

  return {
    posts,
    pagination: {
      ...pagination,
      page,
      pages: totalPages,
      limit: POSTS_PER_PAGE,
    },
  };
}

export function meta() {
  return buildPageMeta({
    title: "Mind Heal Blog — Bach Flower Remedies Wisdom",
    description:
      "Read Mind Heal blogs on Bach Flower Remedies — how to choose the right remedy, emotional wellness tips, remedy guides and expert healing insights.",
    path: "/blog",
    image: "/assets/img/blog/blog1.png",
  });
}

function blogPageHref(page) {
  return page <= 1 ? "/blog" : `/blog?page=${page}`;
}

export default function Blog() {
  const { t, tc } = useLang();
  const { posts, pagination } = useLoaderData();
  const heroStats = t("blog.stats");
  const { page, pages } = pagination;
  const showPagination = pages > 1;

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

          <h1 className="bl-hero-title">{t("blog.heroTitle")}</h1>

          <p className="bl-hero-lead">{t("blog.heroLead")}</p>

          <div className="bl-hero-stats">
            {(Array.isArray(heroStats) ? heroStats : []).map((label, index) => (
              <span className="bl-stat" key={label}>
                <i className={`bi ${HERO_STAT_ICONS[index] ?? "bi-lightbulb"}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bl-main" id="blog-posts">
        <div className="container" data-aos="fade-up">
          <div className="bl-section-head">
            <span className="bl-section-eyebrow">{t("blog.sectionEyebrow")}</span>
            <h2>{t("blog.sectionTitle")}</h2>
            <p>{t("blog.sectionSubtitle")}</p>
          </div>

          <div className="bl-grid">
            {posts.length === 0 && (
              <div className="bl-empty">
                <i className="bi bi-journal-text" />
                <p>{t("blog.empty")}</p>
              </div>
            )}

            {posts.map((post) => {
              const { day, month } = formatPostDate(post.publishedAt);

              return (
                <article className="bl-card" key={post.id}>
                  <div className="bl-card-media">
                    <img src={imageSrc(post.image)} alt={tc(post, "title")} />
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

                    <h3 className="bl-card-title">{tc(post, "title")}</h3>

                    {tc(post, "excerpt") && (
                      <p className="bl-card-excerpt">{tc(post, "excerpt")}</p>
                    )}

                    <Link to={`/blog/${post.slug}`} className="bl-card-link">
                      {t("common.readMore")}
                      <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {showPagination && (
            <nav className="bl-pagination" aria-label="Blog pagination">
              {page > 1 ? (
                <Link
                  to={blogPageHref(page - 1)}
                  className="bl-pagination-btn"
                  preventScrollReset={false}
                >
                  <i className="bi bi-chevron-left" />
                  {t("blog.prevPage")}
                </Link>
              ) : (
                <span className="bl-pagination-btn is-disabled" aria-disabled="true">
                  <i className="bi bi-chevron-left" />
                  {t("blog.prevPage")}
                </span>
              )}

              <span className="bl-pagination-info">
                {t("blog.pageOf")
                  .replace("{page}", String(page))
                  .replace("{pages}", String(pages))}
              </span>

              {page < pages ? (
                <Link
                  to={blogPageHref(page + 1)}
                  className="bl-pagination-btn"
                  preventScrollReset={false}
                >
                  {t("blog.nextPage")}
                  <i className="bi bi-chevron-right" />
                </Link>
              ) : (
                <span className="bl-pagination-btn is-disabled" aria-disabled="true">
                  {t("blog.nextPage")}
                  <i className="bi bi-chevron-right" />
                </span>
              )}
            </nav>
          )}
        </div>
      </section>

      <section className="bl-cta">
        <div className="container">
          <h4>{t("blog.ctaHeading")}</h4>
          <p className="bl-cta-tagline">{t("blog.ctaTagline")}</p>
          <div className="bl-cta-actions">
            <Link to="/contact" className="bl-cta-btn bl-cta-btn--primary">
              <i className="bi bi-chat-dots" />
              {t("blog.contactUs")}
            </Link>
            <Link to="/buy_mh_mix" className="bl-cta-btn bl-cta-btn--ghost">
              <i className="bi bi-bag-heart" />
              {t("blog.exploreRemedies")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
