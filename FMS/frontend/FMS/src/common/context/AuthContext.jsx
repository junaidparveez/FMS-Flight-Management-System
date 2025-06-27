import React, { createContext, useState, useContext, useEffect } from "react";
import apiClient from "../services/apiClient";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  const navigate = useNavigate();

  const clearAuthData = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    delete apiClient.defaults.headers.common.Authorization;
    navigate("/login");
  };

  const login = async (credentials) => {
    try {
      const resp = await authService.login(credentials);
      const { token, user: userData } = resp;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const register = async (user) => {
    try {
      const resp = await authService.register(user);

      const { user: userData } = resp;

      setUser(userData);
      return userData;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };
  const logout = () => {
    clearAuthData();
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
