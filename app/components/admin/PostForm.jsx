import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { categoriesApi, postsApi } from "~/lib/api";
import { slugify } from "~/utils/slugify";
import { adminPath } from "~/config/site";

const empty = {
  title: "",
  titleHi: "",
  slug: "",
  excerpt: "",
  excerptHi: "",
  content: "",
  contentHi: "",
  image: "",
  author: "Mind Heal",
  published: false,
  categoryId: "",
};

export default function PostForm({ postId }) {
  const navigate = useNavigate();
  const isEdit = Boolean(postId);
  const [form, setForm] = useState(empty);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    categoriesApi.list().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    postsApi
      .get(postId)
      .then((post) => {
        setForm({
          title: post.title || "",
          titleHi: post.titleHi || "",
          slug: post.slug || "",
          excerpt: post.excerpt || "",
          excerptHi: post.excerptHi || "",
          content: post.content || "",
          contentHi: post.contentHi || "",
          image: post.image || "",
          author: post.author || "",
          published: post.published || false,
          categoryId: post.categoryId ? String(post.categoryId) : "",
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [postId, isEdit]);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleTitleBlur = () => {
    if (!form.slug && form.title) {
      update("slug", slugify(form.title));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const body = {
      ...form,
      categoryId: form.categoryId ? Number(form.categoryId) : null,
    };

    try {
      if (isEdit) {
        await postsApi.update(postId, body);
      } else {
        await postsApi.create(body);
      }
      navigate(adminPath("posts"));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="admin-card">
      <h2>{isEdit ? "Edit Blog Post" : "Add New Blog Post"}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="mb-3">
          <label className="form-label">Title *</label>
          <input
            className="form-control"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            onBlur={handleTitleBlur}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Title (Hindi)</label>
          <input
            className="form-control"
            value={form.titleHi}
            onChange={(e) => update("titleHi", e.target.value)}
            placeholder="हिंदी में शीर्षक (खाली छोड़ने पर अंग्रेज़ी दिखेगा)"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Slug</label>
          <input
            className="form-control"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={form.categoryId}
            onChange={(e) => update("categoryId", e.target.value)}
          >
            <option value="">— Select —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            className="form-control"
            value={form.author}
            onChange={(e) => update("author", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            className="form-control"
            placeholder="/assets/img/blog/blog1.png"
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Excerpt</label>
          <textarea
            className="form-control"
            rows={2}
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Excerpt (Hindi)</label>
          <textarea
            className="form-control"
            rows={2}
            placeholder="हिंदी में संक्षिप्त विवरण"
            value={form.excerptHi}
            onChange={(e) => update("excerptHi", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content *</label>
          <textarea
            className="form-control"
            rows={10}
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content (Hindi)</label>
          <textarea
            className="form-control"
            rows={10}
            placeholder="हिंदी में पूरा कंटेंट (खाली छोड़ने पर अंग्रेज़ी दिखेगा)"
            value={form.contentHi}
            onChange={(e) => update("contentHi", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="published"
            checked={form.published}
            onChange={(e) => update("published", e.target.checked)}
          />
          <label className="form-check-label ms-2" htmlFor="published">
            Publish on website
          </label>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success" disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
          </button>
          <Link to={adminPath("posts")} className="btn btn-outline-secondary ms-2">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
