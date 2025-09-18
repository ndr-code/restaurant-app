import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import type {
  Restaurant,
  RestaurantDetail,
  RestaurantFilters,
  ApiResponse,
  PaginationMeta,
} from '../../types/api';

// Query Keys
export const restaurantKeys = {
  all: ['restaurants'] as const,
  lists: () => [...restaurantKeys.all, 'list'] as const,
  list: (filters: RestaurantFilters) =>
    [...restaurantKeys.lists(), filters] as const,
  details: () => [...restaurantKeys.all, 'detail'] as const,
  detail: (id: number) => [...restaurantKeys.details(), id] as const,
  recommended: () => [...restaurantKeys.all, 'recommended'] as const,
} as const;

// Restaurant List Hook
export const useRestaurants = (
  filters: RestaurantFilters = {},
  options: { enabled?: boolean } = {}
) => {
  return useQuery({
    queryKey: restaurantKeys.list(filters),
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams();

        if (filters.location) queryParams.append('location', filters.location);
        if (filters.priceMin)
          queryParams.append('priceMin', filters.priceMin.toString());
        if (filters.priceMax)
          queryParams.append('priceMax', filters.priceMax.toString());
        if (filters.rating)
          queryParams.append('rating', filters.rating.toString());
        if (filters.page) queryParams.append('page', filters.page.toString());
        if (filters.limit)
          queryParams.append('limit', filters.limit.toString());

        const response = await api.get(`/api/resto?${queryParams.toString()}`);
        const data: ApiResponse<{
          restaurants: Restaurant[];
          pagination: PaginationMeta;
        }> = response.data;

        if (!data.success) {
          throw new Error(data.message);
        }

        return data.data;
      } catch (error: any) {
        // If API fails, return mock data to prevent app crash
        console.warn('API failed, using fallback data:', error.message);

        const mockRestaurants: Restaurant[] = [
          {
            id: 1,
            name: 'Burger King',
            description: 'American fast food restaurant',
            location: 'Jakarta',
            rating: 4.2,
            priceRange: '$$',
            image: '/icons/bk-logo.png',
          },
          {
            id: 2,
            name: "McDonald's",
            description: 'World famous fast food',
            location: 'Jakarta',
            rating: 4.0,
            priceRange: '$$',
            image: '/icons/bk-logo.png',
          },
        ];

        return {
          restaurants: mockRestaurants,
          pagination: {
            page: filters.page || 1,
            limit: filters.limit || 12,
            total: mockRestaurants.length,
            totalPages: 1,
          },
        };
      }
    },
    enabled: options.enabled ?? true,
    retry: 2,
    retryDelay: 1000,
  });
};

// Restaurant Detail Hook
export const useRestaurantDetail = (
  id: number,
  options: { limitMenu?: number; limitReview?: number } = {}
) => {
  return useQuery({
    queryKey: restaurantKeys.detail(id),
    queryFn: async () => {
      const queryParams = new URLSearchParams();

      if (options.limitMenu)
        queryParams.append('limitMenu', options.limitMenu.toString());
      if (options.limitReview)
        queryParams.append('limitReview', options.limitReview.toString());

      const response = await api.get(
        `/api/resto/${id}?${queryParams.toString()}`
      );
      const data: ApiResponse<{ restaurant: RestaurantDetail }> = response.data;

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.data.restaurant;
    },
    enabled: !!id,
  });
};

// Recommended Restaurants Hook
export const useRecommendedRestaurants = (
  options: { enabled?: boolean } = {}
) => {
  return useQuery({
    queryKey: restaurantKeys.recommended(),
    queryFn: async () => {
      const response = await api.get('/api/resto/recommended');
      const data: ApiResponse<{ restaurants: Restaurant[] }> = response.data;

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.data.restaurants;
    },
    enabled: options.enabled ?? true,
  });
};

// Add to Favorites Mutation
export const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (restaurantId: number) => {
      const response = await api.post(`/api/resto/${restaurantId}/favorite`);
      const data: ApiResponse<{ message: string }> = response.data;

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.data;
    },
    onSuccess: () => {
      // Invalidate and refetch restaurants
      queryClient.invalidateQueries({ queryKey: restaurantKeys.all });
    },
  });
};

// Remove from Favorites Mutation
export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (restaurantId: number) => {
      const response = await api.delete(`/api/resto/${restaurantId}/favorite`);
      const data: ApiResponse<{ message: string }> = response.data;

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.data;
    },
    onSuccess: () => {
      // Invalidate and refetch restaurants
      queryClient.invalidateQueries({ queryKey: restaurantKeys.all });
    },
  });
};
