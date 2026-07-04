import { DEFAULT_LANG, LANG_COOKIE, normalizeLang } from "~/i18n";

/**
 * Read the selected language from the `lang` cookie on the incoming request.
 * Used in the root loader so SSR renders in the correct language (no flash).
 * @param {Request} request
 */
export function getLangFromRequest(request) {
  const cookieHeader = request?.headers?.get?.("Cookie");
  if (!cookieHeader) return DEFAULT_LANG;

  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${LANG_COOKIE}=`));

  if (!match) return DEFAULT_LANG;
  return normalizeLang(decodeURIComponent(match.split("=")[1] ?? ""));
}
