import { useEffect, useState } from "react";

import { testimonialsApi } from "~/lib/api";

const empty = { name: "", content: "", image: "", rating: 5, published: true, sortOrder: 0 };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    testimonialsApi
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

  const handleEdit = (t) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      content: t.content,
      image: t.image || "",
      rating: t.rating ?? 5,
      published: t.published,
      sortOrder: t.sortOrder ?? 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await testimonialsApi.update(editingId, form);
      } else {
        await testimonialsApi.create(form);
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
    if (!confirm("Delete testimonial?")) return;
    await testimonialsApi.remove(id);
    load();
  };

  return (
    <>
      <h2 className="mb-4">Testimonials</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="admin-card mb-4">
        <h3>{editingId ? "Edit" : "Add"} Testimonial</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <div>
            <label className="form-label">Name *</label>
            <input
              className="form-control"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content *</label>
            <textarea
              className="form-control"
              rows={3}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              className="form-control"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label">Rating</label>
              <input
                type="number"
                min={1}
                max={5}
                className="form-control"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Sort Order</label>
              <input
                type="number"
                className="form-control"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
              />
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="tp"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="tp">
                  Published
                </label>
              </div>
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
                <th>Name</th>
                <th>Content</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.content.slice(0, 60)}...</td>
                  <td>
                    <span className={`admin-badge ${t.published ? "success" : "muted"}`}>
                      {t.published ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td className="admin-actions">
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(t)}>
                      Edit
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t.id)}>
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
