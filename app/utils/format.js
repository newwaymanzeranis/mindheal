export function formatPostDate(publishedAt) {
  if (!publishedAt) return { day: "", month: "" };
  const date = new Date(publishedAt);
  return {
    day: String(date.getDate()),
    month: date.toLocaleString("en-US", { month: "long" }),
  };
}

function padMindHealNo(mindHealNo, sortOrder = 0) {
  if (mindHealNo != null && String(mindHealNo).trim() !== "") {
    return String(mindHealNo).padStart(2, "0");
  }
  return String(sortOrder + 1).padStart(2, "0");
}

export function productMixLabel(mindHealNo, sortOrder = 0) {
  const num = padMindHealNo(mindHealNo, sortOrder);
  return `Mind Heal Mix No-${num}`;
}

export function productMindHealLabel(mindHealNo, sortOrder = 0) {
  const num = padMindHealNo(mindHealNo, sortOrder);
  return `MIND HEAL NO. ${num}`;
}

export function formatPrice(price) {
  if (price == null || price === "") return "—";
  const amount = Number(price);
  if (Number.isNaN(amount)) return "—";
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export function cleanProductName(name) {
  if (!name) return "";
  return String(name)
    .replace(/[（(][^）)]*[）)]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function imageSrc(path) {
  if (!path) return "/assets/img/blog/blog1.png";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `/assets/img/${path}`;
}

export const DEFAULT_BOTTLE_IMAGE = "/assets/img/products/product01.png";

export function bottleImageSrc(product) {
  return imageSrc(product?.productBottleImage || DEFAULT_BOTTLE_IMAGE);
}
