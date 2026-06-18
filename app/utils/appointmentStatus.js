export const APPOINTMENT_STATUS_LABELS = {
  OPEN: "Open",
  WORKING: "Working",
  COMPLETE: "Complete",
};

export const APPOINTMENT_STATUS_CLASS = {
  OPEN: "warning",
  WORKING: "info",
  COMPLETE: "success",
};

export function formatAppointmentDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
