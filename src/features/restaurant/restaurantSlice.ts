import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api/axios';
import { API_CONFIG } from '../../config/api';
import type { 
  Restaurant, 
  RestaurantDetail, 
  RestaurantFilters,
  PaginationMeta,
  ApiResponse 
} from '../../types/api';

// Async thunks
export const fetchRestaurants = createAsyncThunk(
  'restaurant/fetchRestaurants',
  async (filters: RestaurantFilters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.priceMin) queryParams.append('priceMin', filters.priceMin.toString());
      if (filters.priceMax) queryParams.append('priceMax', filters.priceMax.toString());
      if (filters.rating) queryParams.append('rating', filters.rating.toString());
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());

      const response = await api.get(`${API_CONFIG.ENDPOINTS.RESTAURANTS}?${queryParams.toString()}`);
      const data: ApiResponse<{ restaurants: Restaurant[]; pagination: PaginationMeta }> = response.data;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Network error occurred';
      return rejectWithValue(message);
    }
  }
);

export const fetchRecommendedRestaurants = createAsyncThunk(
  'restaurant/fetchRecommendedRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/resto/recommended');
      const data: ApiResponse<{ restaurants: Restaurant[] }> = response.data;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data.restaurants;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Network error occurred';
      return rejectWithValue(message);
    }
  }
);

export const fetchRestaurantDetail = createAsyncThunk(
  'restaurant/fetchRestaurantDetail',
  async ({ id, limitMenu, limitReview }: { id: number; limitMenu?: number; limitReview?: number }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (limitMenu) queryParams.append('limitMenu', limitMenu.toString());
      if (limitReview) queryParams.append('limitReview', limitReview.toString());

      const response = await api.get(`/api/resto/${id}?${queryParams.toString()}`);
      const data: ApiResponse<{ restaurant: RestaurantDetail }> = response.data;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data.restaurant;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Network error occurred';
      return rejectWithValue(message);
    }
  }
);

interface RestaurantState {
  // All restaurants
  restaurants: Restaurant[];
  restaurantsPagination: PaginationMeta | null;
  isRestaurantsLoading: boolean;
  restaurantsError: string | null;
  
  // Recommended restaurants
  recommendedRestaurants: Restaurant[];
  isRecommendedLoading: boolean;
  recommendedError: string | null;
  
  // Restaurant detail
  selectedRestaurant: RestaurantDetail | null;
  isDetailLoading: boolean;
  detailError: string | null;
  
  // Filters
  currentFilters: RestaurantFilters;
}

const initialState: RestaurantState = {
  restaurants: [],
  restaurantsPagination: null,
  isRestaurantsLoading: false,
  restaurantsError: null,
  
  recommendedRestaurants: [],
  isRecommendedLoading: false,
  recommendedError: null,
  
  selectedRestaurant: null,
  isDetailLoading: false,
  detailError: null,
  
  currentFilters: {},
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.restaurantsError = null;
      state.recommendedError = null;
      state.detailError = null;
    },
    setFilters: (state, action) => {
      state.currentFilters = action.payload;
    },
    clearSelectedRestaurant: (state) => {
      state.selectedRestaurant = null;
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch restaurants cases
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.isRestaurantsLoading = true;
        state.restaurantsError = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.isRestaurantsLoading = false;
        state.restaurants = action.payload.restaurants;
        state.restaurantsPagination = action.payload.pagination;
        state.restaurantsError = null;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.isRestaurantsLoading = false;
        state.restaurantsError = action.payload as string;
      })
      
      // Fetch recommended restaurants cases
      .addCase(fetchRecommendedRestaurants.pending, (state) => {
        state.isRecommendedLoading = true;
        state.recommendedError = null;
      })
      .addCase(fetchRecommendedRestaurants.fulfilled, (state, action) => {
        state.isRecommendedLoading = false;
        state.recommendedRestaurants = action.payload;
        state.recommendedError = null;
      })
      .addCase(fetchRecommendedRestaurants.rejected, (state, action) => {
        state.isRecommendedLoading = false;
        state.recommendedError = action.payload as string;
      })
      
      // Fetch restaurant detail cases
      .addCase(fetchRestaurantDetail.pending, (state) => {
        state.isDetailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchRestaurantDetail.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.selectedRestaurant = action.payload;
        state.detailError = null;
      })
      .addCase(fetchRestaurantDetail.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.detailError = action.payload as string;
      });
  },
});

export const { clearErrors, setFilters, clearSelectedRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
