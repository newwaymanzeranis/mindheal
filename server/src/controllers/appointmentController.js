import { prisma } from "../lib/prisma.js";
import {
  sendAppointmentAdminEmail,
  sendAppointmentPatientEmail,
  sendAppointmentScheduledEmail,
} from "../services/emailService.js";
import { generateAppointmentNumber } from "../utils/appointmentNumber.js";
import { fail, ok } from "../utils/response.js";

const appointmentInclude = {
  user: { select: { id: true, email: true, name: true, phone: true } },
  teamMember: { select: { id: true, name: true, slug: true, degree: true, image: true } },
};

function normalizePhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return digits;
}

function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function getDoctorTeamMemberId(user) {
  return user.teamMemberProfile?.id ?? null;
}

function canAccessAppointment(user, appointment) {
  if (user.role === "ADMIN") return true;
  if (user.role === "DOCTOR") {
    const doctorId = getDoctorTeamMemberId(user);
    return doctorId && appointment.teamMemberId === doctorId;
  }
  return appointment.userId === user.id;
}

export const create = async (req, res) => {
  const { teamMemberId, patientName, patientPhone, concern, preferredAt } = req.body;

  if (!teamMemberId || !patientName || !patientPhone) {
    return fail(res, "Doctor, name and phone are required");
  }

  const phone = normalizePhone(patientPhone);
  if (!/^[6-9]\d{9}$/.test(phone)) {
    return fail(res, "Enter a valid 10-digit mobile number");
  }

  const doctor = await prisma.teamMember.findFirst({
    where: { id: Number(teamMemberId), published: true },
  });
  if (!doctor) return fail(res, "Doctor not found", 404);

  const appointmentNumber = await generateAppointmentNumber();

  const appointment = await prisma.appointment.create({
    data: {
      appointmentNumber,
      userId: req.user.id,
      teamMemberId: doctor.id,
      patientName: String(patientName).trim(),
      patientPhone: phone,
      patientEmail: req.user.email,
      concern: concern ? String(concern).trim() : null,
      preferredAt: parseDate(preferredAt),
      status: "OPEN",
    },
    include: appointmentInclude,
  });

  sendAppointmentPatientEmail(appointment).catch((err) =>
    console.error("[appointment.create] patient email:", err.message)
  );
  sendAppointmentAdminEmail(appointment).catch((err) =>
    console.error("[appointment.create] admin email:", err.message)
  );

  return ok(res, { appointment }, 201);
};

export const listMine = async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    where: { userId: req.user.id },
    include: appointmentInclude,
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return ok(res, { appointments });
};

export const listStaff = async (req, res) => {
  if (req.user.role !== "ADMIN" && req.user.role !== "DOCTOR") {
    return fail(res, "Forbidden", 403);
  }

  const where = {};
  if (req.user.role === "DOCTOR") {
    const doctorId = getDoctorTeamMemberId(req.user);
    if (!doctorId) return fail(res, "Doctor profile not linked", 403);
    where.teamMemberId = doctorId;
  }

  const appointments = await prisma.appointment.findMany({
    where,
    include: appointmentInclude,
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return ok(res, { appointments });
};

export const getOne = async (req, res) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: Number(req.params.id) },
    include: appointmentInclude,
  });

  if (!appointment) return fail(res, "Appointment not found", 404);
  if (!canAccessAppointment(req.user, appointment)) {
    return fail(res, "Forbidden", 403);
  }

  return ok(res, { appointment });
};

export const updateStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ["OPEN", "WORKING", "COMPLETE"];
  if (!allowed.includes(status)) {
    return fail(res, "Invalid status");
  }

  const existing = await prisma.appointment.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!existing) return fail(res, "Appointment not found", 404);
  if (!canAccessAppointment(req.user, existing)) {
    return fail(res, "Forbidden", 403);
  }
  if (req.user.role === "USER") {
    return fail(res, "Forbidden", 403);
  }

  const appointment = await prisma.appointment.update({
    where: { id: existing.id },
    data: { status },
    include: appointmentInclude,
  });

  return ok(res, { appointment });
};

export const schedule = async (req, res) => {
  const { scheduledAt } = req.body;
  const when = parseDate(scheduledAt);
  if (!when) return fail(res, "Valid scheduled date & time required");

  const existing = await prisma.appointment.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!existing) return fail(res, "Appointment not found", 404);
  if (!canAccessAppointment(req.user, existing)) {
    return fail(res, "Forbidden", 403);
  }
  if (req.user.role === "USER") {
    return fail(res, "Forbidden", 403);
  }

  const appointment = await prisma.appointment.update({
    where: { id: existing.id },
    data: {
      scheduledAt: when,
      status: existing.status === "OPEN" ? "WORKING" : existing.status,
    },
    include: appointmentInclude,
  });

  sendAppointmentScheduledEmail(appointment).catch((err) =>
    console.error("[appointment.schedule] email:", err.message)
  );

  return ok(res, { appointment });
};
