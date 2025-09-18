import axios from 'axios';
import { env, API_CONFIG } from '../../config';

// Create axios instance
const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: env.API_TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Token and user data keys
const tokenKey = 'jwt_token';
const userDataKey = 'user_data';

// Request interceptor untuk menambahkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk handle error dan token expiry
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(userDataKey);
      // Redirect to login page or trigger logout action
      if (typeof window !== 'undefined') {
        window.location.href = '/auth';
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
      // Return a custom error for network issues
      return Promise.reject({
        ...error,
        message: 'Network connection failed. Please check your internet connection.',
        isNetworkError: true
      });
    }

    // Handle API server errors
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.status);
      return Promise.reject({
        ...error,
        message: 'Server is temporarily unavailable. Please try again later.',
        isServerError: true
      });
    }

    return Promise.reject(error);
  }
);

export default api;
