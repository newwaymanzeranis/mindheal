const API_BASE =
  process.env.API_INTERNAL_URL ||
  process.env.VITE_API_URL ||
  "http://127.0.0.1:4000/api";

export async function fetchApi(path) {
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

export async function fetchPosts(params = "published=true&limit=50") {
  const data = await fetchApi(`/posts?${params}`);
  return data?.posts ?? [];
}

export async function fetchPostBySlug(slug) {
  return fetchApi(`/posts/slug/${slug}`);
}

export async function fetchProducts(params = "published=true&limit=50") {
  const data = await fetchApi(`/products?${params}`);
  return data?.products ?? [];
}

export async function fetchTestimonials() {
  return (await fetchApi("/testimonials")) ?? [];
}

export async function fetchHomeSlides() {
  return (await fetchApi("/home-slides")) ?? [];
}

export async function fetchProductBySlug(slug) {
  return fetchApi(`/products/slug/${slug}`);
}
