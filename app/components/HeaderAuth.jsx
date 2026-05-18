import { Link } from "react-router";

import { useAuth } from "~/context/AuthContext";

export default function HeaderAuth() {
  const { user, isAuthenticated, loading, logout } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <li>
        <Link to="/login" className="header-auth-link">
          Login
        </Link>
      </li>
    );
  }

  return (
    <li className="header-auth-menu">
      <span className="header-auth-name" title={user.email}>
        {user.name || user.email}
      </span>
      <ul className="header-auth-dropdown">
        <li>
          <Link to="/account/orders">My Orders</Link>
        </li>
        <li>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </li>
  );
}
