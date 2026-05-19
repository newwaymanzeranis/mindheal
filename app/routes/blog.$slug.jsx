import { Link, useLoaderData } from "react-router";

import PageTitle from "~/components/PageTitle";
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
  const { post } = useLoaderData();
  const { day, month } = formatPostDate(post.publishedAt);
  const dateLabel = day && month ? `${month} ${day}` : "";

  return (
    <main className="main">
      <PageTitle
        title={post.title}
        description={post.excerpt || post.title}
        current="Blog"
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

      <section className="blog-single section">
        <div className="container">
          <article className="blog-single-article">
            <div className="blog-single-header">
              {post.image && (
                <div className="blog-single-media">
                  <img src={imageSrc(post.image)} alt={post.title} />
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

                <h1 className="blog-single-title">{post.title}</h1>

                {post.excerpt && (
                  <p className="blog-single-excerpt">{post.excerpt}</p>
                )}
              </div>
            </div>

            <div
              className="blog-single-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="blog-single-footer">
              <Link to="/blog" className="btn btn-success">
                <i className="bi bi-arrow-left me-1" />
                Back to All Blogs
              </Link>
              <Link to="/contact" className="btn btn-outline-success">
                Contact Us
              </Link>
              <Link to="/buy_mh_mix" className="btn btn-outline-secondary">
                Shop Mind Heal Mix
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
