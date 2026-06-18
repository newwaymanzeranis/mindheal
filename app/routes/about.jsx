import { Link, useLoaderData } from "react-router";

import PageTitle from "~/components/PageTitle";
import { TeamCardSocialLinks } from "~/components/TeamSocialLinks";
import { fetchTeamMembers } from "~/lib/fetchApi.server";
import { imageSrc } from "~/utils/format";

function formatPosition(member) {
  const parts = [member.degree, member.experience && `(${member.experience})`].filter(Boolean);
  return parts.join(" ");
}

export async function loader({ request }) {
  const team = await fetchTeamMembers({ request });
  return { team: team ?? [] };
}

export default function About() {
  const { team } = useLoaderData();

  return (
    <main className="main">
      <PageTitle
        title="About"
        description="Your Healing Partner with Bach Flower Remedies - We provide professionally pre-mixed Bach Flower Remedies"
        current="About"
        backgroundImage="/assets/img/page-title-bg.webp"
      />
      <section id="about-3" className="about-3 section" style={{ paddingBottom: "0px" }}>
        <div className="container">
          <div className="row">
            <h2 className="text-center">MIND HEAL is your Healing Partner with Bach Flower Remedies</h2>
          </div>
          <div className="row gy-4 justify-content-between align-items-center">
            <div className="col-lg-6 order-lg-2 position-relative" data-aos="zoom-out">
              <img src="/assets/img/img_sq_1.jpeg" alt="Mind Heal clinic" className="img-fluid" />
              <a
                href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                className="glightbox pulsating-play-btn"
              >
                <span className="play">
                  <i className="bi bi-play-fill" />
                </span>
              </a>
            </div>
            <div className="col-lg-5 order-lg-1" data-aos="fade-up" data-aos-delay={100}>
              <p className="mb-4 mt-5">
                Welcome to MIND HEAL, your trusted source for Pre-Mixed Bach Flower Remedies designed to
                support your emotional and mental well-being naturally and gently. At our clinic, we
                understand that life's emotional challenges—like anxiety, fear, grief, stress, confusion,
                or mood swings—can deeply affect your overall health. That's why we specialize in
                personalized Bach Flower therapy, a safe, non-habit forming, and holistic system
                discovered by Dr. Edward Bach.
              </p>
              <h4>
                We provide professionally pre-mixed Bach Flower Remedies tailored to specific emotional
                states such as:
              </h4>
              <br />
              <ul className="list-unstyled list-check mb-2">
                <li>Exam stress and mental blocks</li>
                <li>Relationship issues</li>
                <li>Anxiety and panic</li>
                <li>Mood swings or sadness</li>
                <li>Lack of focus or motivation</li>
                <li>Fear, anger, jealousy, guilt</li>
                <li>Sleeplessness and restlessness</li>
              </ul>
              <Link to="/buy_mh_mix">
                <h3>See All Products ➤</h3>
              </Link>
              <br />
            </div>
          </div>
        </div>
      </section>

      <section className="team-15 team section" id="team" style={{ paddingTop: "0px" }}>
        <div className="container section-title" data-aos="fade-up">
          <h2>MIND HEAL TEAM</h2>
          <h5>Meet the Caring Experts Behind Your Emotional and Mental Wellness Journey</h5>
        </div>
        <div className="content">
          <div className="container">
            <div className="row">
              {team.length === 0 ? (
                <div className="col-12 text-center text-muted py-4">
                  <p>Our team profiles are being updated. Please check back soon.</p>
                </div>
              ) : (
                team.map((member) => (
                  <div key={member.id} className="col-lg-3 col-md-6 mb-4">
                    <div className="person">
                      <figure>
                        <Link to={`/team/${member.slug}`} className="d-block">
                          <img
                            src={imageSrc(member.image)}
                            alt={member.name}
                            className="img-fluid"
                          />
                        </Link>
                        <TeamCardSocialLinks member={member} />
                      </figure>
                      <div className="person-contents">
                        <Link to={`/team/${member.slug}`} className="text-decoration-none">
                          <h3>{member.name}</h3>
                        </Link>
                        <span className="position">{formatPosition(member)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services section">
        <div className="container section-title" data-aos="fade-up">
          <h2>SERVICES</h2>
          <p>Providing Fresh Produce Every Single Day</p>
        </div>
        <div className="content">
          <div className="container">
            <div className="row g-0">
              <div className="col-lg-3 col-md-6">
                <div className="service-item">
                  <div className="service-item-icon text-center">
                    <img
                      src="/assets/img/services/consultent.jpg"
                      alt="Free Consult"
                      style={{ width: "150px", height: "102px" }}
                    />
                  </div>
                  <div className="service-item-content">
                    <h3 className="service-heading">Free Consult</h3>
                    <p>
                      <h6>Start Your Healing Journey with a Free Consultation</h6>
                      <p>
                        Get expert guidance on which remedies are right for your emotional needs. We'll
                        listen, understand, and create a personalized healing path — completely free.
                      </p>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="service-item">
                  <div className="service-item-icon text-center">
                    <img
                      src="/assets/img/services/discus.jpg"
                      alt="Free Discussion"
                      style={{ width: "150px", height: "102px" }}
                    />
                  </div>
                  <div className="service-item-content">
                    <h3 className="service-heading">Free Discussion</h3>
                    <h6>Let's Talk - Your Emotions Matter Freely</h6>
                    <p>
                      A safe space where you can share your thoughts, feelings, and emotional struggles
                      freely. No pressure — just understanding and gentle guidance. <br />
                      <br />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="service-item">
                  <div className="service-item-icon text-center">
                    <img
                      src="/assets/img/services/mixup.jpg"
                      alt="Free Mixing Help"
                      style={{ width: "150px", height: "102px" }}
                    />
                  </div>
                  <div className="service-item-content">
                    <h3 className="service-heading">Free Mixing Help</h3>
                    <h6>We'll Prepare Your Custom Remedy Blend for Free</h6>
                    <p>
                      Got the remedy list but unsure how to mix them? We'll help you create your perfect
                      personalized blend in the right dosage and proportion — without any extra charge.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="service-item">
                  <div className="service-item-icon text-center">
                    <img
                      src="/assets/img/services/eqtest.jpg"
                      alt="Free Emotional Test"
                      style={{ width: "150px", height: "102px" }}
                    />
                  </div>
                  <div className="service-item-content">
                    <h3 className="service-heading">Free Emotional Test</h3>
                    <h6>Understand What Your Mind & Emotions Are Telling You</h6>
                    <p>
                      Are you feeling anxious, sad, confused, angry, or just lost — but not sure why? Our
                      Free Emotional Test is designed to help you clearly identify the emotions you're
                      struggling with.
                    </p>
                  </div>
                </div>
              </div>
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
                  Healing doesn't mean the damage never existed. It means the pain no longer controls
                  your life. Start your journey with MIND HEAL — your mind deserves peace.
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
