/**
 * Generates public/sitemap.xml and public/robots.txt at build time.
 * Ensures Google can fetch the sitemap even before SSR routes are hit.
 */
import { writeFileSync, mkdirSync } from "node:fs";

const SITE_URL = (
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  "https://mind-heal.in"
)
  .trim()
  .replace(/\/$/, "");

const DEFAULT_BOTTLE = "/assets/img/products/product01.png";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function imageSrc(path) {
  if (!path) return DEFAULT_BOTTLE;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `/assets/img/${path}`;
}

function absoluteUrl(path) {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function absoluteImage(path) {
  if (!path) return absoluteUrl("/assets/img/logo.png");
  if (path.startsWith("http")) return path;
  return absoluteUrl(imageSrc(path));
}

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().split("T")[0];
}

function truncate(text, max = 200) {
  if (!text) return "";
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

function stripHtml(html) {
  if (!html) return "";
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanProductName(name) {
  if (!name) return "";
  return String(name)
    .replace(/[（(][^）)]*[）)]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function productImages(product) {
  const paths = [
    imageSrc(product.productBottleImage || DEFAULT_BOTTLE),
    product.image,
  ].filter(Boolean);
  return [...new Set(paths.map((p) => absoluteImage(p)))];
}

function urlEntry(path, { lastmod, changefreq, priority, images } = {}) {
  const parts = [`  <url>`, `    <loc>${escapeXml(absoluteUrl(path))}</loc>`];
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
  if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority) parts.push(`    <priority>${priority}</priority>`);
  for (const image of images ?? []) {
    parts.push("    <image:image>");
    parts.push(`      <image:loc>${escapeXml(image.loc)}</image:loc>`);
    if (image.title) parts.push(`      <image:title>${escapeXml(image.title)}</image:title>`);
    if (image.caption) parts.push(`      <image:caption>${escapeXml(image.caption)}</image:caption>`);
    parts.push("    </image:image>");
  }
  parts.push("  </url>");
  return parts.join("\n");
}

function productSitemapImages(product) {
  const name = cleanProductName(product.name);
  const caption =
    product.shortDescription ||
    stripHtml(product.description) ||
    `${name} — Mind Heal Bach Flower Remedy`;
  return productImages(product).map((loc) => ({
    loc,
    title: `${name} | Mind Heal Bach Flower Remedy`,
    caption: truncate(caption, 200),
  }));
}

function buildSitemapXml(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>`;
}

function staticPageEntries() {
  const staticPages = [
    { path: "/", changefreq: "daily", priority: "1.0" },
    { path: "/about", changefreq: "monthly", priority: "0.8" },
    { path: "/contact", changefreq: "monthly", priority: "0.8" },
    { path: "/services", changefreq: "monthly", priority: "0.8" },
    { path: "/healing_stories", changefreq: "weekly", priority: "0.7" },
    { path: "/buy_mh_mix", changefreq: "daily", priority: "0.9" },
    { path: "/blog", changefreq: "weekly", priority: "0.8" },
  ];
  return staticPages.map((page) => urlEntry(page.path, page));
}

function writeRobots() {
  writeFileSync(
    "public/robots.txt",
    `User-agent: *
Allow: /

Disallow: /m1i2n3d4_h5e6a7l8
Disallow: /admin
Disallow: /account
Disallow: /checkout
Disallow: /cart
Disallow: /login
Disallow: /register
Disallow: /forgot-password
Disallow: /orders

Sitemap: ${SITE_URL}/sitemap.xml
`,
    "utf8"
  );
}

async function loadPrisma() {
  const candidates = [
    "@prisma/client",
    "../server/node_modules/@prisma/client/index.js",
  ];

  for (const specifier of candidates) {
    try {
      const mod = await import(specifier);
      return new mod.PrismaClient();
    } catch {
      // try next path
    }
  }

  throw new Error("Prisma client not found — run prisma generate first");
}

async function main() {
  const prisma = await loadPrisma();

  try {
    const [products, posts, team] = await Promise.all([
      prisma.product.findMany({
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.post.findMany({
        where: { published: true },
        take: 200,
        orderBy: { publishedAt: "desc" },
      }),
      prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);

    const entries = [
      ...staticPageEntries(),
      ...products.map((product) =>
        urlEntry(`/products/${product.slug}`, {
          lastmod: formatDate(product.updatedAt),
          changefreq: "weekly",
          priority: "0.9",
          images: productSitemapImages(product),
        })
      ),
      ...posts.map((post) =>
        urlEntry(`/blog/${post.slug}`, {
          lastmod: formatDate(post.updatedAt || post.publishedAt),
          changefreq: "monthly",
          priority: "0.7",
        })
      ),
      ...team.map((member) =>
        urlEntry(`/team/${member.slug}`, {
          lastmod: formatDate(member.updatedAt),
          changefreq: "monthly",
          priority: "0.6",
        })
      ),
    ];

    mkdirSync("public", { recursive: true });
    writeFileSync("public/sitemap.xml", buildSitemapXml(entries), "utf8");
    writeRobots();

    console.log(
      `[sitemap] Generated public/sitemap.xml (${products.length} products, ${posts.length} posts)`
    );
    console.log(`[sitemap] Site URL: ${SITE_URL}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.warn("[sitemap] Could not generate full sitemap at build:", error.message);
  mkdirSync("public", { recursive: true });
  writeFileSync("public/sitemap.xml", buildSitemapXml(staticPageEntries()), "utf8");
  writeRobots();
  console.warn("[sitemap] Wrote fallback public/sitemap.xml with static pages only.");
});
