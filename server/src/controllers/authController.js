import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { sendPasswordOtpEmail } from "../services/emailService.js";
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

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      teamMemberProfile: { select: { id: true, name: true, slug: true } },
    },
  });
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
      teamMemberProfile: user.teamMemberProfile ?? null,
    },
    token,
  });
};

export const me = async (req, res) => {
  return ok(res, { user: req.user });
};

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function signResetToken(userId) {
  return jwt.sign({ userId, type: "password_reset" }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return fail(res, "Email is required");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user && user.isActive) {
    const recentOtp = await prisma.passwordResetOtp.findFirst({
      where: {
        userId: user.id,
        usedAt: null,
        createdAt: { gte: new Date(Date.now() - 60 * 1000) },
      },
    });

    if (!recentOtp) {
      const otp = generateOtp();
      const otpHash = await bcrypt.hash(otp, 10);
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      const mailResult = await sendPasswordOtpEmail({
        email: user.email,
        name: user.name,
        otp,
      });

      if (!mailResult.ok) {
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `[forgotPassword] DEV — OTP for ${user.email}: ${otp} (email failed: ${mailResult.error})`
          );
        }
        return fail(
          res,
          "Email bhejne mein problem aayi. Gmail App Password check karein (server/.env → SMTP_PASS).",
          503
        );
      }

      await prisma.passwordResetOtp.updateMany({
        where: { userId: user.id, usedAt: null },
        data: { usedAt: new Date() },
      });

      await prisma.passwordResetOtp.create({
        data: { userId: user.id, otpHash, expiresAt },
      });
    }
  }

  return ok(res, {
    message: "If that email is registered, we sent an OTP to your inbox.",
  });
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return fail(res, "Email and OTP are required");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) {
    return fail(res, "Invalid OTP", 400);
  }

  const record = await prisma.passwordResetOtp.findFirst({
    where: {
      userId: user.id,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    return fail(res, "OTP expired or not found. Please request a new one.", 400);
  }

  const valid = await bcrypt.compare(String(otp), record.otpHash);
  if (!valid) {
    return fail(res, "Invalid OTP", 400);
  }

  const resetToken = signResetToken(user.id);
  return ok(res, { resetToken, message: "OTP verified. Set your new password." });
};

export const resetPassword = async (req, res) => {
  const { email, resetToken, password, confirmPassword } = req.body;

  if (!email || !resetToken || !password || !confirmPassword) {
    return fail(res, "All fields are required");
  }

  if (password !== confirmPassword) {
    return fail(res, "Passwords do not match");
  }

  if (password.length < 6) {
    return fail(res, "Password must be at least 6 characters");
  }

  let payload;
  try {
    payload = jwt.verify(resetToken, process.env.JWT_SECRET);
  } catch {
    return fail(res, "Reset session expired. Please start again.", 400);
  }

  if (payload.type !== "password_reset") {
    return fail(res, "Invalid reset token", 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.id !== payload.userId || !user.isActive) {
    return fail(res, "Invalid reset request", 400);
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    }),
    prisma.passwordResetOtp.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    }),
  ]);

  return ok(res, { message: "Password changed successfully. You can now login." });
};
