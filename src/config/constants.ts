// Application constants
export const APP_CONSTANTS = {
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Cache times (in milliseconds)
  CACHE_TIME: {
    SHORT: 1000 * 60 * 5, // 5 minutes
    MEDIUM: 1000 * 60 * 30, // 30 minutes
    LONG: 1000 * 60 * 60, // 1 hour
  },
  
  // API timeouts
  TIMEOUT: {
    DEFAULT: 10000, // 10 seconds
    UPLOAD: 30000, // 30 seconds
    DOWNLOAD: 60000, // 1 minute
  },
  
  // Validation
  PASSWORD_MIN_LENGTH: 8,
  PHONE_REGEX: /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // File upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  
  // Currency
  DEFAULT_CURRENCY: 'IDR',
  CURRENCY_SYMBOL: 'Rp',
  
  // Order statuses
  ORDER_STATUS: {
    PREPARING: 'preparing',
    ON_THE_WAY: 'on_the_way',
    DELIVERED: 'delivered',
    DONE: 'done',
    CANCELLED: 'cancelled',
  } as const,
  
  // Payment methods
  PAYMENT_METHODS: {
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    CASH: 'cash',
    E_WALLET: 'e_wallet',
  } as const,
  
  // User roles
  USER_ROLES: {
    CUSTOMER: 'customer',
    ADMIN: 'admin',
    STAFF: 'staff',
  } as const,
  
  // Notification types
  NOTIFICATION_TYPES: {
    ORDER_CONFIRMED: 'order_confirmed',
    ORDER_PREPARING: 'order_preparing',
    ORDER_ON_THE_WAY: 'order_on_the_way',
    ORDER_DELIVERED: 'order_delivered',
    ORDER_CANCELLED: 'order_cancelled',
    PROMOTION: 'promotion',
    SYSTEM: 'system',
  } as const,
  
  // Price ranges
  PRICE_RANGES: [
    { label: '$', value: 'low', min: 0, max: 50000 },
    { label: '$$', value: 'medium', min: 50000, max: 150000 },
    { label: '$$$', value: 'high', min: 150000, max: 300000 },
    { label: '$$$$', value: 'premium', min: 300000, max: Number.MAX_VALUE },
  ],
  
  // Rating
  MIN_RATING: 1,
  MAX_RATING: 5,
  
  // Map settings
  DEFAULT_LOCATION: {
    lat: -6.2088,
    lng: 106.8456, // Jakarta coordinates
  },
  MAP_ZOOM: 15,
} as const;

// Status display labels
export const STATUS_LABELS = {
  [APP_CONSTANTS.ORDER_STATUS.PREPARING]: 'Sedang Diproses',
  [APP_CONSTANTS.ORDER_STATUS.ON_THE_WAY]: 'Dalam Perjalanan',
  [APP_CONSTANTS.ORDER_STATUS.DELIVERED]: 'Terkirim',
  [APP_CONSTANTS.ORDER_STATUS.DONE]: 'Selesai',
  [APP_CONSTANTS.ORDER_STATUS.CANCELLED]: 'Dibatalkan',
} as const;

export const PAYMENT_LABELS = {
  [APP_CONSTANTS.PAYMENT_METHODS.CREDIT_CARD]: 'Kartu Kredit',
  [APP_CONSTANTS.PAYMENT_METHODS.DEBIT_CARD]: 'Kartu Debit',
  [APP_CONSTANTS.PAYMENT_METHODS.CASH]: 'Tunai',
  [APP_CONSTANTS.PAYMENT_METHODS.E_WALLET]: 'E-Wallet',
} as const;
