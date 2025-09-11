import { env } from './env';

// API configuration
export const API_CONFIG = {
  BASE_URL: env.API_BASE_URL,
  TIMEOUT: env.API_TIMEOUT,
  
  // API endpoints
  ENDPOINTS: {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    
    // Restaurants
    RESTAURANTS: '/restaurants',
    RESTAURANT_DETAIL: '/restaurants/:id',
    RESTAURANT_MENUS: '/restaurants/:id/menus',
    RESTAURANT_REVIEWS: '/restaurants/:id/reviews',
    
    // Menu
    MENUS: '/menus',
    MENU_DETAIL: '/menus/:id',
    MENU_CATEGORIES: '/categories',
    
    // Cart
    CART: '/cart',
    CART_ITEM: '/cart/:id',
    
    // Orders
    ORDERS: '/user/orders',
    ORDER_DETAIL: '/orders/:id',
    ORDER_CHECKOUT: '/order/checkout',
    ORDER_STATUS: '/orders/:id/status',
    
    // Reviews
    REVIEWS: '/reviews',
    REVIEW_DETAIL: '/reviews/:id',
    
    // Upload
    UPLOAD_IMAGE: '/upload/image',
    
    // Search
    SEARCH: '/search',
    SEARCH_RESTAURANTS: '/search/restaurants',
    SEARCH_MENUS: '/search/menus',
  },
  
  // Request headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // HTTP status codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },
} as const;

// Build endpoint URL with parameters
export const buildEndpoint = {
  restaurantDetail: (id: number | string) => API_CONFIG.ENDPOINTS.RESTAURANT_DETAIL.replace(':id', String(id)),
  restaurantMenus: (id: number | string) => API_CONFIG.ENDPOINTS.RESTAURANT_MENUS.replace(':id', String(id)),
  restaurantReviews: (id: number | string) => API_CONFIG.ENDPOINTS.RESTAURANT_REVIEWS.replace(':id', String(id)),
  menuDetail: (id: number | string) => API_CONFIG.ENDPOINTS.MENU_DETAIL.replace(':id', String(id)),
  cartItem: (id: number | string) => API_CONFIG.ENDPOINTS.CART_ITEM.replace(':id', String(id)),
  orderDetail: (id: number | string) => API_CONFIG.ENDPOINTS.ORDER_DETAIL.replace(':id', String(id)),
  orderStatus: (id: number | string) => API_CONFIG.ENDPOINTS.ORDER_STATUS.replace(':id', String(id)),
  reviewDetail: (id: number | string) => API_CONFIG.ENDPOINTS.REVIEW_DETAIL.replace(':id', String(id)),
} as const;
