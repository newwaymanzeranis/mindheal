import { useEffect, useState } from "react";

import { appointmentsApi } from "~/lib/api";
import { imageSrc } from "~/utils/format";
import { buildAppointmentWhatsAppUrl } from "~/utils/whatsapp";

import modalCss from "~/styles/appointment-modal.css?url";

export const appointmentModalLinks = () => [{ rel: "stylesheet", href: modalCss }];

const empty = {
  patientName: "",
  patientPhone: "",
  concern: "",
  preferredAt: "",
};

export default function AppointmentBookingModal({ member, open, onClose, user }) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    if (!open) return;
    setForm({
      patientName: user?.name || "",
      patientPhone: user?.phone || "",
      concern: "",
      preferredAt: "",
    });
    setError("");
    setAppointment(null);
  }, [open, user]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const { appointment: created } = await appointmentsApi.create({
        teamMemberId: member.id,
        patientName: form.patientName,
        patientPhone: form.patientPhone,
        concern: form.concern,
        preferredAt: form.preferredAt || null,
      });
      setAppointment(created);
    } catch (err) {
      setError(err.message || "Could not submit appointment");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="appointment-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="appointment-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
      >
        <div className="appointment-modal-header">
          <button type="button" className="appointment-modal-close" onClick={onClose} aria-label="Close">
            <i className="bi bi-x-lg" />
          </button>
          <img src="/assets/img/logo.png" alt="Mind Heal" className="appointment-modal-logo" />
          <h2 id="appointment-modal-title">Book Consultation</h2>
          <p>Fill the form below — our team will contact you shortly</p>
        </div>

        <div className="appointment-modal-body">
          <div className="appointment-doctor-chip">
            {member.image && (
              <img src={imageSrc(member.image)} alt="" />
            )}
            <span>
              <i className="bi bi-person-badge me-1" />
              {member.name}
              {member.degree ? ` · ${member.degree}` : ""}
            </span>
          </div>

          {appointment ? (
            <div className="appointment-modal-success">
              <i className="bi bi-check-circle-fill" />
              <h3>Appointment Submitted!</h3>
              <p className="text-muted mb-1">
                ID: <strong>{appointment.appointmentNumber}</strong>
              </p>
              <p className="text-muted small">
                Confirmation email sent to {appointment.patientEmail}. Our team will schedule your
                consultation soon.
              </p>
              <a
                href={buildAppointmentWhatsAppUrl(appointment)}
                target="_blank"
                rel="noopener noreferrer"
                className="appointment-modal-whatsapp"
              >
                <i className="bi bi-whatsapp" />
                Send Details on WhatsApp
              </a>
              <div className="mt-3">
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger py-2">{error}</div>}

              <div className="mb-3">
                <label className="form-label">Your Name *</label>
                <input
                  className="form-control"
                  value={form.patientName}
                  onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile Number *</label>
                <input
                  className="form-control"
                  type="tel"
                  value={form.patientPhone}
                  onChange={(e) => setForm({ ...form, patientPhone: e.target.value })}
                  placeholder="10-digit mobile"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" value={user?.email || ""} disabled readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Concern / Message *</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={form.concern}
                  onChange={(e) => setForm({ ...form, concern: e.target.value })}
                  placeholder="Describe your emotional wellness needs..."
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Preferred Date &amp; Time (optional)</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={form.preferredAt}
                  onChange={(e) => setForm({ ...form, preferredAt: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-success w-100" disabled={saving}>
                {saving ? "Submitting..." : "Submit Appointment"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
