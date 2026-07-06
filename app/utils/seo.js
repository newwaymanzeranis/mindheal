import { pick } from "~/utils/i18nContent";
import { parseEmotionalTags } from "~/utils/emotionalTags";
import { bottleImageSrc, cleanProductName, imageSrc } from "~/utils/format";

export const SITE_NAME = "Mind Heal";
export const DEFAULT_SITE_URL = "https://mind-heal.in";
export const DEFAULT_OG_IMAGE = "/android-chrome-512x512.png";

export function getSiteUrl(request) {
  const fromEnv =
    (typeof process !== "undefined" &&
      (process.env.VITE_SITE_URL || process.env.SITE_URL)) ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL);

  if (fromEnv) {
    return String(fromEnv).trim().replace(/\/$/, "");
  }

  if (request) {
    const url = new URL(request.url);
    return `${url.protocol}//${url.host}`;
  }

  return DEFAULT_SITE_URL;
}

function truncate(text, max = 160) {
  if (!text) return "";
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

export function stripHtml(html) {
  if (!html) return "";
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function absoluteUrl(path, siteUrl = DEFAULT_SITE_URL) {
  const base = siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteImage(path, siteUrl = DEFAULT_SITE_URL) {
  if (!path) return absoluteUrl(DEFAULT_OG_IMAGE, siteUrl);
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return absoluteUrl(imageSrc(path), siteUrl);
}

export function localizedField(obj, field, lang = "en") {
  if (!obj) return "";
  return pick(obj, field, lang) || obj[field] || "";
}

export function parseProductTags(product, lang = "en") {
  if (!product) return [];

  const localized =
    lang === "hi" && product.emotionalTagsHi?.trim()
      ? product.emotionalTagsHi
      : product.emotionalTags;

  const localizedTags = parseEmotionalTags(localized);
  if (localizedTags.length) return localizedTags;

  return parseEmotionalTags(product.emotionalTags);
}

export function productKeywords(product, lang = "en") {
  const tags = parseProductTags(product, lang);
  const name = localizedField(product, "name", lang);

  const parts = [
    "Bach Flower Remedies",
    "Bach Flower Therapy",
    "Mind Heal",
    "emotional wellness",
    product.mindHealNo ? `Mind Heal No ${product.mindHealNo}` : null,
    cleanProductName(name),
    ...tags,
  ].filter(Boolean);

  return [...new Set(parts)].join(", ");
}

export function productImages(product, siteUrl = DEFAULT_SITE_URL) {
  const paths = [bottleImageSrc(product), product?.image].filter(Boolean);
  return [...new Set(paths.map((path) => absoluteImage(path, siteUrl)))];
}

function padMindHealNo(mindHealNo, sortOrder = 0) {
  if (mindHealNo != null && String(mindHealNo).trim() !== "") {
    return String(mindHealNo).padStart(2, "0");
  }
  return String((sortOrder ?? 0) + 1).padStart(2, "0");
}

export function productSeoTitle(product, lang = "en") {
  const name = cleanProductName(localizedField(product, "name", lang));
  const num = padMindHealNo(product?.mindHealNo, product?.sortOrder);
  return `Mind Heal No. ${num} — ${name}`;
}

export function buildPageMeta({
  title,
  description,
  path = "/",
  image,
  images,
  imageAlt,
  keywords,
  type = "website",
  noindex = false,
  siteUrl = DEFAULT_SITE_URL,
  jsonLd,
}) {
  const canonical = absoluteUrl(path, siteUrl);
  const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const desc = truncate(stripHtml(description));
  const imagePaths = images?.length ? images : image ? [image] : [DEFAULT_OG_IMAGE];
  const ogImages = imagePaths.map((img) => absoluteImage(img, siteUrl));

  const tags = [
    { title: pageTitle },
    { name: "description", content: desc },
    { tagName: "link", rel: "canonical", href: canonical },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: desc },
    { property: "og:url", content: canonical },
    { property: "og:locale", content: "en_IN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: desc },
    {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    },
  ];

  if (keywords) {
    tags.push({ name: "keywords", content: truncate(keywords, 500) });
  }

  for (const ogImage of ogImages.slice(0, 4)) {
    tags.push({ property: "og:image", content: ogImage });
    tags.push({ property: "og:image:secure_url", content: ogImage });
    tags.push({ name: "twitter:image", content: ogImage });
  }

  if (ogImages[0]?.includes("android-chrome-512x512")) {
    tags.push({ property: "og:image:width", content: "512" });
    tags.push({ property: "og:image:height", content: "512" });
    tags.push({ property: "og:image:type", content: "image/png" });
  }

  if (imageAlt) {
    tags.push({ property: "og:image:alt", content: imageAlt });
    tags.push({ name: "twitter:image:alt", content: imageAlt });
  }

  if (jsonLd) {
    const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    for (const block of blocks) {
      tags.push({ "script:ld+json": block });
    }
  }

  return tags;
}

export function organizationJsonLd(siteUrl = DEFAULT_SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/", siteUrl),
    logo: absoluteImage(DEFAULT_OG_IMAGE, siteUrl),
    email: "mindhealbbfr@gmail.com",
    telephone: "+91-7457988355",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Karimuddinpur, Post Ghosi",
      addressLocality: "Mau",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    sameAs: [],
  };
}

export function websiteJsonLd(siteUrl = DEFAULT_SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/", siteUrl),
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/buy_mh_mix", siteUrl)}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productBreadcrumbJsonLd(product, siteUrl = DEFAULT_SITE_URL, lang = "en") {
  const name = localizedField(product, "name", lang);
  const productUrl = absoluteUrl(`/products/${product.slug}`, siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/", siteUrl),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop Bach Flower Remedies",
        item: absoluteUrl("/buy_mh_mix", siteUrl),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cleanProductName(name),
        item: productUrl,
      },
    ],
  };
}

