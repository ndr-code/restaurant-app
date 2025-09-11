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

// Restaurant selectors
export const useRestaurants = () => {
  const restaurant = useAppSelector((state) => state.restaurant);
  
  return {
    restaurants: restaurant.restaurants,
    pagination: restaurant.restaurantsPagination,
    isLoading: restaurant.isRestaurantsLoading,
    error: restaurant.restaurantsError,
    recommendedRestaurants: restaurant.recommendedRestaurants,
    isRecommendedLoading: restaurant.isRecommendedLoading,
    recommendedError: restaurant.recommendedError,
    selectedRestaurant: restaurant.selectedRestaurant,
    isDetailLoading: restaurant.isDetailLoading,
    detailError: restaurant.detailError,
    currentFilters: restaurant.currentFilters,
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
  const restaurant = useAppSelector((state) => state.restaurant);
  const cart = useAppSelector((state) => state.cart);
  const order = useAppSelector((state) => state.order);
  const review = useAppSelector((state) => state.review);
  
  return {
    isAnyLoading: 
      auth.isLoading ||
      auth.isRegisterLoading ||
      auth.isProfileLoading ||
      auth.isPasswordChanging ||
      restaurant.isRestaurantsLoading ||
      restaurant.isRecommendedLoading ||
      restaurant.isDetailLoading ||
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
