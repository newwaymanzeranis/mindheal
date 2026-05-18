import { formatPrice, productMindHealLabel } from "~/utils/format";
import { printDeliverySlip } from "~/utils/printDeliverySlip";

const STATUS_LABELS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div
      className="admin-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      onClick={onClose}
    >
      <div
        className="admin-modal admin-modal--order"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <div>
            <h2 id="order-modal-title" className="admin-modal-title">
              {order.orderNumber}
            </h2>
            <p className="text-muted small mb-0">
              {new Date(order.createdAt).toLocaleString("en-IN")} ·{" "}
              <span className="admin-badge success">
                {STATUS_LABELS[order.status] || order.status}
              </span>{" "}
              · COD
            </p>
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          />
        </div>

        <div className="admin-modal-body">
          <div className="row g-3">
            <div className="col-md-6">
              <h3 className="admin-order-section-title">Customer</h3>
              <p className="mb-1">
                <strong>{order.user?.name || order.shippingName}</strong>
              </p>
              <p className="small text-muted mb-1">{order.user?.email}</p>
              {order.user?.phone && (
                <p className="small mb-0">Account: {order.user.phone}</p>
              )}
            </div>
            <div className="col-md-6">
              <h3 className="admin-order-section-title">Delivery address</h3>
              <p className="mb-1">
                <strong>{order.shippingName}</strong>
              </p>
              <p className="small mb-1">Tel: {order.phone}</p>
              <p className="small mb-0">
                {order.shippingAddress}
                <br />
                {order.city}
                {order.state ? `, ${order.state}` : ""} — {order.pincode}
              </p>
            </div>
          </div>

          {order.notes && (
            <div className="alert alert-light border mt-3 mb-0 small">
              <strong>Order note:</strong> {order.notes}
            </div>
          )}

          <h3 className="admin-order-section-title mt-4">Products ordered</h3>
          <div className="table-responsive">
            <table className="table table-sm admin-table mb-0">
              <thead>
                <tr>
                  <th>MH No.</th>
                  <th>Product</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Line total</th>
                </tr>
              </thead>
              <tbody>
                {(order.items || []).map((item) => (
                  <tr key={item.id}>
                    <td>{productMindHealLabel(item.mindHealNo)}</td>
                    <td>{item.name}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">
                      {formatPrice(Number(item.unitPrice))}
                    </td>
                    <td className="text-end">
                      <strong>
                        {formatPrice(Number(item.unitPrice) * item.quantity)}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} className="text-end">
                    MRP total
                  </td>
                  <td className="text-end text-muted text-decoration-line-through">
                    {formatPrice(Number(order.totalMrp))}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-end text-success">
                    Savings
                  </td>
                  <td className="text-end text-success">
                    {formatPrice(Number(order.totalSavings))}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-end fw-bold">
                    COD amount
                  </td>
                  <td className="text-end fw-bold text-success fs-6">
                    {formatPrice(Number(order.subtotal))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="admin-modal-footer">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => printDeliverySlip(order)}
          >
            <i className="bi bi-printer me-1" />
            Print delivery slip
          </button>
        </div>
      </div>
    </div>
  );
}
