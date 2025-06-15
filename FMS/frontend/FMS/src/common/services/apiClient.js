import axios from 'axios';
import { getToken, refreshToken, clearAuth } from '../utils/auth';
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // hardcoded host and port
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Optionally try refresh token logic
      try {
        await refreshToken();
        const config = error.config;
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return apiClient.request(config);
      } catch (e) {
        clearAuth();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
