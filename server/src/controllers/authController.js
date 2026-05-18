import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { fail, ok } from "../utils/response.js";

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function normalizePhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  return digits;
}

const userPublicSelect = {
  id: true,
  email: true,
  name: true,
  phone: true,
  role: true,
  createdAt: true,
};

export const register = async (req, res) => {
  const { email, password, confirmPassword, name, phone } = req.body;

  if (!email || !password || !confirmPassword) {
    return fail(res, "Email, password and confirm password are required");
  }

  if (!phone) {
    return fail(res, "Mobile number is required");
  }

  if (password !== confirmPassword) {
    return fail(res, "Passwords do not match");
  }

  if (password.length < 6) {
    return fail(res, "Password must be at least 6 characters");
  }

  const normalizedPhone = normalizePhone(phone);
  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    return fail(res, "Enter a valid 10-digit mobile number");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return fail(res, "Email already registered", 409);
  }

  const phoneTaken = await prisma.user.findUnique({
    where: { phone: normalizedPhone },
  });
  if (phoneTaken) {
    return fail(res, "Mobile number already registered", 409);
  }

  const userCount = await prisma.user.count();
  const role = userCount === 0 ? "ADMIN" : "USER";

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name: name?.trim() || null,
      phone: normalizedPhone,
      role,
    },
    select: userPublicSelect,
  });

  const token = signToken(user.id);
  return ok(res, { user, token }, 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return fail(res, "Email and password are required");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) {
    return fail(res, "Invalid email or password", 401);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return fail(res, "Invalid email or password", 401);
  }

  const token = signToken(user.id);
  return ok(res, {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    },
    token,
  });
};

export const me = async (req, res) => {
  return ok(res, { user: req.user });
};
