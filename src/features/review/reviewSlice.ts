import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

// Async thunks
export const createReview = createAsyncThunk(
  'review/createReview',
  async (reviewData: CreateReviewRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      const data: ApiResponse<{ review: Review }> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data.review;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchRestaurantReviews = createAsyncThunk(
  'review/fetchRestaurantReviews',
  async ({ restaurantId, filters = {} }: { restaurantId: number; filters?: ReviewFilters }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const queryParams = new URLSearchParams();
      
      if (filters.rating) queryParams.append('rating', filters.rating.toString());
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());

      const response = await fetch(`/api/review/restaurant/${restaurantId}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data: ApiResponse<RestaurantReviewsResponse> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return { restaurantId, ...data.data };
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchMyReviews = createAsyncThunk(
  'review/fetchMyReviews',
  async (filters: ReviewFilters = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const queryParams = new URLSearchParams();
      
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());

      const response = await fetch(`/api/review/my-reviews?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data: ApiResponse<MyReviewsResponse> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const updateReview = createAsyncThunk(
  'review/updateReview',
  async ({ reviewId, reviewData }: { reviewId: number; reviewData: UpdateReviewRequest }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`/api/review/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      const data: ApiResponse<{ review: Review }> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data.review;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const deleteReview = createAsyncThunk(
  'review/deleteReview',
  async (reviewId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`/api/review/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data: ApiResponse<{ message: string }> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return reviewId;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

interface ReviewState {
  // Restaurant reviews
  restaurantReviews: Record<number, RestaurantReviewsResponse>;
  isRestaurantReviewsLoading: boolean;
  restaurantReviewsError: string | null;
  
  // My reviews
  myReviews: Review[];
  myReviewsPagination: PaginationMeta | null;
  myReviewsSummary: { totalReviews: number; averageRating: number } | null;
  isMyReviewsLoading: boolean;
  myReviewsError: string | null;
  
  // Create review
  isCreatingReview: boolean;
  createReviewError: string | null;
  
  // Update review
  isUpdatingReview: boolean;
  updateReviewError: string | null;
  
  // Delete review
  isDeletingReview: boolean;
  deleteReviewError: string | null;
}

const initialState: ReviewState = {
  restaurantReviews: {},
  isRestaurantReviewsLoading: false,
  restaurantReviewsError: null,
  
  myReviews: [],
  myReviewsPagination: null,
  myReviewsSummary: null,
  isMyReviewsLoading: false,
  myReviewsError: null,
  
  isCreatingReview: false,
  createReviewError: null,
  
  isUpdatingReview: false,
  updateReviewError: null,
  
  isDeletingReview: false,
  deleteReviewError: null,
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
    clearRestaurantReviews: (state, action) => {
      const restaurantId = action.payload;
      delete state.restaurantReviews[restaurantId];
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
        // Add the new review to my reviews if it exists
        if (state.myReviews.length > 0) {
          state.myReviews.unshift(action.payload);
        }
        state.createReviewError = null;
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
        const { restaurantId, ...reviewData } = action.payload;
        state.restaurantReviews[restaurantId] = reviewData;
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
        state.myReviewsSummary = action.payload.summary;
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
        // Update the review in my reviews
        const reviewIndex = state.myReviews.findIndex(review => review.id === action.payload.id);
        if (reviewIndex >= 0) {
          state.myReviews[reviewIndex] = action.payload;
        }
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
        // Remove the review from my reviews
        state.myReviews = state.myReviews.filter(review => review.id !== action.payload);
        state.deleteReviewError = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isDeletingReview = false;
        state.deleteReviewError = action.payload as string;
      });
  },
});

export const { clearErrors, clearRestaurantReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
