import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

import PageTitle from "~/components/PageTitle";
import { useAuth } from "~/context/AuthContext";
import { buildAuthRedirectUrl, normalizeRedirect } from "~/utils/navigation";

import cartCss from "~/styles/cart.css?url";

export const links = () => [{ rel: "stylesheet", href: cartCss }];

export default function LoginPage() {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = normalizeRedirect(searchParams.get("redirect"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect, { replace: true });
    }
  }, [authLoading, isAuthenticated, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (!authLoading && isAuthenticated) {
    return (
      <main className="main">
        <section className="section">
          <div className="container text-center py-5">
            <div className="spinner-border text-success" role="status" />
            <p className="text-muted mt-3 mb-0">Continuing…</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="main">
      <PageTitle
        title="Login"
        description="Sign in to place your Cash on Delivery order"
        current="Login"
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="auth-card">
                <h2 className="h4 mb-1">Welcome back</h2>
                <p className="text-muted small mb-4">
                  Login to checkout with Cash on Delivery
                </p>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
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
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Login & Continue"}
                  </button>
                </form>

                <p className="text-center small text-muted mt-4 mb-0">
                  New here?{" "}
                  <Link to={buildAuthRedirectUrl("/register", redirect)}>
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