export function productJsonLd(product, siteUrl = DEFAULT_SITE_URL, lang = "en") {
  const name = cleanProductName(localizedField(product, "name", lang));
  const description =
    localizedField(product, "shortDescription", lang) ||
    truncate(stripHtml(localizedField(product, "description", lang)), 500);
  const tags = parseProductTags(product, lang);
  const images = productImages(product, siteUrl);
  const productUrl = absoluteUrl(`/products/${product.slug}`, siteUrl);
  const price = product.price ?? 250;
  const mrp = product.mrp ?? 400;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": productUrl,
    name,
    description,
    image: images.length === 1 ? images[0] : images,
    sku: product.mindHealNo ? `MH-${padMindHealNo(product.mindHealNo, product.sortOrder)}` : String(product.id),
    category: "Health & Beauty > Health Care > Alternative Medicine > Bach Flower Remedies",
    keywords: tags.join(", "),
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    url: productUrl,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "INR",
      price: String(price),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };

  if (mrp > price) {
    schema.offers.priceSpecification = {
      "@type": "UnitPriceSpecification",
      price: String(price),
      priceCurrency: "INR",
      referenceQuantity: {
        "@type": "QuantitativeValue",
        value: "1",
        unitCode: "C62",
      },
    };
  }

  if (tags.length) {
    schema.additionalProperty = tags.map((tag) => ({
      "@type": "PropertyValue",
      name: "emotional tag",
      value: tag,
    }));
  }

  return schema;
}

