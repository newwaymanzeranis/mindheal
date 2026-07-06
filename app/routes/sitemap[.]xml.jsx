import { handleStaticAssetRequest } from "~/lib/staticAssets.server";

export async function loader({ request }) {
  const response = await handleStaticAssetRequest(request);
  if (response) return response;
  throw new Response("Not Found", { status: 404 });
}
