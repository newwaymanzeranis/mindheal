/** @param {string} base */
function normalizeApiBase(base) {
  const trimmed = base.trim().replace(/\/$/, "");
  if (!trimmed) return "";
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

/**
 * API base for server-side loaders (SSR on Vercel, local dev, etc.).
 * @param {Request | undefined} request
 */
export function resolveApiBase(request) {
  const fromEnv =
    process.env.API_INTERNAL_URL ||
    process.env.VITE_API_URL ||
    process.env.VITE_API_BASE_URL;

  if (fromEnv) {
    return normalizeApiBase(fromEnv);
  }

  // Same-origin /api (works with Vite proxy locally and Vercel rewrites in production)
  if (request) {
    return `${new URL(request.url).origin}/api`;
  }

  if (process.env.VERCEL_URL) {
    const host = process.env.VERCEL_URL.replace(/^https?:\/\//, "");
    return `https://${host}/api`;
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://127.0.0.1:4000/api";
  }

  return "";
}

/**
 * @param {string} path
 * @param {{ request?: Request }} [options]
 */
export async function fetchApi(path, { request } = {}) {
  const API_BASE = resolveApiBase(request);
  if (!API_BASE) {
    console.error(
      `API fetch failed ${path}: set API_INTERNAL_URL or VITE_API_URL to your public API (e.g. https://api.example.com/api)`
    );
    return null;
  }

  const url = `${API_BASE.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;

  try {
    const response = await fetch(url);
    const json = await response.json().catch(() => ({}));

    if (!response.ok || json.success === false) {
      console.error(`API error ${path}:`, json.message || response.status);
      return null;
    }

    return json.data;
  } catch (error) {
    console.error(`API fetch failed ${path}:`, error.message);
    return null;
  }
}

export async function fetchPosts(params = "published=true&limit=50", options = {}) {
  const data = await fetchApi(`/posts?${params}`, options);
  return data?.posts ?? [];
}

export async function fetchPostsPaginated(
  params = "published=true&limit=50",
  options = {}
) {
  const data = await fetchApi(`/posts?${params}`, options);
  return {
    posts: data?.posts ?? [],
    pagination: data?.pagination ?? {
      total: 0,
      page: 1,
      limit: 50,
      pages: 0,
    },
  };
}

export async function fetchPostBySlug(slug, options = {}) {
  return fetchApi(`/posts/slug/${slug}`, options);
}

export async function fetchProducts(params = "published=true&limit=50", options = {}) {
  const data = await fetchApi(`/products?${params}`, options);
  return data?.products ?? [];
}

export async function fetchAllProducts(baseParams = "published=true", options = {}) {
  const allProducts = [];
  let page = 1;
  const limit = 50;

  while (true) {
    const data = await fetchApi(
      `/products?${baseParams}&page=${page}&limit=${limit}`,
      options
    );
    const products = data?.products ?? [];
    allProducts.push(...products);

    const total = data?.pagination?.total ?? allProducts.length;
    if (allProducts.length >= total || products.length < limit) break;
    page += 1;
  }

  return allProducts;
}

export async function fetchTestimonials(options = {}) {
  return (await fetchApi("/testimonials", options)) ?? [];
}

export async function fetchHomeSlides(options = {}) {
  return (await fetchApi("/home-slides", options)) ?? [];
}

export async function fetchTeamMembers(options = {}) {
  return (await fetchApi("/team-members", options)) ?? [];
}

export async function fetchTeamMemberBySlug(slug, options = {}) {
  return fetchApi(`/team-members/slug/${slug}`, options);
}

export async function fetchProductBySlug(slug, options = {}) {
  return fetchApi(`/products/slug/${slug}`, options);
}
