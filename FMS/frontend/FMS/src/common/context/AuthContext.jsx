// src/common/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';
import authService from '../services/authService'; // you need to create this
import { useNotification } from '../components/NotificationProvider';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

/**
 * AuthProvider wraps the app and provides:
 * - user: the current user object or null
 * - isAuthenticated: boolean
 * - login(credentials): performs login, stores tokens, loads user
 * - logout(): clears tokens and user
 * - refresh(): attempts token refresh
 * - authLoading: boolean while initializing/loading user
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  // Load tokens from storage, set header, and fetch current user
  const initializeAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Attach token to apiClient
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
      try {
        const userData = await authService.fetchCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user on init:', err);
        // Try refresh if your backend supports it
        try {
          const refreshed = await attemptRefresh();
          if (!refreshed) {
            clearAuthData();
          }
        } catch (_) {
          clearAuthData();
        }
      }
    }
    setAuthLoading(false);
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Clear storage, headers, and state
  const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    delete apiClient.defaults.headers.common.Authorization;
    setUser(null);
  };

  // Attempt token refresh. Return true if succeeded.
  const attemptRefresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;
    try {
      const resp = await authService.refreshToken(refreshToken);
      // Expect resp = { token: "...", refreshToken?: "..." }
      const { token: newToken, refreshToken: newRefresh } = resp;
      localStorage.setItem('token', newToken);
      apiClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
      if (newRefresh) {
        localStorage.setItem('refreshToken', newRefresh);
      }
      // Fetch user after refresh
      const userData = await authService.fetchCurrentUser();
      setUser(userData);
      return true;
    } catch (err) {
      console.error('Refresh token failed:', err);
      return false;
    }
  };

  const login = async (credentials) => {
    try {
      const resp = await authService.login(credentials);
      // Expect resp = { token: "...", refreshToken: "...", user: { ... } }
      const { token, refreshToken, user: userData } = resp;

      // Store tokens
      localStorage.setItem('token', token);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      // Attach header
      // apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
      // Set user
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Login error:', err);
      // Rethrow so callers can handle (e.g., show notification)
      throw err;
    }
  };

  const register = async (user) => {
    try {
      const resp = await authService.register(user);
     
      const {  user: userData } = resp;
  
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Login error:', err);
      // Rethrow so callers can handle (e.g., show notification)
      throw err;
    }
  };
  const logout = () => {
    clearAuthData();
    // Optionally notify or redirect
    navigate('/login');
  };

  const isAuthenticated = Boolean(user);

  // Expose context value
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        authLoading,
        attemptRefresh,
        register
      }}
    >
      {/*
         Optionally, while authLoading is true, you can show a splash or loader.
         In components, you can read authLoading to delay rendering protected UI.
      */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
