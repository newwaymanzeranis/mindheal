import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "~/context/AuthContext";
import { ordersApi, postsApi, productsApi, testimonialsApi } from "~/lib/api";
import { adminPath } from "~/config/site";
import { formatPrice } from "~/utils/format";
import {
  ADMIN_STATUS_LABELS,
  orderStatusBadgeClass,
} from "~/utils/orderStatus";

const ORDER_STAT_CARDS = [
  {
    status: "PENDING",
    label: ADMIN_STATUS_LABELS.PENDING,
    hint: "Awaiting confirmation",
    icon: "bi-bag-plus",
    accent: "stat-accent-pending",
  },
  {
    status: "CONFIRMED",
    label: ADMIN_STATUS_LABELS.CONFIRMED,
    hint: "Processing & packing",
    icon: "bi-check2-circle",
    accent: "stat-accent-confirmed",
  },
  {
    status: "SHIPPED",
    label: ADMIN_STATUS_LABELS.SHIPPED,
    hint: "Out for delivery",
    icon: "bi-truck",
    accent: "stat-accent-shipped",
  },
  {
    status: "DELIVERED",
    label: ADMIN_STATUS_LABELS.DELIVERED,
    hint: "Completed",
    icon: "bi-patch-check",
    accent: "stat-accent-delivered",
  },
  {
    status: "CANCELLED",
    label: ADMIN_STATUS_LABELS.CANCELLED,
    hint: "Cancelled orders",
    icon: "bi-x-circle",
    accent: "stat-accent-cancelled",
  },
];

const CONTENT_STAT_CARDS = [
  {
    key: "posts",
    label: "Blog Posts",
    icon: "bi-journal-richtext",
    accent: "stat-accent-green",
    href: adminPath("posts"),
    action: "Manage posts",
  },
  {
    key: "products",
    label: "Products",
    icon: "bi-box-seam",
    accent: "stat-accent-teal",
    href: adminPath("products"),
    action: "Manage products",
  },
  {
    key: "testimonials",
    label: "Testimonials",
    icon: "bi-chat-heart",
    accent: "stat-accent-amber",
    href: adminPath("testimonials"),
    action: "Manage reviews",
  },
];

const QUICK_ACTIONS = [
  {
    title: "All Orders",
    description: "View and update COD order status",
    icon: "bi-receipt",
    to: adminPath("orders"),
    variant: "primary",
  },
  {
    title: "New Blog Post",
    description: "Publish articles and healing stories",
    icon: "bi-pencil-square",
    to: adminPath("posts/new"),
    variant: "primary",
  },
  {
    title: "New Product",
    description: "Add Bach Flower mixtures to the store",
    icon: "bi-plus-circle",
    to: adminPath("products/new"),
    variant: "outline",
  },
  {
    title: "View Website",
    description: "Open the public site in a new tab",
    icon: "bi-box-arrow-up-right",
    to: "/",
    external: true,
    variant: "outline",
  },
];

