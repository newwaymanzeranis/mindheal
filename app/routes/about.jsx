import { useEffect } from "react";
import { Link, useLoaderData, useLocation } from "react-router";

import { scrollToTeamSection } from "~/components/DoctorConsultFab";

import { TeamCardSocialLinks } from "~/components/TeamSocialLinks";
import { useLang } from "~/context/LanguageContext";
import { useSiteScripts } from "~/hooks/useSiteScripts";
import { fetchTeamMembers } from "~/lib/fetchApi.server";
import { imageSrc } from "~/utils/format";
import { buildPageMeta } from "~/utils/seo";

import aboutCss from "~/styles/about.css?url";

export const links = () => [{ rel: "stylesheet", href: aboutCss }];

const ABOUT_VIDEO_URL = "https://www.youtube.com/watch?v=9PFB2v_fEaA";

const HERO_STAT_ICONS = ["bi-flower2", "bi-heart-pulse", "bi-shield-check"];

const SERVICE_IMAGES = [
  { src: "/assets/img/services/consultent.jpg", alt: "Free Consult" },
  { src: "/assets/img/services/discus.jpg", alt: "Free Discussion" },
  { src: "/assets/img/services/mixup.jpg", alt: "Free Mixing Help" },
  { src: "/assets/img/services/eqtest.jpg", alt: "Free Emotional Test" },
];

function formatPosition(member, degree) {
  const parts = [
    degree ?? member.degree,
    member.experience && `(${member.experience})`,
  ].filter(Boolean);
  return parts.join(" ");
}

export async function loader({ request }) {
  const team = await fetchTeamMembers({ request });
  return { team: team ?? [] };
}

export function meta() {
  return buildPageMeta({
    title: "About Mind Heal — Bach Flower Remedy Experts",
    description:
      "Learn about Mind Heal — your trusted Bach Flower healing partner with 5+ years of experience. Pre-mixed natural remedies for anxiety, stress, OCD, relationships, exams and emotional wellness.",
    path: "/about",
    image: "/assets/img/img_sq_1.jpeg",
  });
}

export default function About() {
  const { t, tc } = useLang();
  const { team } = useLoaderData();
  const location = useLocation();
  const scriptsReady = useSiteScripts();

  const heroStats = t("about.hero.stats");
  const emotionalStates = t("about.intro.emotionalStates");
  const serviceItems = t("about.services.items");

  useEffect(() => {
    if (!scriptsReady || typeof window === "undefined" || !window.GLightbox) {
      return undefined;
    }

    const lightbox = window.GLightbox({
      selector: ".about-video-lightbox",
      touchNavigation: false,
      loop: false,
    });

    return () => {
      lightbox.destroy();
    };
  }, [scriptsReady]);

  useEffect(() => {
    if (location.hash !== "#team") return undefined;

    const frame = requestAnimationFrame(() => {
      scrollToTeamSection();
    });

    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, team.length]);

  return (
    <main className="main about-page">
      <section className="about-hero">
        <div className="about-hero-glow" aria-hidden />
        <div className="about-hero-glow about-hero-glow--left" aria-hidden />
        <div className="container">
          <div className="about-hero-logo" aria-hidden>
            <img
              src="/assets/img/mind-heal-logo-vertical-white.png"
              alt=""
            />
          </div>

          <span className="about-eyebrow">
            <i className="bi bi-flower1" />
            {t("about.hero.eyebrow")}
          </span>

          <h1 className="about-hero-title">{t("about.hero.title")}</h1>

          <p className="about-hero-lead">{t("about.hero.lead")}</p>

          <div className="about-hero-stats">
            {(Array.isArray(heroStats) ? heroStats : []).map((label, index) => (
              <span className="about-stat" key={label}>
                <i className={`bi ${HERO_STAT_ICONS[index] ?? "bi-flower2"}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="about-intro">
        <div className="container">
          <div className="about-intro-head">
            <span className="about-intro-eyebrow">{t("about.intro.eyebrow")}</span>
            <h2>{t("about.intro.title")}</h2>
          </div>

          <div className="about-intro-grid">
            <div className="about-intro-text" data-aos="fade-up" data-aos-delay={100}>
              <p>{t("about.intro.paragraph")}</p>
              <h4>{t("about.intro.emotionalHeading")}</h4>
              <ul className="about-checklist">
                {(Array.isArray(emotionalStates) ? emotionalStates : []).map(
                  (item) => (
                    <li key={item}>{item}</li>
                  )
                )}
              </ul>
              <Link to="/buy_mh_mix" className="about-products-cta">
                {t("about.intro.cta")}
                <i className="bi bi-arrow-right" />
              </Link>
            </div>

            <div className="about-media" data-aos="zoom-out">
              <div className="about-media-frame">
                <img
                  src="/assets/img/img_sq_1.jpeg"
                  alt="Mind Heal clinic"
                />
              </div>
              <a
                href={ABOUT_VIDEO_URL}
                className="about-video-lightbox pulsating-play-btn"
                aria-label="Watch Mind Heal video"
              >
                <span className="play">
                  <i className="bi bi-play-fill" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="team-15 team section" id="team" style={{ paddingTop: "0px" }}>
        <div className="container section-title" data-aos="fade-up">
          <h2>{t("about.team.title")}</h2>
          <h5>{t("about.team.subtitle")}</h5>
        </div>
        <div className="content">
          <div className="container">
            <div className="row">
              {team.length === 0 ? (
                <div className="col-12 text-center text-muted py-4">
                  <p>{t("about.team.empty")}</p>
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
                        <span className="position">
                          {formatPosition(member, tc(member, "degree"))}
                        </span>
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
          <h2>{t("about.services.title")}</h2>
          <p>{t("about.services.subtitle")}</p>
        </div>
        <div className="content">
          <div className="container">
            <div className="row g-0">
              {(Array.isArray(serviceItems) ? serviceItems : []).map(
                (item, index) => (
                  <div className="col-lg-3 col-md-6" key={item.heading}>
                    <div className="service-item">
                      <div className="service-item-icon text-center">
                        <img
                          src={
                            SERVICE_IMAGES[index]?.src ??
                            "/assets/img/services/consultent.jpg"
                          }
                          alt={SERVICE_IMAGES[index]?.alt ?? item.heading}
                          style={{ width: "150px", height: "102px" }}
                        />
                      </div>
                      <div className="service-item-content">
                        <h3 className="service-heading">{item.heading}</h3>
                        <h6>{item.subheading}</h6>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="call-to-action" className="call-to-action section light-background">
        <div className="content">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <h4>{t("about.cta.heading")}</h4>
                <p className="opacity-50">{t("about.cta.tagline")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
