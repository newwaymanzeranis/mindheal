import { getSiteUrl } from "~/utils/seo";

export async function loader({ request }) {
  const siteUrl = getSiteUrl(request);

  const body = `User-agent: *
Allow: /

Disallow: /admin
Disallow: /account
Disallow: /checkout
Disallow: /cart
Disallow: /login
Disallow: /register
Disallow: /forgot-password
Disallow: /orders

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