function StatSkeleton() {
  return (
    <div className="admin-stat-card admin-stat-card--loading">
      <div className="admin-stat-skeleton admin-stat-skeleton--icon" />
      <div className="admin-stat-skeleton admin-stat-skeleton--line" />
      <div className="admin-stat-skeleton admin-stat-skeleton--line short" />
    </div>
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [contentStats, setContentStats] = useState({
    posts: 0,
    products: 0,
    testimonials: 0,
  });
  const [orderStats, setOrderStats] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      postsApi.list("limit=1"),
      productsApi.list("limit=1"),
      testimonialsApi.list(),
    ])
      .then(([postsRes, productsRes, testimonials]) => {
        setContentStats({
          posts: postsRes.pagination?.total ?? postsRes.posts?.length ?? 0,
          products:
            productsRes.pagination?.total ?? productsRes.products?.length ?? 0,
          testimonials: testimonials.length ?? 0,
        });
      })
      .catch(() => {})
      .finally(() => setContentLoading(false));
  }, []);

  useEffect(() => {
    ordersApi
      .dashboardStats()
      .then(setOrderStats)
      .catch(() => setOrderStats(null))
      .finally(() => setOrdersLoading(false));
  }, []);

  const displayName = user?.name || user?.email?.split("@")[0] || "Admin";
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const totalContent =
    contentStats.posts + contentStats.products + contentStats.testimonials;

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard-hero">
        <div className="admin-dashboard-hero-text">
          <p className="admin-dashboard-eyebrow">{today}</p>
          <h2 className="admin-dashboard-title">
            Welcome back, <span>{displayName}</span>
          </h2>
          <p className="admin-dashboard-subtitle">
            Track new COD orders, confirmations, and deliveries — plus manage
            your site content.
          </p>
        </div>
        <div className="admin-dashboard-hero-badge">
          <i className="bi bi-shield-check" />
          <div>
            <strong>Administrator</strong>
            <span>{user?.email}</span>
          </div>
        </div>
      </header>

      <section className="admin-dashboard-section">
        <div className="admin-section-head">
          <div>
            <h2 className="admin-section-title">Orders overview</h2>
            <p className="admin-section-desc">
              Status-wise counts for Cash on Delivery orders
            </p>
          </div>
          <Link to={adminPath("orders")} className="admin-section-link">
            All orders <i className="bi bi-arrow-right" />
          </Link>
        </div>

        {!ordersLoading && orderStats && (
          <div className="admin-order-summary-bar">
            <div className="admin-order-summary-item">
              <span>In pipeline</span>
              <strong>{orderStats.inPipeline}</strong>
              <small>New + confirmed + shipped</small>
            </div>
            <div className="admin-order-summary-item">
              <span>New today</span>
              <strong>{orderStats.newToday}</strong>
              <small>Pending orders placed today</small>
            </div>
            <div className="admin-order-summary-item">
              <span>Active revenue</span>
              <strong>{formatPrice(orderStats.totals.revenue)}</strong>
              <small>Excludes cancelled</small>
            </div>
            <div className="admin-order-summary-item">
              <span>Total orders</span>
              <strong>{orderStats.totals.allOrders}</strong>
              <small>All statuses</small>
            </div>
          </div>
        )}

        <div
          className="admin-stats admin-stats--orders"
          aria-label="Order statistics"
        >
          {ordersLoading
            ? ORDER_STAT_CARDS.map((card) => (
                <StatSkeleton key={card.status} />
              ))
            : ORDER_STAT_CARDS.map((card) => {
                const data = orderStats?.byStatus?.[card.status] ?? {
                  count: 0,
                  amount: 0,
                };
                return (
                  <Link
                    key={card.status}
                    to={`${adminPath("orders")}?status=${card.status}`}
                    className={`admin-stat-card ${card.accent}`}
                  >
                    <div className="admin-stat-card-top">
                      <div className="admin-stat-icon">
                        <i className={`bi ${card.icon}`} />
                      </div>
                      <span className="admin-stat-trend">
                        <i className="bi bi-arrow-right" />
                      </span>
                    </div>
                    <p className="admin-stat-value">{data.count}</p>
                    <p className="admin-stat-label">{card.label}</p>
                    <p className="admin-stat-hint">{card.hint}</p>
                    {data.count > 0 && (
                      <span className="admin-stat-meta">
                        {formatPrice(data.amount)} COD
                      </span>
                    )}
                  </Link>
                );
              })}
        </div>
      </section>

      <section className="admin-dashboard-section">
        <div className="admin-section-head">
          <div>
            <h2 className="admin-section-title">Content</h2>
            <p className="admin-section-desc">Blog, products & testimonials</p>
          </div>
        </div>
        <div
          className="admin-stats admin-stats--content"
          aria-label="Content statistics"
        >
          {contentLoading
            ? CONTENT_STAT_CARDS.map((card) => <StatSkeleton key={card.key} />)
            : CONTENT_STAT_CARDS.map((card) => (
                <Link
                  key={card.key}
                  to={card.href}
                  className={`admin-stat-card ${card.accent}`}
                >
                  <div className="admin-stat-card-top">
                    <div className="admin-stat-icon">
                      <i className={`bi ${card.icon}`} />
                    </div>
                    <span className="admin-stat-trend">
                      <i className="bi bi-arrow-right" />
                    </span>
                  </div>
                  <p className="admin-stat-value">{contentStats[card.key]}</p>
                  <p className="admin-stat-label">{card.label}</p>
                  <span className="admin-stat-link">{card.action}</span>
                </Link>
              ))}
        </div>
      </section>

      <div className="admin-dashboard-grid">
        <section className="admin-card admin-card--flush">
          <div className="admin-card-header">
            <div>
              <h2>Quick Actions</h2>
              <p>Orders and content in a few clicks</p>
            </div>
          </div>
          <div className="admin-action-grid">
            {QUICK_ACTIONS.map((action) => {
              const className = `admin-action-card admin-action-card--${action.variant}`;
              const inner = (
                <>
                  <span className="admin-action-icon">
                    <i className={`bi ${action.icon}`} />
                  </span>
                  <span className="admin-action-body">
                    <strong>{action.title}</strong>
                    <small>{action.description}</small>
                  </span>
                  <i className="bi bi-chevron-right admin-action-chevron" />
                </>
              );

              return action.external ? (
                <a
                  key={action.title}
                  href={action.to}
                  target="_blank"
                  rel="noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              ) : (
                <Link key={action.title} to={action.to} className={className}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </section>

        <aside className="admin-card admin-summary-card">
          <h2>Recent orders</h2>
          {ordersLoading ? (
            <p className="text-muted small">Loading…</p>
          ) : !orderStats?.recentOrders?.length ? (
            <p className="text-muted small mb-0">No orders yet.</p>
          ) : (
            <ul className="admin-recent-orders">
              {orderStats.recentOrders.map((order) => (
                <li key={order.id}>
                  <Link to={adminPath("orders")} className="admin-recent-order-link">
                    <span className="admin-recent-order-no">
                      {order.orderNumber}
                    </span>
                    <span className="admin-recent-order-name">
                      {order.user?.name || order.shippingName || "Customer"}
                    </span>
                    <span className={orderStatusBadgeClass(order.status)}>
                      {ADMIN_STATUS_LABELS[order.status] || order.status}
                    </span>
                    <span className="admin-recent-order-amt">
                      {formatPrice(order.subtotal)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link to={adminPath("orders")} className="admin-summary-view-all">
            View all orders
          </Link>

          <h2 className="admin-summary-divider">Content</h2>
          <ul className="admin-summary-list">
            <li>
              <span>Total managed items</span>
              <strong>{contentLoading ? "—" : totalContent}</strong>
            </li>
            <li>
              <span>Blog posts</span>
              <strong>{contentLoading ? "—" : contentStats.posts}</strong>
            </li>
            <li>
              <span>Products</span>
              <strong>{contentLoading ? "—" : contentStats.products}</strong>
            </li>
            <li>
              <span>Testimonials</span>
              <strong>
                {contentLoading ? "—" : contentStats.testimonials}
              </strong>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
