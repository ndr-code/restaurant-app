import { useAppSelector } from '../store';

/**
 * Custom hook for managing restaurant UI state
 * Provides restaurant UI state selectors
 */
export const useRestaurantUI = () => {
  const restaurantUI = useAppSelector((state) => state.restaurantUI);
  
  return {
    // Search & Filters
    searchQuery: restaurantUI.searchQuery,
    filters: restaurantUI.filters,
    sortBy: restaurantUI.sortBy,
    sortOrder: restaurantUI.sortOrder,
    
    // Modal & View States
    isFilterModalOpen: restaurantUI.isFilterModalOpen,
    isMapViewActive: restaurantUI.isMapViewActive,
    viewMode: restaurantUI.viewMode,
    
    // Pagination
    currentPage: restaurantUI.currentPage,
    itemsPerPage: restaurantUI.itemsPerPage,
    
    // UI Preferences
    showFavoritesOnly: restaurantUI.showFavoritesOnly,
    compactView: restaurantUI.compactView,
  };
};
