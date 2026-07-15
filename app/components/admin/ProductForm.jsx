import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { productsApi } from "~/lib/api";
import { slugify } from "~/utils/slugify";
import { adminPath } from "~/config/site";

const empty = {
  name: "",
  nameHi: "",
  slug: "",
  mindHealNo: "",
  description: "",
  descriptionHi: "",
  shortDescription: "",
  shortDescriptionHi: "",
  mrp: "400",
  price: "250",
  image: "",
  productBottleImage: "",
  youtubeUrl: "",
  published: true,
  sortOrder: 0,
  emotionalTags: "",
  emotionalTagsHi: "",
};

export default function ProductForm({ productId }) {
  const navigate = useNavigate();
  const isEdit = Boolean(productId);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    productsApi
      .get(productId)
      .then((product) => {
        setForm({
          name: product.name || "",
          nameHi: product.nameHi || "",
          slug: product.slug || "",
          mindHealNo: product.mindHealNo || "",
          description: product.description || "",
          descriptionHi: product.descriptionHi || "",
          shortDescription: product.shortDescription || "",
          shortDescriptionHi: product.shortDescriptionHi || "",
          mrp: product.mrp != null ? String(product.mrp) : "400",
          price: product.price != null ? String(product.price) : "250",
          image: product.image || "",
          productBottleImage: product.productBottleImage || "",
          youtubeUrl: product.youtubeUrl || "",
          published: product.published ?? true,
          sortOrder: product.sortOrder ?? 0,
          emotionalTags: product.emotionalTags || "",
          emotionalTagsHi: product.emotionalTagsHi || "",
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [productId, isEdit]);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleNameBlur = () => {
    if (!form.slug && form.name) update("slug", slugify(form.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const body = {
      name: form.name,
      nameHi: form.nameHi.trim() || null,
      slug: form.slug,
      mindHealNo: form.mindHealNo.trim(),
      description: form.description,
      descriptionHi: form.descriptionHi.trim() || null,
      shortDescription: form.shortDescription.trim() || null,
      shortDescriptionHi: form.shortDescriptionHi.trim() || null,
      mrp: form.mrp ? Number(form.mrp) : 400,
      price: form.price ? Number(form.price) : 250,
      image: form.image,
      productBottleImage: form.productBottleImage.trim() || null,
      youtubeUrl: form.youtubeUrl.trim() || null,
      published: form.published,
      sortOrder: Number(form.sortOrder),
      emotionalTags: form.emotionalTags.trim() || null,
      emotionalTagsHi: form.emotionalTagsHi.trim() || null,
    };

    try {
      if (isEdit) {
        await productsApi.update(productId, body);
      } else {
        await productsApi.create(body);
      }
      navigate(adminPath("products"));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="admin-card">
      <h2>{isEdit ? "Edit Product" : "Add New Product"}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="row g-3">
          <div className="col-md-8">
            <div className="mb-3">
              <label className="form-label">Mind Heal No. *</label>
              <input
                className="form-control"
                placeholder="01"
                value={form.mindHealNo}
                onChange={(e) => update("mindHealNo", e.target.value)}
                required
              />
              <small className="text-muted">e.g. 01, 02 — shown as MIND HEAL NO. 01</small>
            </div>
            <div className="mb-3">
              <label className="form-label">Product Name *</label>
              <input
                className="form-control"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                onBlur={handleNameBlur}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Product Name (Hindi)</label>
              <input
                className="form-control"
                value={form.nameHi}
                onChange={(e) => update("nameHi", e.target.value)}
                placeholder="हिंदी में नाम (खाली छोड़ने पर अंग्रेज़ी दिखेगी)"
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
              <label className="form-label">Short Description</label>
              <textarea
                className="form-control"
                rows={2}
                placeholder="Brief summary for cards and listing pages"
                value={form.shortDescription}
                onChange={(e) => update("shortDescription", e.target.value)}
              />
              <small className="text-muted">
                Short line shown on product cards and page header. Full description below is optional.
              </small>
            </div>
            <div className="mb-3">
              <label className="form-label">Short Description (Hindi)</label>
              <textarea
                className="form-control"
                rows={2}
                placeholder="हिंदी में संक्षिप्त विवरण"
                value={form.shortDescriptionHi}
                onChange={(e) => update("shortDescriptionHi", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Full Description</label>
              <textarea
                className="form-control"
                rows={5}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Full Description (Hindi)</label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="हिंदी में पूरा विवरण"
                value={form.descriptionHi}
                onChange={(e) => update("descriptionHi", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Emotional Tags</label>
              <input
                type="text"
                className="form-control"
                placeholder="ocd, anxiety, repetitive-thoughts, mental-loop, overthinking"
                value={form.emotionalTags}
                onChange={(e) => update("emotionalTags", e.target.value)}
              />
              <small className="text-muted">
                Comma-separated tags (no link to other tables). Shown on product cards and detail page.
              </small>
            </div>
            <div className="mb-3">
              <label className="form-label">Emotional Tags (Hindi)</label>
              <input
                type="text"
                className="form-control"
                placeholder="ओसीडी, चिंता, दोहराव-वाले-विचार"
                value={form.emotionalTagsHi}
                onChange={(e) => update("emotionalTagsHi", e.target.value)}
              />
              <small className="text-muted">
                कॉमा से अलग किए गए हिंदी टैग। खाली छोड़ने पर अंग्रेज़ी टैग दिखेंगे।
              </small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Basic Price / MRP (₹)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="form-control"
                value={form.mrp}
                onChange={(e) => update("mrp", e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Discounted Price (₹)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="form-control"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Sort Order</label>
              <input
                type="number"
                className="form-control"
                value={form.sortOrder}
                onChange={(e) => update("sortOrder", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                className="form-control"
                placeholder="/assets/img/bach/no01.jpeg"
                value={form.image}
                onChange={(e) => update("image", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Product Bottle Image URL</label>
              <input
                className="form-control"
                placeholder="/assets/img/products/product01.png"
                value={form.productBottleImage}
                onChange={(e) => update("productBottleImage", e.target.value)}
              />
              <small className="text-muted">
                Bottle photo shown in the homepage product slider. If empty, the default bottle
                (/assets/img/products/product01.png) is shown.
              </small>
            </div>
            <div className="mb-3">
              <label className="form-label">YouTube Video URL</label>
              <input
                className="form-control"
                placeholder="https://www.youtube.com/watch?v=9PFB2v_fEaA"
                value={form.youtubeUrl}
                onChange={(e) => update("youtubeUrl", e.target.value)}
              />
              <small className="text-muted">
                Product video shown on the homepage play button. Leave empty to use the default
                introduction video.
              </small>
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="pub"
                checked={form.published}
                onChange={(e) => update("published", e.target.checked)}
              />
              <label className="form-check-label" htmlFor="pub">
                Published
              </label>
            </div>
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-success" disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
          </button>
          <Link to={adminPath("products")} className="btn btn-outline-secondary ms-2">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
