import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "~/context/AuthContext";
import { adminPath } from "~/config/site";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@mindheal.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user.role !== "ADMIN" && user.role !== "DOCTOR") {
        setError("Staff access only (Admin or Doctor)");
        return;
      }
      navigate(user.role === "DOCTOR" ? adminPath("appointments") : adminPath());
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Mind Heal Staff Login</h1>
        <p className="text-muted mb-4">Admin &amp; Doctor — manage appointments, blog, products</p>

        {error && <div className="alert alert-danger admin-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="small text-muted mt-3 mb-0 text-center">
          Default: admin@mindheal.com / admin123
        </p>
      </div>
    </div>
  );
}
