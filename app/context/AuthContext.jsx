import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import {
  authApi,
  clearToken,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
} from "~/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await authApi.me();
      setUser(data.user);
      setStoredUser(data.user);
    } catch {
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);
    loadUser();
  }, [loadUser]);

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    setToken(data.token);
    setStoredUser(data.user);
    setUser(data.user);
    return data.user;
  };

  const register = async (body) => {
    const data = await authApi.register(body);
    setToken(data.token);
    setStoredUser(data.user);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      isAdmin: user?.role === "ADMIN",
      isDoctor: user?.role === "DOCTOR",
      isStaff: user?.role === "ADMIN" || user?.role === "DOCTOR",
      isAuthenticated: Boolean(user),
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
