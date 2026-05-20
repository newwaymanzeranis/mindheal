/** Safe internal path after login/register (fixes //checkout blank page). */
export function normalizeRedirect(path, fallback = "/checkout") {
  if (!path || typeof path !== "string") return fallback;

  const trimmed = path.trim();
  if (!trimmed) return fallback;

  // Block external URLs
  if (/^https?:\/\//i.test(trimmed)) return fallback;

  let internal = trimmed;
  if (!internal.startsWith("/")) {
    internal = `/${internal}`;
  }

  // Collapse //checkout → /checkout
  internal = internal.replace(/^\/+/, "/");

  if (internal === "/" || internal.includes("..")) return fallback;

  return internal;
}

export function buildAuthRedirectUrl(basePath, redirectTo = "/checkout") {
  const path = normalizeRedirect(redirectTo, "/checkout");
  const sep = basePath.includes("?") ? "&" : "?";
  return `${basePath}${sep}redirect=${encodeURIComponent(path)}`;
}
