import { useAppSelector } from '../store';

/**
 * Custom hook for managing review state
 * Provides all review-related state in one place
 */
export const useReviews = () => {
  const review = useAppSelector((state) => state.review);
  
  return {
    restaurantReviews: review.restaurantReviews,
    isRestaurantReviewsLoading: review.isRestaurantReviewsLoading,
    restaurantReviewsError: review.restaurantReviewsError,
    myReviews: review.myReviews,
    myReviewsPagination: review.myReviewsPagination,
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

/**
 * Hook for restaurant-specific reviews
 * @param restaurantId - The restaurant ID to fetch reviews for
 */
export const useRestaurantReviews = (restaurantId: number) => {
  const restaurantReviews = useAppSelector((state) => state.review.restaurantReviews[restaurantId]);
  const isLoading = useAppSelector((state) => state.review.isRestaurantReviewsLoading);
  const error = useAppSelector((state) => state.review.restaurantReviewsError);
  
  return {
    reviews: restaurantReviews || [],
    pagination: useAppSelector((state) => state.review.restaurantReviewsPagination[restaurantId]) || null,
    isLoading,
    error,
  };
};
