export function normalizeEmotionalTags(value) {
  if (value == null || value === "") return null;
  const tags = String(value)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return tags.length ? tags.join(", ") : null;
}

export function parseEmotionalTags(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
