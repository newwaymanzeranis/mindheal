import { prisma } from "../lib/prisma.js";

export async function generateAppointmentNumber() {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const prefix = `APT-${y}${m}${d}-`;

  const last = await prisma.appointment.findFirst({
    where: { appointmentNumber: { startsWith: prefix } },
    orderBy: { id: "desc" },
    select: { appointmentNumber: true },
  });

  let seq = 1;
  if (last?.appointmentNumber) {
    const part = last.appointmentNumber.slice(prefix.length);
    const n = parseInt(part, 10);
    if (!Number.isNaN(n)) seq = n + 1;
  }

  return `${prefix}${String(seq).padStart(4, "0")}`;
}
