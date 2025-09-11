/**
 * Redux Store Hooks
 * 
 * Provides typed selectors for Redux state (UI/Client state only).
 * 
 * NOTE: For server state (API data), use React Query hooks from:
 * - src/services/queries/restaurant.ts (useRestaurants, useRestaurantDetail, etc.)
 * - src/services/queries/menu.ts (useMenus, etc.)
 * - src/services/queries/order.ts (useOrders, etc.)
 * 
 * This file only contains hooks for UI state managed by Redux:
 * - Authentication state
 * - UI preferences (filters, sorting, modals)
 * - Cart state (client-side)
 * - Form states
 */

import { useAppSelector } from '../store';

// Auth selectors
export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  
  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    isRegisterLoading: auth.isRegisterLoading,
    registerError: auth.registerError,
    isProfileLoading: auth.isProfileLoading,
    profileError: auth.profileError,
    isPasswordChanging: auth.isPasswordChanging,
    passwordChangeError: auth.passwordChangeError,
  };
};

// Restaurant UI selectors (Client State only - Server state handled by React Query)
export const useRestaurantUI = () => {
  const restaurantUI = useAppSelector((state) => state.restaurantUI);
  
  return {
    searchQuery: restaurantUI.searchQuery,
    filters: restaurantUI.filters,
    sortBy: restaurantUI.sortBy,
    sortOrder: restaurantUI.sortOrder,
    isFilterModalOpen: restaurantUI.isFilterModalOpen,
    isMapViewActive: restaurantUI.isMapViewActive,
    viewMode: restaurantUI.viewMode,
    currentPage: restaurantUI.currentPage,
    itemsPerPage: restaurantUI.itemsPerPage,
    showFavoritesOnly: restaurantUI.showFavoritesOnly,
    compactView: restaurantUI.compactView,
  };
};

// Cart selectors
export const useCart = () => {
  const cart = useAppSelector((state) => state.cart);
  
  return {
    items: cart.items,
    summary: cart.summary,
    isLoading: cart.isLoading,
    error: cart.error,
    isAddingToCart: cart.isAddingToCart,
    addToCartError: cart.addToCartError,
    isUpdatingItem: cart.isUpdatingItem,
    updateItemError: cart.updateItemError,
    isRemovingItem: cart.isRemovingItem,
    removeItemError: cart.removeItemError,
    isClearingCart: cart.isClearingCart,
    clearCartError: cart.clearCartError,
    isEmpty: cart.items.length === 0,
    itemCount: cart.summary.totalItems,
    totalPrice: cart.summary.totalPrice,
  };
};

// Order selectors
export const useOrders = () => {
  const order = useAppSelector((state) => state.order);
  
  return {
    orders: order.orders,
    pagination: order.ordersPagination,
    isLoading: order.isOrdersLoading,
    error: order.ordersError,
    isCreatingOrder: order.isCreatingOrder,
    createOrderError: order.createOrderError,
    lastCreatedOrder: order.lastCreatedOrder,
    isUpdatingStatus: order.isUpdatingStatus,
    updateStatusError: order.updateStatusError,
    currentFilters: order.currentFilters,
  };
};

// Review selectors
export const useReviews = () => {
  const review = useAppSelector((state) => state.review);
  
  return {
    restaurantReviews: review.restaurantReviews,
    isRestaurantReviewsLoading: review.isRestaurantReviewsLoading,
    restaurantReviewsError: review.restaurantReviewsError,
    myReviews: review.myReviews,
    myReviewsPagination: review.myReviewsPagination,
    myReviewsSummary: review.myReviewsSummary,
    isMyReviewsLoading: review.isMyReviewsLoading,
    myReviewsError: review.myReviewsError,
    isCreatingReview: review.isCreatingReview,
    createReviewError: review.createReviewError,
    isUpdatingReview: review.isUpdatingReview,
    updateReviewError: review.updateReviewError,
    isDeletingReview: review.isDeletingReview,
    deleteReviewError: review.deleteReviewError,
  };
};

// Utility selectors
export const useLoadingStates = () => {
  const auth = useAppSelector((state) => state.auth);
  const cart = useAppSelector((state) => state.cart);
  const order = useAppSelector((state) => state.order);
  const review = useAppSelector((state) => state.review);
  
  return {
    isAnyLoading: 
      auth.isLoading ||
      auth.isRegisterLoading ||
      auth.isProfileLoading ||
      auth.isPasswordChanging ||
      cart.isLoading ||
      cart.isAddingToCart ||
      cart.isUpdatingItem ||
      cart.isRemovingItem ||
      cart.isClearingCart ||
      order.isOrdersLoading ||
      order.isCreatingOrder ||
      order.isUpdatingStatus ||
      review.isRestaurantReviewsLoading ||
      review.isMyReviewsLoading ||
      review.isCreatingReview ||
      review.isUpdatingReview ||
      review.isDeletingReview,
  };
};

// Get restaurant reviews by ID
export const useRestaurantReviews = (restaurantId: number) => {
  const restaurantReviews = useAppSelector((state) => state.review.restaurantReviews[restaurantId]);
  const isLoading = useAppSelector((state) => state.review.isRestaurantReviewsLoading);
  const error = useAppSelector((state) => state.review.restaurantReviewsError);
  
  return {
    reviews: restaurantReviews?.reviews || [],
    pagination: restaurantReviews?.pagination || null,
    summary: restaurantReviews?.summary || null,
    isLoading,
    error,
  };
};

// Combined hooks for better DX
/**
 * Combined Restaurant State Hook
 * 
 * Combines React Query (server state) with Redux (UI state) for restaurants.
 * This is a convenience hook that demonstrates how to use both together.
 * 
 * @example
 * const { 
 *   // Server state (React Query)
 *   restaurants, isLoading, error, 
 *   // UI state (Redux)
 *   filters, searchQuery, sortBy 
 * } = useCombinedRestaurantState();
 */
export const useCombinedRestaurantState = () => {
  // UI State from Redux
  const uiState = useRestaurantUI();
  
  // Note: Server state would be handled by React Query hooks like:
  // const { data, isLoading, error } = useRestaurants(uiState.filters);
  
  return {
    // UI State (Redux)
    ...uiState,
    
    // Helper methods
    getCurrentFilters: () => uiState.filters,
    getSearchParams: () => ({
      query: uiState.searchQuery,
      ...uiState.filters,
      sortBy: uiState.sortBy,
      sortOrder: uiState.sortOrder,
      page: uiState.currentPage,
      limit: uiState.itemsPerPage,
    }),
  };
};