export function productCatalogJsonLd(products = [], siteUrl = DEFAULT_SITE_URL, lang = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mind Heal Bach Flower Remedies",
    description:
      "Complete catalog of Mind Heal Bach Flower remedy blends for emotional wellness — anxiety, OCD, stress, sleep, anger and more.",
    numberOfItems: products.length,
    url: absoluteUrl("/buy_mh_mix", siteUrl),
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/products/${product.slug}`, siteUrl),
      name: cleanProductName(localizedField(product, "name", lang)),
      image: absoluteImage(bottleImageSrc(product), siteUrl),
    })),
  };
}

export function articleJsonLd(post, siteUrl = DEFAULT_SITE_URL, lang = "en") {
  const headline = localizedField(post, "title", lang);
  const description =
    localizedField(post, "excerpt", lang) || truncate(localizedField(post, "content", lang), 300);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    image: absoluteImage(post.image, siteUrl),
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      "@type": "Person",
      name: post.author || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteImage(DEFAULT_OG_IMAGE, siteUrl),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`, siteUrl),
  };
}

export function productPageMeta(product, lang = "en", siteUrl = DEFAULT_SITE_URL) {
  const name = cleanProductName(localizedField(product, "name", lang));
  const tags = parseProductTags(product, lang);
  const tagText = tags.join(", ");
  const baseDescription =
    localizedField(product, "shortDescription", lang) ||
    stripHtml(localizedField(product, "description", lang)) ||
    `Buy ${name} — authentic Bach Flower remedy blend by Mind Heal. Natural emotional wellness support with Cash on Delivery across India.`;

  const description = tagText
    ? `${baseDescription} Helps with: ${tagText}. Order online at ₹${product.price ?? 250} with COD.`
    : baseDescription;

  const imageAlt = tagText
    ? `${name} — Mind Heal Bach Flower Remedy for ${tagText}`
    : `${name} — Mind Heal Bach Flower Remedy bottle`;

  return buildPageMeta({
    title: `${productSeoTitle(product, lang)} | Bach Flower Remedy`,
    description,
    keywords: productKeywords(product, lang),
    path: `/products/${product.slug}`,
    images: [bottleImageSrc(product), product.image].filter(Boolean),
    imageAlt,
    type: "product",
    siteUrl,
    jsonLd: [
      productJsonLd(product, siteUrl, lang),
      productBreadcrumbJsonLd(product, siteUrl, lang),
    ],
  });
}

export function productCatalogMeta(products = [], lang = "en", siteUrl = DEFAULT_SITE_URL) {
  const count = products.length;
  const allTags = new Set();
  for (const product of products) {
    for (const tag of parseProductTags(product, lang)) {
      allTags.add(tag);
    }
  }
  const tagSample = [...allTags].slice(0, 12).join(", ");

  return buildPageMeta({
    title: `Shop ${count}+ Bach Flower Remedies — Buy Mind Heal Mix Online`,
    description: `Browse and order ${count}+ Mind Heal Bach Flower remedy blends online. Filter by emotional need — ${tagSample} and more. ₹250 each with Cash on Delivery across India.`,
    keywords: [
      "Bach Flower Remedies",
      "Mind Heal",
      "buy Bach Flower online",
      "emotional wellness",
      ...allTags,
    ].join(", "),
    path: "/buy_mh_mix",
    image: "/assets/img/products/product01.png",
    siteUrl,
    jsonLd: productCatalogJsonLd(products, siteUrl, lang),
  });
}

export function blogPostMeta(post, lang = "en", siteUrl = DEFAULT_SITE_URL) {
  const title = localizedField(post, "title", lang);
  const description =
    localizedField(post, "excerpt", lang) ||
    localizedField(post, "content", lang) ||
    title;

  return buildPageMeta({
    title: `${title} | Mind Heal Blog`,
    description,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    siteUrl,
    jsonLd: articleJsonLd(post, siteUrl, lang),
  });
}

export function productSitemapImages(product, siteUrl = DEFAULT_SITE_URL) {
  const name = cleanProductName(product.name);
  const caption =
    product.shortDescription ||
    stripHtml(product.description) ||
    `${name} — Mind Heal Bach Flower Remedy`;

  return productImages(product, siteUrl).map((loc) => ({
    loc,
    title: `${name} | Mind Heal Bach Flower Remedy`,
    caption: truncate(caption, 200),
  }));
}
