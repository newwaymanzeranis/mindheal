import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import AdminShell from "~/components/admin/AdminShell";
import { AuthProvider, useAuth } from "~/context/AuthContext";

import adminCss from "~/styles/admin.css?url";

export const links = () => [
  { rel: "stylesheet", href: "/assets/vendor/bootstrap/css/bootstrap.min.css" },
  { rel: "stylesheet", href: "/assets/vendor/bootstrap-icons/bootstrap-icons.css" },
  { rel: "stylesheet", href: adminCss },
];

function AdminGuard() {
  const { user, loading, isStaff } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/admin/login";

  useEffect(() => {
    if (loading || isLogin) return;
    if (!user) {
      navigate("/admin/login", { replace: true });
      return;
    }
    if (!isStaff) {
      navigate("/admin/login", { replace: true });
      return;
    }
    if (
      user.role === "DOCTOR" &&
      !location.pathname.startsWith("/admin/appointments")
    ) {
      navigate("/admin/appointments", { replace: true });
    }
  }, [user, loading, isStaff, isLogin, navigate, location.pathname]);

  if (isLogin) {
    return (
      <div className="admin-root">
        <Outlet />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-root d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  if (!user || !isStaff) return null;

  return (
    <div className="admin-root">
      <AdminShell>
        <Outlet />
      </AdminShell>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <AuthProvider>
      <AdminGuard />
    </AuthProvider>
  );
}
