import { Prisma } from "@prisma/client";
import { fail } from "../utils/response.js";

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return fail(res, "A record with this value already exists", 409);
    }
    if (err.code === "P2025") {
      return fail(res, "Record not found", 404);
    }
  }

  return fail(res, err.message || "Internal server error", err.status || 500);
}
