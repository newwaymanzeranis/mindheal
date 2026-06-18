import { Link, useLoaderData } from "react-router";

import RichHtml, { isHtmlContent, stripHtml } from "~/components/RichHtml";
import { TeamProfileSocialLinks } from "~/components/TeamSocialLinks";
import { fetchTeamMemberBySlug } from "~/lib/fetchApi.server";
import { imageSrc } from "~/utils/format";

import teamProfileCss from "~/styles/team-profile.css?url";

export const links = () => [{ rel: "stylesheet", href: teamProfileCss }];

const PORTFOLIO_ICONS = [
  "bi-award",
  "bi-heart-pulse",
  "bi-people",
  "bi-journal-medical",
  "bi-star",
  "bi-lightbulb",
  "bi-shield-check",
  "bi-flower1",
];

function parsePortfolioItems(portfolio) {
  if (!portfolio?.trim() || isHtmlContent(portfolio)) return [];
  return portfolio
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function loader({ params, request }) {
  const member = await fetchTeamMemberBySlug(params.slug, { request });
  if (!member) {
    throw new Response("Team member not found", { status: 404 });
  }
  return { member };
}

export function meta({ data }) {
  const member = data?.member;
  if (!member) return [{ title: "Team Member | Mind Heal" }];
  return [
    { title: `${member.name} | Mind Heal Team` },
    {
      name: "description",
      content: stripHtml(member.bio) || `${member.name} - ${member.degree} at Mind Heal`,
    },
  ];
}

export default function TeamMemberProfile() {
  const { member } = useLoaderData();
  const portfolioItems = parsePortfolioItems(member.portfolio);
  const bioIsHtml = isHtmlContent(member.bio);
  const expertiseIsHtml = isHtmlContent(member.expertise);
  const portfolioIsHtml = isHtmlContent(member.portfolio);

  return (
    <main className="main">
      <section className="team-profile-hero">
        <div className="team-profile-hero-glow" aria-hidden />
        <div className="container">
          <Link to="/about#team" className="team-profile-back">
            <i className="bi bi-arrow-left" /> Back to Team
          </Link>

          <div className="team-profile-hero-top">
            <div className="team-profile-photo-wrap">
              <div className="team-profile-photo-ring" aria-hidden />
              <div className="team-profile-photo-frame">
                <img
                  src={imageSrc(member.image)}
                  alt={member.name}
                  className="team-profile-photo"
                />
              </div>
              <span className="team-profile-verified" title="Mind Heal Verified Expert">
                <i className="bi bi-patch-check-fill" />
              </span>
            </div>

            <div className="team-profile-info">
              <p className="team-profile-label">
                <i className="bi bi-flower1" /> Mind Heal Expert Panel
              </p>
              <h1>{member.name}</h1>
              <div className="team-profile-badges">
                {member.degree && (
                  <span className="team-profile-badge">
                    <i className="bi bi-mortarboard" />
                    {member.degree}
                  </span>
                )}
                {member.experience && (
                  <span className="team-profile-badge">
                    <i className="bi bi-clock-history" />
                    {member.experience} Experience
                  </span>
                )}
                <span className="team-profile-badge">
                  <i className="bi bi-heart-pulse" />
                  Mind Heal Expert / Consulting Physician
                </span>
              </div>
              <TeamProfileSocialLinks member={member} />
            </div>
          </div>

          {member.bio && (
            <div className="team-profile-hero-bio">
              {bioIsHtml ? (
                <RichHtml
                  html={member.bio}
                  className="team-profile-rich team-profile-rich--hero"
                />
              ) : (
                <p className="team-profile-bio-text">{member.bio}</p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="team-profile-body">
        <div className="container">
          {member.expertise && (
            <div className="team-profile-section" data-aos="fade-up">
              {!expertiseIsHtml && (
                <h2 className="team-profile-section-title">
                  <i className="bi bi-stars" />
                  Areas of Expertise
                </h2>
              )}
              {expertiseIsHtml ? (
                <RichHtml
                  html={member.expertise}
                  className="team-profile-rich team-profile-rich--body"
                />
              ) : (
                <div className="team-profile-expertise">{member.expertise}</div>
              )}
            </div>
          )}

          {portfolioIsHtml && (
            <div className="team-profile-section" data-aos="fade-up" data-aos-delay={100}>
              <RichHtml
                html={member.portfolio}
                className="team-profile-rich team-profile-rich--body"
              />
            </div>
          )}

          {!portfolioIsHtml && portfolioItems.length > 0 && (
            <div className="team-profile-section" data-aos="fade-up" data-aos-delay={100}>
              <h2 className="team-profile-section-title">
                <i className="bi bi-briefcase" />
                Professional Portfolio
              </h2>
              <div className="team-profile-portfolio-grid">
                {portfolioItems.map((item, index) => (
                  <div key={index} className="team-profile-portfolio-card" data-aos="fade-up" data-aos-delay={index * 80}>
                    <div className="card-icon">
                      <i className={`bi ${PORTFOLIO_ICONS[index % PORTFOLIO_ICONS.length]}`} />
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="team-profile-cta" data-aos="fade-up">
            <h3>Ready to Start Your Healing Journey?</h3>
            <p>
              Book a free consultation with {member.name.split(" ").pop()} and discover the right Bach
              Flower Remedies for your emotional wellness.
            </p>
            <Link to="/contact" className="btn-consult">
              <i className="bi bi-calendar-check" />
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
