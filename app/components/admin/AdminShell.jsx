import { Outlet, useLocation } from "react-router";

import AdminSidebar from "~/components/admin/AdminSidebar";
import { useAuth } from "~/context/AuthContext";

const PAGE_TITLES = {
  "/admin": "Dashboard",
  "/admin/posts": "Blog Posts",
  "/admin/posts/new": "New Post",
  "/admin/products": "Products",
  "/admin/products/new": "New Product",
  "/admin/testimonials": "Testimonials",
};

function getPageTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.includes("/posts/") && pathname.endsWith("/edit")) return "Edit Post";
  if (pathname.includes("/products/") && pathname.endsWith("/edit")) return "Edit Product";
  return "Admin";
}

export default function AdminShell({ children }) {
  const location = useLocation();
  const { user } = useAuth();
  const title = getPageTitle(location.pathname);
  const isDashboard = location.pathname === "/admin";

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            {!isDashboard && <h1 className="admin-topbar-title">{title}</h1>}
            {isDashboard && (
              <span className="admin-topbar-breadcrumb">
                <i className="bi bi-grid-1x2" /> Overview
              </span>
            )}
          </div>
          <div className="admin-topbar-right">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="admin-topbar-link"
            >
              <i className="bi bi-globe2" />
              <span>Live site</span>
            </a>
            <div className="admin-topbar-user">
              <span className="admin-topbar-avatar">
                {(user?.name || user?.email || "A").charAt(0).toUpperCase()}
              </span>
              <div className="admin-topbar-user-meta">
                <strong>{user?.name || "Administrator"}</strong>
                <small>{user?.email}</small>
              </div>
            </div>
          </div>
        </header>
        <div className="admin-content">{children ?? <Outlet />}</div>
      </div>
    </div>
  );
}
