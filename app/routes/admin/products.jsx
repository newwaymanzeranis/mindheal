import { useEffect, useState } from "react";
import { Link } from "react-router";

import { productsApi } from "~/lib/api";
import { formatPrice, productMindHealLabel } from "~/utils/format";
import { getProductPricing } from "~/utils/pricing";

const PAGE_SIZE = 50;

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = (pageToLoad = page) => {
    setLoading(true);
    productsApi
      .list(`page=${pageToLoad}&limit=${PAGE_SIZE}&sortBy=sortOrder`)
      .then((res) => {
        setProducts(res.products || []);
        setPagination(res.pagination || { total: 0, page: pageToLoad, pages: 1 });
        setPage(pageToLoad);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(page);
  }, [page]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await productsApi.remove(id);
      const remainingOnPage = products.length - 1;
      if (remainingOnPage === 0 && page > 1) {
        setPage((current) => current - 1);
      } else {
        load(page);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const rangeStart = pagination.total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, pagination.total);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Products (MH Mix)</h2>
          {!loading && pagination.total > 0 && (
            <p className="text-muted small mb-0">
              Showing {rangeStart}–{rangeEnd} of {pagination.total} products
            </p>
          )}
        </div>
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
                {products.map((p, index) => (
                  <tr key={p.id}>
                    <td className="text-center text-muted fw-semibold">
                      {rangeStart + index}
                    </td>
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
        {!loading && pagination.pages > 1 && (
          <nav className="admin-pagination" aria-label="Products pagination">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
            >
              <i className="bi bi-chevron-left" /> Previous
            </button>
            <span className="admin-pagination__info">
              Page {page} of {pagination.pages}
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              disabled={page >= pagination.pages}
              onClick={() => setPage((current) => current + 1)}
            >
              Next <i className="bi bi-chevron-right" />
            </button>
          </nav>
        )}
      </div>
    </>
  );
}
