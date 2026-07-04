import { useLang } from "~/context/LanguageContext";
import { parseEmotionalTags } from "~/utils/emotionalTags";

export default function ProductEmotionalTags({
  emotionalTags,
  emotionalTagsHi,
  className = "",
}) {
  const { lang } = useLang();
  const source =
    lang === "hi" && emotionalTagsHi && String(emotionalTagsHi).trim() !== ""
      ? emotionalTagsHi
      : emotionalTags;
  const tags = parseEmotionalTags(source);
  if (!tags.length) return null;

  return (
    <div className={`product-emotional-tags ${className}`.trim()}>
      {tags.map((tag) => (
        <span key={tag} className="badge bg-light text-dark me-1 mb-1">
          {tag}
        </span>
      ))}
    </div>
  );
}
