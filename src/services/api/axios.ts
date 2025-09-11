import axios from 'axios';

// Base URL dari backend - menggunakan environment variables
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');
const tokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY || 'auth_token';
const userDataKey = import.meta.env.VITE_USER_DATA_KEY || 'user_data';

// Create axios instance
const api = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
