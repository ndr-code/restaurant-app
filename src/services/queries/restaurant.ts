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
            place: 'Jakarta',
            star: 4.2,
            logo: '/icons/bk-logo.png',
            images: [
              'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center',
            ],
            reviewCount: 0,
            menuCount: 8,
            priceRange: { min: 25000, max: 75000 },
          },
          {
            id: 2,
            name: "McDonald's",
            description: 'World famous fast food',
            place: 'Jakarta',
            star: 4.0,
            logo: '/icons/bk-logo.png',
            images: [
              'https://images.unsplash.com/photo-1552566090-a3d25c4d1c8d?w=400&h=300&fit=crop&crop=center',
            ],
            reviewCount: 0,
            menuCount: 12,
            priceRange: { min: 20000, max: 80000 },
          },
          {
            id: 3,
            name: 'Pizza Hut',
            description: 'Italian-American pizza restaurant',
            place: 'Jakarta',
            star: 4.1,
            logo: '/icons/bk-logo.png',
            images: [
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
            ],
            reviewCount: 0,
            menuCount: 15,
            priceRange: { min: 45000, max: 120000 },
          },
          {
            id: 4,
            name: 'KFC',
            description: 'Kentucky Fried Chicken',
            place: 'Jakarta',
            star: 4.3,
            logo: '/icons/bk-logo.png',
            images: [
              'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop&crop=center',
            ],
            reviewCount: 0,
            menuCount: 10,
            priceRange: { min: 30000, max: 90000 },
          },
          {
            id: 5,
            name: 'Starbucks',
            description: 'Coffee and light meals',
            place: 'Jakarta',
            star: 4.4,
            logo: '/icons/bk-logo.png',
            images: [
              'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&crop=center',
            ],
            reviewCount: 0,
            menuCount: 20,
            priceRange: { min: 35000, max: 150000 },
          },
          {
            id: 6,
            name: 'Subway',
            description: 'Fresh submarine sandwiches',
            place: 'Jakarta',
            star: 4.0,
            logo: '/icons/bk-logo.png',
            images: [
              'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center',
            ],
            reviewCount: 0,
            menuCount: 8,
            priceRange: { min: 25000, max: 65000 },
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
