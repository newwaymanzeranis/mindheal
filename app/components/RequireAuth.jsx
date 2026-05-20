import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "~/context/AuthContext";
import { buildAuthRedirectUrl, normalizeRedirect } from "~/utils/navigation";

export default function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading || isAuthenticated) return;
    const returnTo = normalizeRedirect(
      `${location.pathname}${location.search}`
    );
    navigate(buildAuthRedirectUrl("/login", returnTo), { replace: true });
  }, [isAuthenticated, loading, location, navigate]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
        <p className="text-muted mt-3 mb-0">Redirecting to login…</p>
      </div>
    );
  }

  return children;
}
