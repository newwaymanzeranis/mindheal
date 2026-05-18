/** Public site URL for QR codes & links (set VITE_SITE_URL in production). */
export function getSiteUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL;
  if (fromEnv) return String(fromEnv).replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "https://mindheal.in";
}

export function getLogoUrl() {
  return `${getSiteUrl()}/assets/img/logo.png`;
}

export function getWhiteLogoUrl() {
  return `${getSiteUrl()}/assets/img/white_logo.png`;
}

export const RETURN_ADDRESS = {
  name: "Mind Heal",
  lines: ["Aadil Nagar, Tehri Pulia", "Lucknow, U.P. 226022", "India"],
  phone: "+91 7457988355",
  email: "mindheal@gmail.com",
};
