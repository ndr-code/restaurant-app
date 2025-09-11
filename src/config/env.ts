// Environment variables with type safety and defaults
export const env = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Restaurant App',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  
  // Feature Flags
  ENABLE_NOTIFICATIONS: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_GEOLOCATION: import.meta.env.VITE_ENABLE_GEOLOCATION === 'true',
  ENABLE_PAYMENT_GATEWAY: import.meta.env.VITE_ENABLE_PAYMENT_GATEWAY === 'true',
  
  // Third-party Services
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID || '',
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || '',
  
  // Payment Configuration
  PAYMENT_GATEWAY_URL: import.meta.env.VITE_PAYMENT_GATEWAY_URL || '',
  PAYMENT_PUBLIC_KEY: import.meta.env.VITE_PAYMENT_PUBLIC_KEY || '',
  
  // Development
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',
  MOCK_API: import.meta.env.VITE_MOCK_API === 'true',
} as const;

// Environment validation
export const validateEnv = () => {
  const requiredVars = [
    'API_BASE_URL',
  ];
  
  const missingVars = requiredVars.filter(varName => !env[varName as keyof typeof env]);
  
  if (missingVars.length > 0) {
    console.warn('Missing environment variables:', missingVars);
  }
  
  return missingVars.length === 0;
};

// Environment info
export const isProduction = env.APP_ENV === 'production';
export const isDevelopment = env.APP_ENV === 'development';
export const isTest = env.APP_ENV === 'test';
