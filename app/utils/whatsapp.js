const WHATSAPP_CLINIC_NUMBER = "917457988355";

export function buildAppointmentWhatsAppUrl(appointment) {
  const lines = [
    "Hello Mind Heal,",
    "",
    "Consultation Appointment Details:",
    `Appointment ID: ${appointment.appointmentNumber}`,
    `Doctor: ${appointment.teamMember?.name || "—"}`,
    `Patient: ${appointment.patientName}`,
    `Phone: ${appointment.patientPhone}`,
    `Email: ${appointment.patientEmail}`,
  ];

  if (appointment.concern) lines.push(`Concern: ${appointment.concern}`);
  if (appointment.preferredAt) {
    lines.push(`Preferred: ${new Date(appointment.preferredAt).toLocaleString("en-IN")}`);
  }
  if (appointment.scheduledAt) {
    lines.push(`Scheduled: ${new Date(appointment.scheduledAt).toLocaleString("en-IN")}`);
  }
  lines.push(`Status: ${appointment.status}`);

  const text = lines.join("\n");
  return `https://wa.me/${WHATSAPP_CLINIC_NUMBER}?text=${encodeURIComponent(text)}`;
}

export { WHATSAPP_CLINIC_NUMBER };
