import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { fail } from "../utils/response.js";

export async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return fail(res, "Authentication required", 401);
    }

    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return fail(res, "Invalid or inactive user", 401);
    }

    req.user = user;
    next();
  } catch {
    return fail(res, "Invalid or expired token", 401);
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== "ADMIN") {
    return fail(res, "Admin access required", 403);
  }
  next();
}
