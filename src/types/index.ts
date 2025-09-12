// Re-export all types from API (keep as main source)
export * from './api';

// Re-export additional types (avoiding conflicts)
export * from './MenuItem';
export * from './Category';

// For Order, User, Restaurant - use the enhanced versions from separate files
// Export with different names to avoid conflicts
export type { Order as OrderEnhanced, OrderItem as OrderItemEnhanced } from './Order';
export type { User as UserEnhanced, UserProfile, UserStats, UserPreferences, Address } from './User';
export type { Restaurant as RestaurantEnhanced, RestaurantDetail as RestaurantDetailEnhanced, OpeningHours, DaySchedule, RestaurantStats } from './Restaurant';

// Common utility types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  search?: string;
}

export interface BaseFilters extends PaginationParams, SortParams, SearchParams {}

// API Response helpers
export type AsyncState<T = null> = {
  data: T;
  isLoading: boolean;
  error: string | null;
};

export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

// Form types
export interface FormField<T = string> {
  value: T;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

export interface FormState<T extends Record<string, unknown>> {
  fields: {
    [K in keyof T]: FormField<T[K]>;
  };
  isValid: boolean;
  isSubmitting: boolean;
  submitError?: string;
}
