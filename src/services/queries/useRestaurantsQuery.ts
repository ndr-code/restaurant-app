import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import type { Restaurant, RestaurantFilters, PaginatedResponse, ApiResponse } from '../../types/api';

export const useRestaurantsQuery = (filters: RestaurantFilters = {}) => {
  return useQuery({
    queryKey: ['restaurants', filters],
    queryFn: async (): Promise<PaginatedResponse<Restaurant>> => {
      const params = new URLSearchParams();
      
      // Add filters to query parameters
      if (filters.location) params.append('location', filters.location);
      if (filters.priceMin) params.append('priceMin', filters.priceMin.toString());
      if (filters.priceMax) params.append('priceMax', filters.priceMax.toString());
      if (filters.rating) params.append('rating', filters.rating.toString());
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());

      const response = await axios.get<ApiResponse<PaginatedResponse<Restaurant>>>(
        `/restaurants?${params.toString()}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useRestaurantQuery = (restaurantId: number) => {
  return useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: async (): Promise<Restaurant> => {
      const response = await axios.get<ApiResponse<Restaurant>>(
        `/restaurants/${restaurantId}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    enabled: !!restaurantId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};
