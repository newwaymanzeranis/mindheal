const SOCIAL_PLATFORMS = [
  { key: "facebookUrl", icon: "bi-facebook", label: "Facebook" },
  { key: "twitterUrl", icon: "bi-twitter-x", label: "Twitter / X" },
  { key: "linkedinUrl", icon: "bi-linkedin", label: "LinkedIn" },
  { key: "instagramUrl", icon: "bi-instagram", label: "Instagram" },
];

function normalizeUrl(url) {
  if (!url?.trim()) return "";
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/**
 * Original team card social buttons — white squares, green icons, vertical stack.
 */
export function TeamCardSocialLinks({ member }) {
  const handleClick = (e, url) => {
    e.stopPropagation();
    if (!url) e.preventDefault();
  };

  return (
    <div className="social">
      {SOCIAL_PLATFORMS.map(({ key, icon, label }) => {
        const url = member[key]?.trim();
        return (
          <a
            key={key}
            href={url ? normalizeUrl(url) : "#"}
            target={url ? "_blank" : undefined}
            rel={url ? "noopener noreferrer" : undefined}
            aria-label={url ? `View ${member.name} on ${label}` : `${label} (link not set)`}
            title={url ? `View ${label} profile` : label}
            onClick={(e) => handleClick(e, url)}
          >
            <span className={`bi ${icon}`} />
          </a>
        );
      })}
    </div>
  );
}

export function TeamProfileSocialLinks({ member, className = "team-profile-social" }) {
  const active = SOCIAL_PLATFORMS.filter(({ key }) => member[key]?.trim());
  if (!active.length) return null;

  return (
    <div className={className}>
      {active.map(({ key, icon, label }) => (
        <a
          key={key}
          href={normalizeUrl(member[key])}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on ${label}`}
          title={`View ${label} profile`}
        >
          <span className={`bi ${icon}`} />
        </a>
      ))}
    </div>
  );
}

export { SOCIAL_PLATFORMS, normalizeUrl };
