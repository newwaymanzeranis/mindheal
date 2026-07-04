import en from "./en";
import hi from "./hi";

export const LANGUAGES = ["en", "hi"];
export const DEFAULT_LANG = "en";
export const LANG_COOKIE = "lang";

const dictionaries = { en, hi };

export function isLang(value) {
  return LANGUAGES.includes(value);
}

export function normalizeLang(value) {
  return isLang(value) ? value : DEFAULT_LANG;
}

export function getDict(lang) {
  return dictionaries[normalizeLang(lang)] ?? dictionaries[DEFAULT_LANG];
}

function lookup(dict, key) {
  return key.split(".").reduce((acc, part) => {
    if (acc == null || typeof acc !== "object") return undefined;
    return acc[part];
  }, dict);
}

function interpolate(value, vars) {
  if (typeof value !== "string" || !vars) return value;
  return value.replace(/\{(\w+)\}/g, (match, name) =>
    vars[name] != null ? String(vars[name]) : match
  );
}

/**
 * Translate a dot-notation key for the given language.
 * Falls back to English, then to the key itself if not found.
 * Returns arrays/objects as-is (useful for lists like feature cards).
 */
export function translate(lang, key, vars) {
  const resolved = normalizeLang(lang);
  let value = lookup(dictionaries[resolved], key);
  if (value === undefined && resolved !== DEFAULT_LANG) {
    value = lookup(dictionaries[DEFAULT_LANG], key);
  }
  if (value === undefined) return key;
  if (typeof value === "string") return interpolate(value, vars);
  return value;
}
