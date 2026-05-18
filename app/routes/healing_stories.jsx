import { useLoaderData } from "react-router";

import PageTitle from "~/components/PageTitle";
import { fetchPosts } from "~/lib/fetchApi.server";

export async function loader() {
  const stories = await fetchPosts("published=true&limit=50&categorySlug=healing-stories");
  return { stories };
}

export default function HealingStories() {
  const { stories } = useLoaderData();

  return (
    <main className="main">
      <PageTitle
        title="Healing Stories"
        description="Your Healing Partner with Bach Flower Remedies - Your Journey to Emotional Wellness Starts Here"
        current="Healing Stories"
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

      <section className="testimonials-12 testimonials section" id="testimonials">
        <div className="container section-title" data-aos="fade-up">
          <h2 className="text-center">MIND HEAL is your Healing Partner - Healing Stories</h2>
          <p>Your Emotions, Our Care — After Healing, We Honor and Share Every Emotional Story</p>
        </div>
        <div className="testimonial-wrap">
          <div className="container">
            <div className="row">
              {stories.length === 0 && (
                <p className="text-center text-muted">No healing stories yet.</p>
              )}
              {stories.map((story) => (
                <div className="col-md-6 mb-4 mb-md-4" key={story.id}>
                  <div className="healing_stories">
                    <h4>{story.title}</h4>
                    <hr />
                    <blockquote
                      dangerouslySetInnerHTML={{ __html: story.content }}
                    />
                  </div>
                </div>
              ))}
            </div>
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
