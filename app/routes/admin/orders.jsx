import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import OrderDetailModal from "~/components/admin/OrderDetailModal";
import { ADMIN_STATUS_LABELS } from "~/utils/orderStatus";
import { ordersApi } from "~/lib/api";
import { formatPrice } from "~/utils/format";
import { printDeliverySlip } from "~/utils/printDeliverySlip";

const STATUS_OPTIONS = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    if (!statusFilter) return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  const load = () => {
    setLoading(true);
    ordersApi
      .listAll()
      .then((data) => setOrders(data.orders))
      .catch((err) => setError(err.message || "Failed to load orders"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!selectedOrder) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedOrder(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selectedOrder]);

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      const { order } = await ordersApi.updateStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o.id === order.id ? order : o)));
      setSelectedOrder((prev) => (prev?.id === order.id ? order : prev));
    } catch (err) {
      alert(err.message || "Could not update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const openDetail = (order) => setSelectedOrder(order);

  return (
    <>
      <div className="admin-page-header">
        <h1>Orders (COD)</h1>
        <p className="text-muted mb-0">
          Click a row for full details · Print slip to stick on delivery box
        </p>
      </div>

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
              {ADMIN_STATUS_LABELS[s] || s}
            </option>
          ))}
        </select>
        {statusFilter && (
          <span className="text-muted small">
            Showing {filteredOrders.length} of {orders.length}
          </span>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-muted">No orders yet.</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-muted">No orders with this status.</p>
      ) : (
        <div className="table-responsive admin-card admin-card--table">
          <table className="table table-hover align-middle admin-table admin-orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="admin-order-row"
                  onClick={() => openDetail(order)}
                >
                  <td>
                    <strong>{order.orderNumber}</strong>
                    <div className="small text-muted">{order.city}</div>
                  </td>
                  <td>
                    {order.user?.name || order.shippingName || "—"}
                    <div className="small text-muted">{order.user?.email}</div>
                  </td>
                  <td>{order.items?.length ?? 0}</td>
                  <td>{formatPrice(Number(order.subtotal))}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="small">
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </td>
                  <td className="text-end" onClick={(e) => e.stopPropagation()}>
                    <div className="btn-group btn-group-sm">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        title="View details"
                        onClick={() => openDetail(order)}
                      >
                        <i className="bi bi-eye" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        title="Print delivery slip"
                        onClick={() => printDeliverySlip(order)}
                      >
                        <i className="bi bi-printer" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
