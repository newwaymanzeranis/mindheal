import { buildRobotsResponse } from "~/lib/robots.server";

export async function loader({ request }) {
  return buildRobotsResponse(request);
}
