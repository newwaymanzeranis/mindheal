import { Link, useLoaderData } from "react-router";

import PageTitle from "~/components/PageTitle";
import { useLang } from "~/context/LanguageContext";
import { fetchPostBySlug } from "~/lib/fetchApi.server";
import { formatPostDate, imageSrc } from "~/utils/format";

import blogCss from "~/styles/blog.css?url";

export const links = () => [{ rel: "stylesheet", href: blogCss }];

export async function loader({ params, request }) {
  const post = await fetchPostBySlug(params.slug, { request });
  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }
  return { post };
}

export function meta({ data }) {
  const post = data?.post;
  if (!post) return [{ title: "Blog | Mind Heal" }];
  return [
    { title: `${post.title} | Mind Heal Blog` },
    { name: "description", content: post.excerpt || post.title },
  ];
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
    <main className="main">
      <PageTitle
        title={title}
        description={excerpt || title}
        current={t("blog.current")}
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

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
