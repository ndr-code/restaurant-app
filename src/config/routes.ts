// Route path definitions
export const ROUTES = {
  // Public routes
  HOME: '/',
  RESTAURANTS: '/restaurants',
  RESTAURANT_DETAIL: '/restaurants/:id',
  SEARCH: '/search',
  
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Protected routes
  PROFILE: '/profile',
  EDIT_PROFILE: '/profile/edit',
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  ORDER_TRACKING: '/orders/:id/tracking',
  
  // Cart & Checkout
  CART: '/cart',
  CHECKOUT: '/checkout',
  PAYMENT: '/payment',
  PAYMENT_SUCCESS: '/payment/success',
  PAYMENT_FAILED: '/payment/failed',
  
  // Restaurant specific
  MENU: '/restaurants/:restaurantId/menu',
  MENU_ITEM: '/restaurants/:restaurantId/menu/:itemId',
  REVIEWS: '/restaurants/:restaurantId/reviews',
  
  // Admin routes (future)
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_RESTAURANTS: '/admin/restaurants',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',
  
  // Other
  ABOUT: '/about',
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  HELP: '/help',
  NOT_FOUND: '/404',
} as const;

// Route builders with parameters
export const buildRoute = {
  restaurantDetail: (id: number | string) => `/restaurants/${id}`,
  orderDetail: (id: number | string) => `/orders/${id}`,
  orderTracking: (id: number | string) => `/orders/${id}/tracking`,
  restaurantMenu: (restaurantId: number | string) => `/restaurants/${restaurantId}/menu`,
  menuItem: (restaurantId: number | string, itemId: number | string) => 
    `/restaurants/${restaurantId}/menu/${itemId}`,
  restaurantReviews: (restaurantId: number | string) => `/restaurants/${restaurantId}/reviews`,
} as const;

// Route metadata for navigation
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: 'Home',
    description: 'Discover amazing restaurants',
    requiresAuth: false,
  },
  [ROUTES.RESTAURANTS]: {
    title: 'Restaurants',
    description: 'Browse all restaurants',
    requiresAuth: false,
  },
  [ROUTES.LOGIN]: {
    title: 'Login',
    description: 'Sign in to your account',
    requiresAuth: false,
    guestOnly: true,
  },
  [ROUTES.REGISTER]: {
    title: 'Register',
    description: 'Create a new account',
    requiresAuth: false,
    guestOnly: true,
  },
  [ROUTES.PROFILE]: {
    title: 'Profile',
    description: 'Manage your profile',
    requiresAuth: true,
  },
  [ROUTES.ORDERS]: {
    title: 'My Orders',
    description: 'View your order history',
    requiresAuth: true,
  },
  [ROUTES.CART]: {
    title: 'Cart',
    description: 'Review your order',
    requiresAuth: false,
  },
  [ROUTES.CHECKOUT]: {
    title: 'Checkout',
    description: 'Complete your order',
    requiresAuth: true,
  },
} as const;
