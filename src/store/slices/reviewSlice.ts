import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api/axios';
import type { 
  Review, 
  CreateReviewRequest, 
  UpdateReviewRequest, 
  ReviewFilters, 
  RestaurantReviewsResponse, 
  MyReviewsResponse,
  PaginationMeta,
  ApiResponse 
} from '../../types/api';

// Helper function for error handling
const handleAsyncError = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return axiosError.response?.data?.message || 'Network error occurred';
  }
  return 'Network error occurred';
};

// Async thunks
export const createReview = createAsyncThunk(
  'review/createReview',
  async (reviewData: CreateReviewRequest, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse<{ review: Review }>>('/api/review', reviewData);
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data.review;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const fetchRestaurantReviews = createAsyncThunk(
  'review/fetchRestaurantReviews',
  async ({ restaurantId, filters = {} }: { restaurantId: number; filters?: ReviewFilters }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.rating) queryParams.append('rating', filters.rating.toString());
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());

      const response = await api.get<ApiResponse<RestaurantReviewsResponse>>(`/api/review/restaurant/${restaurantId}?${queryParams.toString()}`);
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return { restaurantId, ...data.data };
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const fetchMyReviews = createAsyncThunk(
  'review/fetchMyReviews',
  async (filters: ReviewFilters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.rating) queryParams.append('rating', filters.rating.toString());
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());

      const response = await api.get<ApiResponse<MyReviewsResponse>>(`/api/review/my-review?${queryParams.toString()}`);
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const updateReview = createAsyncThunk(
  'review/updateReview',
  async ({ reviewId, reviewData }: { reviewId: number; reviewData: UpdateReviewRequest }, { rejectWithValue }) => {
    try {
      const response = await api.put<ApiResponse<Review>>(`/api/review/${reviewId}`, reviewData);
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const deleteReview = createAsyncThunk(
  'review/deleteReview',
  async (reviewId: number, { rejectWithValue }) => {
    try {
      const response = await api.delete<ApiResponse<{ message: string }>>(`/api/review/${reviewId}`);
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return reviewId;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

interface ReviewState {
  // Restaurant reviews
  restaurantReviews: Record<number, Review[]>;
  restaurantReviewsPagination: Record<number, PaginationMeta | null>;
  isRestaurantReviewsLoading: boolean;
  restaurantReviewsError: string | null;
  
  // My reviews  
  myReviews: Review[];
  myReviewsPagination: PaginationMeta | null;
  isMyReviewsLoading: boolean;
  myReviewsError: string | null;
  
  // Create review
  isCreatingReview: boolean;
  createReviewError: string | null;
  lastCreatedReview: Review | null;
  
  // Update review
  isUpdatingReview: boolean;
  updateReviewError: string | null;
  
  // Delete review
  isDeletingReview: boolean;
  deleteReviewError: string | null;
  
  // Filters
  currentFilters: ReviewFilters;
}

const initialState: ReviewState = {
  restaurantReviews: {},
  restaurantReviewsPagination: {},
  isRestaurantReviewsLoading: false,
  restaurantReviewsError: null,
  
  myReviews: [],
  myReviewsPagination: null,
  isMyReviewsLoading: false,
  myReviewsError: null,
  
  isCreatingReview: false,
  createReviewError: null,
  lastCreatedReview: null,
  
  isUpdatingReview: false,
  updateReviewError: null,
  
  isDeletingReview: false,
  deleteReviewError: null,
  
  currentFilters: {},
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.restaurantReviewsError = null;
      state.myReviewsError = null;
      state.createReviewError = null;
      state.updateReviewError = null;
      state.deleteReviewError = null;
    },
    setFilters: (state, action) => {
      state.currentFilters = action.payload;
    },
    clearLastCreatedReview: (state) => {
      state.lastCreatedReview = null;
    },
    clearRestaurantReviews: (state, action) => {
      const restaurantId = action.payload;
      delete state.restaurantReviews[restaurantId];
      delete state.restaurantReviewsPagination[restaurantId];
    },
  },
  extraReducers: (builder) => {
    // Create review cases
    builder
      .addCase(createReview.pending, (state) => {
        state.isCreatingReview = true;
        state.createReviewError = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isCreatingReview = false;
        state.lastCreatedReview = action.payload;
        state.createReviewError = null;
        
        // Add to my reviews if they're loaded
        if (state.myReviews.length > 0) {
          state.myReviews.unshift(action.payload);
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isCreatingReview = false;
        state.createReviewError = action.payload as string;
      })
      
      // Fetch restaurant reviews cases
      .addCase(fetchRestaurantReviews.pending, (state) => {
        state.isRestaurantReviewsLoading = true;
        state.restaurantReviewsError = null;
      })
      .addCase(fetchRestaurantReviews.fulfilled, (state, action) => {
        state.isRestaurantReviewsLoading = false;
        const { restaurantId, reviews, pagination } = action.payload;
        state.restaurantReviews[restaurantId] = reviews;
        state.restaurantReviewsPagination[restaurantId] = pagination;
        state.restaurantReviewsError = null;
      })
      .addCase(fetchRestaurantReviews.rejected, (state, action) => {
        state.isRestaurantReviewsLoading = false;
        state.restaurantReviewsError = action.payload as string;
      })
      
      // Fetch my reviews cases
      .addCase(fetchMyReviews.pending, (state) => {
        state.isMyReviewsLoading = true;
        state.myReviewsError = null;
      })
      .addCase(fetchMyReviews.fulfilled, (state, action) => {
        state.isMyReviewsLoading = false;
        state.myReviews = action.payload.reviews;
        state.myReviewsPagination = action.payload.pagination;
        state.myReviewsError = null;
      })
      .addCase(fetchMyReviews.rejected, (state, action) => {
        state.isMyReviewsLoading = false;
        state.myReviewsError = action.payload as string;
      })
      
      // Update review cases
      .addCase(updateReview.pending, (state) => {
        state.isUpdatingReview = true;
        state.updateReviewError = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isUpdatingReview = false;
        
        // Update in my reviews
        const myReviewIndex = state.myReviews.findIndex(review => review.id === action.payload.id);
        if (myReviewIndex >= 0) {
          state.myReviews[myReviewIndex] = action.payload;
        }
        
        // Update in restaurant reviews
        Object.keys(state.restaurantReviews).forEach(restaurantIdKey => {
          const restaurantIdNum = parseInt(restaurantIdKey);
          const restaurantReviewIndex = state.restaurantReviews[restaurantIdNum].findIndex(review => review.id === action.payload.id);
          if (restaurantReviewIndex >= 0) {
            state.restaurantReviews[restaurantIdNum][restaurantReviewIndex] = action.payload;
          }
        });
        
        state.updateReviewError = null;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isUpdatingReview = false;
        state.updateReviewError = action.payload as string;
      })
      
      // Delete review cases
      .addCase(deleteReview.pending, (state) => {
        state.isDeletingReview = true;
        state.deleteReviewError = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isDeletingReview = false;
        const reviewId = action.payload;
        
        // Remove from my reviews
        state.myReviews = state.myReviews.filter(review => review.id !== reviewId);
        
        // Remove from restaurant reviews
        Object.keys(state.restaurantReviews).forEach(restaurantIdKey => {
          const restaurantIdNum = parseInt(restaurantIdKey);
          state.restaurantReviews[restaurantIdNum] = state.restaurantReviews[restaurantIdNum].filter(review => review.id !== reviewId);
        });
        
        state.deleteReviewError = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isDeletingReview = false;
        state.deleteReviewError = action.payload as string;
      });
  },
});

export const { clearErrors, setFilters, clearLastCreatedReview, clearRestaurantReviews } = reviewSlice.actions;
export default reviewSlice.reducer;

// Selectors
export const selectReviewState = (state: { review: ReviewState }) => state.review;
export const selectRestaurantReviews = (restaurantId: number) => (state: { review: ReviewState }) => state.review.restaurantReviews[restaurantId] || [];
export const selectRestaurantReviewsPagination = (restaurantId: number) => (state: { review: ReviewState }) => state.review.restaurantReviewsPagination[restaurantId];
export const selectIsRestaurantReviewsLoading = (state: { review: ReviewState }) => state.review.isRestaurantReviewsLoading;
export const selectMyReviews = (state: { review: ReviewState }) => state.review.myReviews;
export const selectMyReviewsPagination = (state: { review: ReviewState }) => state.review.myReviewsPagination;
export const selectIsMyReviewsLoading = (state: { review: ReviewState }) => state.review.isMyReviewsLoading;
export const selectIsCreatingReview = (state: { review: ReviewState }) => state.review.isCreatingReview;
export const selectLastCreatedReview = (state: { review: ReviewState }) => state.review.lastCreatedReview;
export const selectCurrentFilters = (state: { review: ReviewState }) => state.review.currentFilters;
