import { useEffect, useState } from "react";

import {
  APPOINTMENT_STATUS_CLASS,
  APPOINTMENT_STATUS_LABELS,
  formatAppointmentDate,
} from "~/utils/appointmentStatus";
import { buildAppointmentWhatsAppUrl } from "~/utils/whatsapp";
import { appointmentsApi } from "~/lib/api";

const STATUS_OPTIONS = ["OPEN", "WORKING", "COMPLETE"];

function toLocalInputValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AppointmentDetailModal({ appointment, onClose, onUpdated, canSchedule }) {
  const [status, setStatus] = useState(appointment.status);
  const [scheduledAt, setScheduledAt] = useState(toLocalInputValue(appointment.scheduledAt));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setStatus(appointment.status);
    setScheduledAt(toLocalInputValue(appointment.scheduledAt));
    setError("");
  }, [appointment]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleStatusSave = async () => {
    setSaving(true);
    setError("");
    try {
      const { appointment: updated } = await appointmentsApi.updateStatus(appointment.id, status);
      onUpdated(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSchedule = async () => {
    if (!scheduledAt) {
      setError("Select date and time");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const { appointment: updated } = await appointmentsApi.schedule(
        appointment.id,
        new Date(scheduledAt).toISOString()
      );
      onUpdated(updated);
      setStatus(updated.status);
      setScheduledAt(toLocalInputValue(updated.scheduledAt));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose} role="presentation">
      <div className="admin-modal admin-modal-lg" onClick={(e) => e.stopPropagation()} role="dialog">
        <div className="admin-modal-header">
          <h3>Appointment {appointment.appointmentNumber}</h3>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
        </div>
        <div className="admin-modal-body">
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <strong>Doctor</strong>
              <p className="mb-0">{appointment.teamMember?.name}</p>
            </div>
            <div className="col-md-6">
              <strong>Patient</strong>
              <p className="mb-0">{appointment.patientName}</p>
            </div>
            <div className="col-md-6">
              <strong>Phone</strong>
              <p className="mb-0">{appointment.patientPhone}</p>
            </div>
            <div className="col-md-6">
              <strong>Email</strong>
              <p className="mb-0">{appointment.patientEmail}</p>
            </div>
            <div className="col-md-6">
              <strong>Requested</strong>
              <p className="mb-0">{formatAppointmentDate(appointment.createdAt)}</p>
            </div>
            <div className="col-md-6">
              <strong>Preferred</strong>
              <p className="mb-0">{formatAppointmentDate(appointment.preferredAt)}</p>
            </div>
            <div className="col-12">
              <strong>Concern</strong>
              <p className="mb-0">{appointment.concern || "—"}</p>
            </div>
          </div>

          {canSchedule && (
            <>
              <hr />
              <div className="row g-3 align-items-end">
                <div className="col-md-4">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {APPOINTMENT_STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleStatusSave}
                    disabled={saving}
                  >
                    Update Status
                  </button>
                </div>
              </div>

              <div className="row g-3 align-items-end mt-2">
                <div className="col-md-6">
                  <label className="form-label">Schedule Date &amp; Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSchedule}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Schedule & Email Patient"}
                  </button>
                </div>
              </div>
              {appointment.scheduledAt && (
                <p className="text-success small mt-2 mb-0">
                  Currently scheduled: {formatAppointmentDate(appointment.scheduledAt)}
                </p>
              )}
            </>
          )}

          <div className="mt-3">
            <a
              href={buildAppointmentWhatsAppUrl(appointment)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-success"
            >
              <i className="bi bi-whatsapp me-1" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
