import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RestaurantFilters } from '../../types/api';

// UI State untuk Restaurant (bukan server data)
interface RestaurantUIState {
  // Search & Filters (Client State)
  searchQuery: string;
  filters: RestaurantFilters;
  sortBy: 'name' | 'rating' | 'priceRange' | 'distance';
  sortOrder: 'asc' | 'desc';
  
  // Modal & View States
  isFilterModalOpen: boolean;
  isMapViewActive: boolean;
  viewMode: 'grid' | 'list';
  
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  
  // UI Preferences
  showFavoritesOnly: boolean;
  compactView: boolean;
}

const initialState: RestaurantUIState = {
  searchQuery: '',
  filters: {
    location: '',
    priceMin: undefined,
    priceMax: undefined,
    rating: undefined,
    page: 1,
    limit: 10,
  },
  sortBy: 'rating',
  sortOrder: 'desc',
  isFilterModalOpen: false,
  isMapViewActive: false,
  viewMode: 'grid',
  currentPage: 1,
  itemsPerPage: 10,
  showFavoritesOnly: false,
  compactView: false,
};

const restaurantUISlice = createSlice({
  name: 'restaurantUI',
  initialState,
  reducers: {
    // Search Actions
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset ke halaman 1 saat search
    },
    clearSearch: (state) => {
      state.searchQuery = '';
      state.currentPage = 1;
    },

    // Filter Actions
    setFilters: (state, action: PayloadAction<Partial<RestaurantFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset ke halaman 1 saat filter
    },
    clearFilters: (state) => {
      state.filters = {
        location: '',
        priceMin: undefined,
        priceMax: undefined,
        rating: undefined,
        page: 1,
        limit: state.filters.limit,
      };
      state.currentPage = 1;
    },

    // Sort Actions
    setSortBy: (state, action: PayloadAction<RestaurantUIState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<RestaurantUIState['sortOrder']>) => {
      state.sortOrder = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },

    // Modal Actions
    toggleFilterModal: (state) => {
      state.isFilterModalOpen = !state.isFilterModalOpen;
    },
    closeFilterModal: (state) => {
      state.isFilterModalOpen = false;
    },

    // View Actions
    toggleMapView: (state) => {
      state.isMapViewActive = !state.isMapViewActive;
    },
    setViewMode: (state, action: PayloadAction<RestaurantUIState['viewMode']>) => {
      state.viewMode = action.payload;
    },

    // Pagination Actions
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset ke halaman 1 saat ubah items per page
    },

    // Preference Actions
    toggleFavoritesOnly: (state) => {
      state.showFavoritesOnly = !state.showFavoritesOnly;
      state.currentPage = 1;
    },
    toggleCompactView: (state) => {
      state.compactView = !state.compactView;
    },

    // Reset All UI State
    resetUIState: () => initialState,
  },
});

export const {
  setSearchQuery,
  clearSearch,
  setFilters,
  clearFilters,
  setSortBy,
  setSortOrder,
  toggleSortOrder,
  toggleFilterModal,
  closeFilterModal,
  toggleMapView,
  setViewMode,
  setCurrentPage,
  setItemsPerPage,
  toggleFavoritesOnly,
  toggleCompactView,
  resetUIState,
} = restaurantUISlice.actions;

export default restaurantUISlice.reducer;

// Selectors
export const selectRestaurantUI = (state: { restaurantUI: RestaurantUIState }) => state.restaurantUI;
export const selectSearchQuery = (state: { restaurantUI: RestaurantUIState }) => state.restaurantUI.searchQuery;
export const selectFilters = (state: { restaurantUI: RestaurantUIState }) => state.restaurantUI.filters;
export const selectSorting = (state: { restaurantUI: RestaurantUIState }) => ({
  sortBy: state.restaurantUI.sortBy,
  sortOrder: state.restaurantUI.sortOrder,
});
export const selectPagination = (state: { restaurantUI: RestaurantUIState }) => ({
  currentPage: state.restaurantUI.currentPage,
  itemsPerPage: state.restaurantUI.itemsPerPage,
});
export const selectViewPreferences = (state: { restaurantUI: RestaurantUIState }) => ({
  viewMode: state.restaurantUI.viewMode,
  isMapViewActive: state.restaurantUI.isMapViewActive,
  showFavoritesOnly: state.restaurantUI.showFavoritesOnly,
  compactView: state.restaurantUI.compactView,
});
