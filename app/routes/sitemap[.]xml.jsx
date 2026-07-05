import { buildSitemapResponse } from "~/lib/sitemap.server";

export async function loader({ request }) {
  return buildSitemapResponse(request);
}
