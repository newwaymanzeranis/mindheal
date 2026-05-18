import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "~/context/AuthContext";

export default function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading || isAuthenticated) return;
    const redirect = encodeURIComponent(
      `${location.pathname}${location.search}`
    );
    navigate(`/login?redirect=${redirect}`, { replace: true });
  }, [isAuthenticated, loading, location, navigate]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return children;
}
