import { useAppSelector } from './index';

// Re-export all individual hooks from hooks folder
export * from '../hooks';

// Utility selectors that combine multiple states
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
  const restaurantUI = useAppSelector((state) => state.restaurantUI);
  
  // Note: Server state would be handled by React Query hooks like:
  // const { data, isLoading, error } = useRestaurants(restaurantUI.filters);
  
  return {
    // UI State (Redux)
    ...restaurantUI,
    
    // Helper methods
    getCurrentFilters: () => restaurantUI.filters,
    getSearchParams: () => ({
      query: restaurantUI.searchQuery,
      ...restaurantUI.filters,
      sortBy: restaurantUI.sortBy,
      sortOrder: restaurantUI.sortOrder,
      page: restaurantUI.currentPage,
      limit: restaurantUI.itemsPerPage,
    }),
  };
};
