import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { productsApi } from "~/lib/api";
import { formatPrice, productMindHealLabel } from "~/utils/format";
import { getProductPricing } from "~/utils/pricing";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    productsApi
      .list("limit=50")
      .then((res) => setProducts(res.products || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const sortedProducts = useMemo(
    () =>
      [...products].sort((a, b) => {
        const noA = String(a.mindHealNo ?? "").padStart(2, "0");
        const noB = String(b.mindHealNo ?? "").padStart(2, "0");
        return noA.localeCompare(noB, undefined, { numeric: true });
      }),
    [products]
  );

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await productsApi.remove(id);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Products (MH Mix)</h2>
        <Link to="/admin/products/new" className="btn btn-success">
          <i className="bi bi-plus-lg" /> Add Product
        </Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="admin-card admin-card--table">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "70px" }}>
                    Sr. No.
                  </th>
                  <th style={{ width: "140px" }}>Mind Heal No.</th>
                  <th>Name</th>
                  <th style={{ width: "110px" }}>MRP</th>
                  <th style={{ width: "110px" }}>Discounted</th>
                  <th style={{ width: "100px" }}>Status</th>
                  <th style={{ width: "160px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((p, index) => (
                  <tr key={p.id}>
                    <td className="text-center text-muted fw-semibold">{index + 1}</td>
                    <td>
                      <span className="admin-mh-no">
                        {productMindHealLabel(p.mindHealNo, p.sortOrder)}
                      </span>
                    </td>
                    <td>{p.name}</td>
                    <td className="text-muted text-decoration-line-through">
                      {formatPrice(getProductPricing(p).mrp)}
                    </td>
                    <td className="fw-semibold text-success">
                      {formatPrice(getProductPricing(p).salePrice)}
                    </td>
                    <td>
                      <span className={`admin-badge ${p.published ? "success" : "muted"}`}>
                        {p.published ? "Live" : "Hidden"}
                      </span>
                    </td>
                    <td className="admin-actions">
                      <Link
                        to={`/admin/products/${p.id}/edit`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && products.length === 0 && (
          <p className="text-muted mb-0">No products yet.</p>
        )}
      </div>
    </>
  );
}
