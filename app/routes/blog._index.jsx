import { Link, useLoaderData } from "react-router";

import PageTitle from "~/components/PageTitle";
import { fetchPosts } from "~/lib/fetchApi.server";
import { formatPostDate, imageSrc } from "~/utils/format";

export async function loader({ request }) {
  const posts = await fetchPosts("published=true&limit=50&categorySlug=bach-flower", {
    request,
  });
  return { posts };
}

export default function Blog() {
  const { posts } = useLoaderData();

  return (
    <main className="main">
      <PageTitle
        title="Blogs"
        description="Your Healing Partner with Bach Flower Remedies -Learn & Thrive with the Wisdom of Our Experience!"
        current="Blogs"
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

      <section id="blog-posts-2" className="blog-posts-2 section">
        <div className="container">
          <h2 className="text-center">MIND HEAL is your Healing Partner - Blogs</h2>
          <p
            className="text-center"
            style={{ fontFamily: "var(--heading-font)", fontSize: "32px" }}
          >
            Learn & Thrive with the Wisdom of Our Experience!
          </p>
          <div className="row gy-4">
            {posts.length === 0 && (
              <p className="text-center text-muted">No blog posts yet. Add posts from admin.</p>
            )}
            {posts.map((post) => {
              const { day, month } = formatPostDate(post.publishedAt);
              return (
                <div className="col-lg-4" key={post.id}>
                  <article className="position-relative h-100">
                    <div className="post-img position-relative overflow-hidden">
                      <img src={imageSrc(post.image)} className="img-fluid" alt={post.title} />
                    </div>
                    <div className="meta d-flex align-items-end">
                      {day && month && (
                        <span className="post-date">
                          <span>{day}</span>
                          {month}
                        </span>
                      )}
                      {post.author && (
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person" />
                          <span className="ps-2">{post.author}</span>
                        </div>
                      )}
                    </div>
                    <div className="post-content d-flex flex-column">
                      <h3 className="post-title">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-muted small mb-2">{post.excerpt}</p>
                      )}
                      <Link to={`/blog/${post.slug}`} className="readmore stretched-link">
                        <span>Read More</span>
                        <i className="bi bi-arrow-right" />
                      </Link>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="call-to-action" className="call-to-action section light-background">
        <div className="content">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <h4>
                  No pressure. Just gentle healing. Your feelings are valid. We&apos;re here to
                  support you. Let&apos;s talk, not just treat.
                </h4>
                <p className="opacity-50">Begin with calm. Heal with care. Grow with love.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
