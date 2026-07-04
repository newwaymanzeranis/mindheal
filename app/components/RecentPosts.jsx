import { Link } from "react-router";

import { useLang } from "~/context/LanguageContext";
import { formatPostDate, imageSrc } from "~/utils/format";

export default function RecentPosts({ posts = [] }) {
  const { t, tc } = useLang();
  if (!posts.length) return null;

  return (
    <section id="recent-posts" className="recent-posts section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t("recentPosts.title")}</h2>
        <p>{t("recentPosts.subtitle")}</p>
      </div>
      <div className="container">
        <div className="row gy-5">
          {posts.map((post, index) => {
            const { day, month } = formatPostDate(post.publishedAt);
            return (
              <div
                className="col-xl-4 col-md-6"
                key={post.id}
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
              >
                <div className="post-item position-relative h-100">
                  <div className="post-img position-relative overflow-hidden">
                    <img
                      src={imageSrc(post.image)}
                      className="img-fluid"
                      alt={tc(post, "title")}
                    />
                    {day && month && (
                      <span className="post-date">
                        {month} {day}
                      </span>
                    )}
                  </div>
                  <div className="post-content d-flex flex-column">
                    <h3 className="post-title">{tc(post, "title")}</h3>
                    <div className="meta d-flex align-items-center">
                      {post.author && (
                        <>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-person" />
                            <span className="ps-2">{post.author}</span>
                          </div>
                          {post.category?.name && (
                            <>
                              <span className="px-3 text-black-50">/</span>
                              <div className="d-flex align-items-center">
                                <i className="bi bi-folder2" />
                                <span className="ps-2">{post.category.name}</span>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                    <hr />
                    <Link
                      to={`/blog/${post.slug}`}
                      className="readmore stretched-link"
                    >
                      <span>{t("common.readMore")}</span>
                      <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
