/**
 * Language-aware field picker for database content.
 *
 * Works like a theme toggle: the same object carries both English and Hindi
 * columns (e.g. `name` / `nameHi`). When Hindi is selected we return the `*Hi`
 * value, but if it is empty we fall back to the English value so the site is
 * never blank.
 *
 * @example pick(product, "name", lang)
 * @example pick(post, "title", lang)
 */
export function pick(obj, field, lang) {
  if (!obj) return "";
  if (lang === "hi") {
    const hiValue = obj[`${field}Hi`];
    if (hiValue != null && String(hiValue).trim() !== "") return hiValue;
  }
  return obj[field];
}
