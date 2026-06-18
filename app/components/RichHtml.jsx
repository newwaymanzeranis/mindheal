/** Detect if stored content contains HTML tags. */
export function isHtmlContent(text) {
  if (!text?.trim()) return false;
  return /<[a-z][\s\S]*>/i.test(text);
}

/** Strip HTML for meta descriptions and previews. */
export function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function RichHtml({ html, className = "" }) {
  if (!html?.trim()) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
