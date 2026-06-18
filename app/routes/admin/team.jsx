import { useEffect, useState } from "react";

import { SOCIAL_PLATFORMS } from "~/components/TeamSocialLinks";
import { teamMembersApi } from "~/lib/api";

const empty = {
  name: "",
  slug: "",
  degree: "",
  experience: "",
  image: "",
  bio: "",
  expertise: "",
  portfolio: "",
  facebookUrl: "",
  twitterUrl: "",
  linkedinUrl: "",
  instagramUrl: "",
  doctorLoginEmail: "",
  published: true,
  sortOrder: 0,
};

export default function AdminTeam() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    teamMembersApi
      .list()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
  };

  const handleEdit = (m) => {
    setEditingId(m.id);
    setForm({
      name: m.name,
      slug: m.slug,
      degree: m.degree || "",
      experience: m.experience || "",
      image: m.image || "",
      bio: m.bio || "",
      expertise: m.expertise || "",
      portfolio: m.portfolio || "",
      facebookUrl: m.facebookUrl || "",
      twitterUrl: m.twitterUrl || "",
      linkedinUrl: m.linkedinUrl || "",
      instagramUrl: m.instagramUrl || "",
      doctorLoginEmail: m.user?.email || "",
      published: m.published,
      sortOrder: m.sortOrder ?? 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await teamMembersApi.update(editingId, form);
      } else {
        await teamMembersApi.create(form);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete team member?")) return;
    await teamMembersApi.remove(id);
    load();
  };

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const socialPreview = SOCIAL_PLATFORMS.filter(({ key }) => form[key]?.trim());

  return (
    <>
      <h2 className="mb-4">Team Members</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="admin-card mb-4">
        <h3>{editingId ? "Edit" : "Add"} Team Member</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Name *</label>
              <input className="form-control" value={form.name} onChange={update("name")} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Slug</label>
              <input
                className="form-control"
                value={form.slug}
                onChange={update("slug")}
                placeholder="auto-generated from name if empty"
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label">Degree / Qualification</label>
              <input
                className="form-control"
                value={form.degree}
                onChange={update("degree")}
                placeholder="e.g. BHMS. M.D."
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Experience</label>
              <input
                className="form-control"
                value={form.experience}
                onChange={update("experience")}
                placeholder="e.g. 25 Years"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Sort Order</label>
              <input
                type="number"
                className="form-control"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              className="form-control"
              value={form.image}
              onChange={update("image")}
              placeholder="/assets/img/doctors/photo.jpg"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Doctor Login Email (optional)</label>
            <input
              className="form-control"
              type="email"
              value={form.doctorLoginEmail}
              onChange={update("doctorLoginEmail")}
              placeholder="user@email.com — must be registered on site"
            />
            <small className="text-muted">
              Links this team member to a user account with DOCTOR role for appointment management.
            </small>
          </div>

          <div className="mb-3">
            <label className="form-label">Short Bio (Profile Hero)</label>
            <textarea className="form-control" rows={2} value={form.bio} onChange={update("bio")} />
          </div>

          <div className="mb-3">
            <label className="form-label">Expertise Description</label>
            <textarea
              className="form-control"
              rows={4}
              value={form.expertise}
              onChange={update("expertise")}
              placeholder="Describe areas of expertise..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Portfolio (one highlight per line)</label>
            <textarea
              className="form-control"
              rows={4}
              value={form.portfolio}
              onChange={update("portfolio")}
              placeholder="Led clinical practice for 25+ years&#10;Treated thousands of patients..."
            />
          </div>

          <div className="admin-card mb-4" style={{ background: "#f8fdf9", border: "1px solid #c8e6c9" }}>
            <h5 className="mb-2">
              <i className="bi bi-share me-2" />
              Social Media Profile Links
            </h5>
            <p className="text-muted small mb-3">
              Add profile URLs below. Visitors can click these icons on the About page and doctor profile
              page to open Facebook, Twitter/X, LinkedIn, and Instagram profiles in a new tab.
            </p>
            <div className="row g-3 mb-3">
              {SOCIAL_PLATFORMS.map(({ key, icon, label }) => (
                <div key={key} className="col-md-6">
                  <label className="form-label">
                    <i className={`bi ${icon} me-1`} /> {label} Profile URL
                  </label>
                  <input
                    className="form-control"
                    type="url"
                    value={form[key]}
                    onChange={update(key)}
                    placeholder={
                      key === "facebookUrl"
                        ? "https://facebook.com/username"
                        : key === "twitterUrl"
                          ? "https://twitter.com/username"
                          : key === "linkedinUrl"
                            ? "https://linkedin.com/in/username"
                            : "https://instagram.com/username"
                    }
                  />
                </div>
              ))}
            </div>
            {socialPreview.length > 0 && (
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <small className="text-muted me-2">Preview (clickable on website):</small>
                {socialPreview.map(({ key, icon, label }) => (
                  <a
                    key={key}
                    href={form[key].startsWith("http") ? form[key] : `https://${form[key]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-success"
                    title={`Open ${label}`}
                  >
                    <i className={`bi ${icon} me-1`} />
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="tp-published"
                checked={form.published}
                onChange={update("published")}
              />
              <label className="form-check-label" htmlFor="tp-published">
                Published (visible on website)
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-success me-2" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="admin-card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Degree</th>
                <th>Experience</th>
                <th>Social</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{m.name}</td>
                  <td>{m.degree || "—"}</td>
                  <td>{m.experience || "—"}</td>
                  <td>
                    <div className="d-flex gap-1">
                      {SOCIAL_PLATFORMS.map(({ key, icon, label }) =>
                        m[key] ? (
                          <a
                            key={key}
                            href={m[key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-success"
                            title={label}
                          >
                            <i className={`bi ${icon}`} />
                          </a>
                        ) : (
                          <span key={key} className="text-muted opacity-25" title={`No ${label}`}>
                            <i className={`bi ${icon}`} />
                          </span>
                        )
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`admin-badge ${m.published ? "success" : "muted"}`}>
                      {m.published ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td className="admin-actions">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(m)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(m.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
