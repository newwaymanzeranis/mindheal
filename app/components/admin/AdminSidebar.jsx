import { Link, NavLink, useNavigate } from "react-router";

import { useAuth } from "~/context/AuthContext";

const navLinkClass = ({ isActive }) => (isActive ? "active" : "");

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <i className="bi bi-flower1 admin-sidebar-logo" aria-hidden />
        <div>
          Mind Heal
          <span>Admin Panel</span>
        </div>
      </div>
      <ul className="admin-nav">
        <li>
          <NavLink to="/admin" end className={navLinkClass}>
            <i className="bi bi-grid" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/posts" className={navLinkClass}>
            <i className="bi bi-journal-text" /> Blog Posts
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" className={navLinkClass}>
            <i className="bi bi-box-seam" /> Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/testimonials" className={navLinkClass}>
            <i className="bi bi-chat-quote" /> Testimonials
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" className={navLinkClass}>
            <i className="bi bi-bag-check" /> Orders
          </NavLink>
        </li>
        <li>
          <Link to="/" target="_blank">
            <i className="bi bi-globe" /> View Website
          </Link>
        </li>
      </ul>
      <div className="admin-sidebar-footer">
        <small className="d-block mb-2 opacity-75">{user?.email}</small>
        <button type="button" className="btn btn-outline-light btn-sm w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
