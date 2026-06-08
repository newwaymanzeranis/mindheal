const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "/api";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("mind_heal_token");
}

export function setToken(token) {
  localStorage.setItem("mind_heal_token", token);
}

export function clearToken() {
  localStorage.removeItem("mind_heal_token");
  localStorage.removeItem("mind_heal_user");
}

export function getStoredUser() {
  const raw = localStorage.getItem("mind_heal_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  localStorage.setItem("mind_heal_user", JSON.stringify(user));
}

export async function api(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(json.message || "Request failed");
  }

  return json.data;
}

export const authApi = {
  register: (body) => api("/auth/register", { method: "POST", body }),
  login: (email, password) =>
    api("/auth/login", { method: "POST", body: { email, password } }),
  me: () => api("/auth/me"),
  forgotPassword: (email) =>
    api("/auth/forgot-password", { method: "POST", body: { email } }),
  verifyOtp: (email, otp) =>
    api("/auth/verify-otp", { method: "POST", body: { email, otp } }),
  resetPassword: (body) =>
    api("/auth/reset-password", { method: "POST", body }),
};

export const ordersApi = {
  create: (body) => api("/orders", { method: "POST", body }),
  list: () => api("/orders"),
  listAll: () => api("/orders/admin/all"),
  dashboardStats: () => api("/orders/admin/stats"),
  get: (id) => api(`/orders/${id}`),
  updateStatus: (id, status) =>
    api(`/orders/${id}/status`, { method: "PATCH", body: { status } }),
};

export const postsApi = {
  list: (params = "") => api(`/posts?${params}`),
  get: (id) => api(`/posts/${id}`),
  create: (body) => api("/posts", { method: "POST", body }),
  update: (id, body) => api(`/posts/${id}`, { method: "PUT", body }),
  remove: (id) => api(`/posts/${id}`, { method: "DELETE" }),
};

export const productsApi = {
  list: (params = "") => api(`/products?${params}`),
  get: (id) => api(`/products/${id}`),
  create: (body) => api("/products", { method: "POST", body }),
  update: (id, body) => api(`/products/${id}`, { method: "PUT", body }),
  remove: (id) => api(`/products/${id}`, { method: "DELETE" }),
};

export const categoriesApi = {
  list: () => api("/blog-categories"),
};

export const testimonialsApi = {
  list: () => api("/testimonials?published=false"),
  create: (body) => api("/testimonials", { method: "POST", body }),
  update: (id, body) => api(`/testimonials/${id}`, { method: "PUT", body }),
  remove: (id) => api(`/testimonials/${id}`, { method: "DELETE" }),
};
