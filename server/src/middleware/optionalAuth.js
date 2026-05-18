import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export async function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next();
  }

  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, role: true, isActive: true },
    });
    if (user?.isActive) {
      req.user = user;
    }
  } catch {
    // ignore invalid token for public reads
  }

  next();
}
