import { parseEmotionalTags } from "~/utils/emotionalTags";

export default function ProductEmotionalTags({ emotionalTags, className = "" }) {
  const tags = parseEmotionalTags(emotionalTags);
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
