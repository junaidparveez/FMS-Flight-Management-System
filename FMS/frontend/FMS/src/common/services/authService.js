// src/common/services/authService.js
import apiClient from './apiClient';

const authService = {
        login: async ({ userName, password }) => {
          // Use GET with params for @RequestParam on backend
          const response = await apiClient.get('auth/login', {
            params: { userName, password }
          });
          return response.data;
        },
        // ...
      
      

  refreshToken: async (refreshToken) => {
    // Adjust endpoint per backend
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    // Expect { token, refreshToken? }
    return response.data;
  },

  fetchCurrentUser: async () => {
    // Protected endpoint returning current user
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  logout: async () => {
    // If your backend needs to invalidate refresh token, call it here
    try {
      await apiClient.post('/auth/logout');
    } catch (err) {
      console.warn('Logout API call failed:', err);
    }
  },


  register: async (user)=>
  {
    const response= await apiClient.post('auth/register',{...user})
    return response.data;
  }
};

export default authService;
