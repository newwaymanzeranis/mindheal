export const STATUS_LABELS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

/** Admin dashboard labels */
export const ADMIN_STATUS_LABELS = {
  PENDING: "New Orders",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export function orderStatusBadgeClass(status) {
  switch (status) {
    case "DELIVERED":
      return "order-status-badge order-status-badge--delivered";
    case "CANCELLED":
      return "order-status-badge order-status-badge--cancelled";
    case "SHIPPED":
      return "order-status-badge order-status-badge--shipped";
    case "CONFIRMED":
      return "order-status-badge order-status-badge--confirmed";
    case "PENDING":
    default:
      return "order-status-badge order-status-badge--pending";
  }
}
