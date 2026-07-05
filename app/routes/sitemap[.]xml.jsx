import {
  fetchAllProducts,
  fetchPosts,
  fetchTeamMembers,
} from "~/lib/fetchApi.server";
import {
  absoluteUrl,
  getSiteUrl,
  productSitemapImages,
} from "~/utils/seo";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().split("T")[0];
}

function urlEntry(siteUrl, path, { lastmod, changefreq, priority, images } = {}) {
  const parts = [`  <url>`, `    <loc>${escapeXml(absoluteUrl(path, siteUrl))}</loc>`];

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

export async function loader({ request }) {
  const siteUrl = getSiteUrl(request);
  const opts = { request };

  const [products, posts, team] = await Promise.all([
    fetchAllProducts("published=true", opts),
    fetchPosts("published=true&limit=200", opts),
    fetchTeamMembers(opts),
  ]);

  const staticPages = [
    { path: "/", changefreq: "daily", priority: "1.0" },
    { path: "/about", changefreq: "monthly", priority: "0.8" },
    { path: "/contact", changefreq: "monthly", priority: "0.8" },
    { path: "/services", changefreq: "monthly", priority: "0.8" },
    { path: "/healing_stories", changefreq: "weekly", priority: "0.7" },
    { path: "/buy_mh_mix", changefreq: "daily", priority: "0.9" },
    { path: "/blog", changefreq: "weekly", priority: "0.8" },
  ];

  const entries = [
    ...staticPages.map((page) => urlEntry(siteUrl, page.path, page)),
    ...(products ?? []).map((product) =>
      urlEntry(siteUrl, `/products/${product.slug}`, {
        lastmod: formatDate(product.updatedAt),
        changefreq: "weekly",
        priority: "0.9",
        images: productSitemapImages(product, siteUrl),
      })
    ),
    ...(posts ?? []).map((post) =>
      urlEntry(siteUrl, `/blog/${post.slug}`, {
        lastmod: formatDate(post.updatedAt || post.publishedAt),
        changefreq: "monthly",
        priority: "0.7",
      })
    ),
    ...(team ?? []).map((member) =>
      urlEntry(siteUrl, `/team/${member.slug}`, {
        lastmod: formatDate(member.updatedAt),
        changefreq: "monthly",
        priority: "0.6",
      })
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
