import { Link, useLoaderData } from "react-router";

import { useLang } from "~/context/LanguageContext";
import { fetchPostBySlug } from "~/lib/fetchApi.server";
import { formatPostDate, imageSrc } from "~/utils/format";
import { blogPostMeta, buildPageMeta } from "~/utils/seo";
import { getLangFromRequest } from "~/lib/lang.server";

import blogCss from "~/styles/blog.css?url";

export const links = () => [{ rel: "stylesheet", href: blogCss }];

export async function loader({ params, request }) {
  const post = await fetchPostBySlug(params.slug, { request });
  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }
  return { post, lang: getLangFromRequest(request) };
}

export function meta({ data }) {
  const post = data?.post;
  if (!post) {
    return buildPageMeta({
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      path: "/blog",
      noindex: true,
    });
  }
  return blogPostMeta(post, data?.lang || "en");
}

export default function BlogPost() {
  const { t, tc } = useLang();
  const { post } = useLoaderData();
  const { day, month } = formatPostDate(post.publishedAt);
  const dateLabel = day && month ? `${month} ${day}` : "";
  const title = tc(post, "title");
  const excerpt = tc(post, "excerpt");
  const content = tc(post, "content");

  return (
    <main className="main blog-page blog-single-page">
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
            {(Array.isArray(t("blog.stats")) ? t("blog.stats") : []).map(
              (label, index) => (
                <span className="bl-stat" key={label}>
                  <i
                    className={`bi ${
                      ["bi-journal-richtext", "bi-flower2", "bi-lightbulb"][
                        index
                      ] ?? "bi-lightbulb"
                    }`}
                  />
                  {label}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="blog-single section">
        <div className="container">
          <article className="blog-single-article">
            <div className="blog-single-header">
              {post.image && (
                <div className="blog-single-media">
                  <img src={imageSrc(post.image)} alt={title} />
                </div>
              )}

              <div className="blog-single-intro">
                <div className="blog-single-meta">
                  {dateLabel && <span className="post-date">{dateLabel}</span>}
                  {post.author && (
                    <span>
                      <i className="bi bi-person" /> {post.author}
                    </span>
                  )}
                  {post.category?.name && (
                    <span>
                      <i className="bi bi-folder2" /> {post.category.name}
                    </span>
                  )}
                </div>

                <h1 className="blog-single-title">{title}</h1>

                {excerpt && (
                  <p className="blog-single-excerpt">{excerpt}</p>
                )}
              </div>
            </div>

            <div
              className="blog-single-body"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="blog-single-footer">
              <Link to="/blog" className="btn btn-success">
                <i className="bi bi-arrow-left me-1" />
                {t("blog.backToBlogs")}
              </Link>
              <Link to="/contact" className="btn btn-outline-success">
                {t("blog.contactUs")}
              </Link>
              <Link to="/buy_mh_mix" className="btn btn-outline-secondary">
                {t("blog.shopMix")}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
