import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import AppointmentDetailModal from "~/components/admin/AppointmentDetailModal";
import { useAuth } from "~/context/AuthContext";
import { appointmentsApi } from "~/lib/api";
import {
  APPOINTMENT_STATUS_CLASS,
  APPOINTMENT_STATUS_LABELS,
  formatAppointmentDate,
} from "~/utils/appointmentStatus";

const STATUS_OPTIONS = ["OPEN", "WORKING", "COMPLETE"];

export default function AdminAppointments() {
  const { isAdmin } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "";
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (!statusFilter) return appointments;
    return appointments.filter((a) => a.status === statusFilter);
  }, [appointments, statusFilter]);

  const load = () => {
    setLoading(true);
    appointmentsApi
      .listStaff()
      .then((data) => setAppointments(data.appointments))
      .catch((err) => setError(err.message || "Failed to load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpdated = (updated) => {
    setAppointments((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    setSelected(updated);
  };

  return (
    <>
      <div className="admin-page-header">
        <h1>Consultation Appointments</h1>
        <p className="text-muted mb-0">
          {isAdmin ? "All doctors" : "Your appointments"} · Click a row for details & scheduling
        </p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="admin-orders-filters mb-3 d-flex align-items-center flex-wrap gap-2">
        <select
          className="form-select form-select-sm"
          style={{ maxWidth: 220 }}
          value={statusFilter}
          onChange={(e) => {
            const v = e.target.value;
            if (v) setSearchParams({ status: v });
            else setSearchParams({});
          }}
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {APPOINTMENT_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-card">
        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted mb-0">No appointments yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Phone</th>
                <th>Requested</th>
                <th>Scheduled</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr
                  key={a.id}
                  className="admin-table-row-clickable"
                  onClick={() => setSelected(a)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <code className="small">{a.appointmentNumber}</code>
                  </td>
                  <td>
                    <span className={`admin-badge ${APPOINTMENT_STATUS_CLASS[a.status] || "muted"}`}>
                      {APPOINTMENT_STATUS_LABELS[a.status] || a.status}
                    </span>
                  </td>
                  <td>{a.patientName}</td>
                  <td>{a.teamMember?.name}</td>
                  <td>{a.patientPhone}</td>
                  <td>{formatAppointmentDate(a.createdAt)}</td>
                  <td>{formatAppointmentDate(a.scheduledAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <AppointmentDetailModal
          appointment={selected}
          onClose={() => setSelected(null)}
          onUpdated={handleUpdated}
          canSchedule
        />
      )}
    </>
  );
}
