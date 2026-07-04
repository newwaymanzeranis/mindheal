import { Link, useLoaderData } from "react-router";

import RichHtml, { isHtmlContent, stripHtml } from "~/components/RichHtml";
import { TeamProfileSocialLinks } from "~/components/TeamSocialLinks";
import TeamConsultationCta, { appointmentModalLinks } from "~/components/TeamConsultationCta";
import { useLang } from "~/context/LanguageContext";
import { fetchTeamMemberBySlug } from "~/lib/fetchApi.server";
import { imageSrc } from "~/utils/format";

import teamProfileCss from "~/styles/team-profile.css?url";

export const links = () => [
  { rel: "stylesheet", href: teamProfileCss },
  ...appointmentModalLinks(),
];

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
  const { t, tc } = useLang();
  const { member } = useLoaderData();
  const degree = tc(member, "degree");
  const bio = tc(member, "bio");
  const expertise = tc(member, "expertise");
  const portfolio = tc(member, "portfolio");
  const portfolioItems = parsePortfolioItems(portfolio);
  const bioIsHtml = isHtmlContent(bio);
  const expertiseIsHtml = isHtmlContent(expertise);
  const portfolioIsHtml = isHtmlContent(portfolio);

  return (
    <main className="main">
      <section className="team-profile-hero">
        <div className="team-profile-hero-glow" aria-hidden />
        <div className="container">
          <Link to="/about#team" className="team-profile-back">
            <i className="bi bi-arrow-left" /> {t("team.backToTeam")}
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
              <span
                className="team-profile-verified"
                title={t("team.verifiedExpert")}
              >
                <i className="bi bi-patch-check-fill" />
              </span>
            </div>

            <div className="team-profile-info">
              <p className="team-profile-label">
                <i className="bi bi-flower1" /> {t("team.expertPanel")}
              </p>
              <h1>{member.name}</h1>
              <div className="team-profile-badges">
                {degree && (
                  <span className="team-profile-badge">
                    <i className="bi bi-mortarboard" />
                    {degree}
                  </span>
                )}
                {member.experience && (
                  <span className="team-profile-badge">
                    <i className="bi bi-clock-history" />
                    {member.experience} {t("team.experienceSuffix")}
                  </span>
                )}
                <span className="team-profile-badge">
                  <i className="bi bi-heart-pulse" />
                  {t("team.expertRole")}
                </span>
              </div>
              <TeamProfileSocialLinks member={member} />
            </div>
          </div>

          {bio && (
            <div className="team-profile-hero-bio">
              {bioIsHtml ? (
                <RichHtml
                  html={bio}
                  className="team-profile-rich team-profile-rich--hero"
                />
              ) : (
                <p className="team-profile-bio-text">{bio}</p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="team-profile-body">
        <div className="container">
          {expertise && (
            <div className="team-profile-section" data-aos="fade-up">
              {!expertiseIsHtml && (
                <h2 className="team-profile-section-title">
                  <i className="bi bi-stars" />
                  {t("team.areasOfExpertise")}
                </h2>
              )}
              {expertiseIsHtml ? (
                <RichHtml
                  html={expertise}
                  className="team-profile-rich team-profile-rich--body"
                />
              ) : (
                <div className="team-profile-expertise">{expertise}</div>
              )}
            </div>
          )}

          {portfolioIsHtml && (
            <div className="team-profile-section" data-aos="fade-up" data-aos-delay={100}>
              <RichHtml
                html={portfolio}
                className="team-profile-rich team-profile-rich--body"
              />
            </div>
          )}

          {!portfolioIsHtml && portfolioItems.length > 0 && (
            <div className="team-profile-section" data-aos="fade-up" data-aos-delay={100}>
              <h2 className="team-profile-section-title">
                <i className="bi bi-briefcase" />
                {t("team.professionalPortfolio")}
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

          <TeamConsultationCta member={member} />
        </div>
      </section>
    </main>
  );
}
