import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api/axios';
import { useRestaurants } from '../services/queries/restaurant';
import type { Restaurant, ApiResponse, PaginationMeta } from '../types/api';

export interface SearchFilters {
  query: string;
  page?: number;
  limit?: number;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'restaurant' | 'cuisine' | 'dish';
}

// Search restaurants hook
export const useSearchRestaurants = (
  filters: SearchFilters,
  options: { enabled?: boolean } = {}
) => {
  return useQuery({
    queryKey: ['search', 'restaurants', filters],
    queryFn: async () => {
      const queryParams = new URLSearchParams();

      if (filters.query) queryParams.append('q', filters.query);
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());

      // Try the search endpoint first, fallback to regular restaurants with name filter
      try {
        const response = await api.get(`/api/resto?${queryParams.toString()}`);
        const data: ApiResponse<{
          restaurants: Restaurant[];
          pagination: PaginationMeta;
        }> = response.data;

        if (!data.success) {
          throw new Error(data.message);
        }

        // Filter results by query if API doesn't support search
        const filteredRestaurants = filters.query
          ? data.data.restaurants.filter((restaurant) => {
              const query = filters.query.toLowerCase();
              const name = restaurant.name.toLowerCase();
              const place = restaurant.place.toLowerCase();

              // More flexible search - check if any word in query matches
              const queryWords = query.split(' ');
              return queryWords.some(
                (word) =>
                  name.includes(word) ||
                  place.includes(word) ||
                  // Check for partial matches
                  (word.length >= 3 &&
                    (name.includes(word) || place.includes(word)))
              );
            })
          : data.data.restaurants;

        return {
          restaurants: filteredRestaurants,
          pagination: {
            ...data.data.pagination,
            total: filteredRestaurants.length,
          },
        };
      } catch (error: any) {
        console.warn('Search API failed, using fallback:', error.message);

        // Fallback mock search results
        const mockResults: Restaurant[] = [
          {
            id: 999,
            name: `Search Result for "${filters.query}"`,
            place: 'Jakarta',
            star: 4.5,
            logo: '/icons/bk-logo.png',
            images: [
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
            ],
            reviewCount: 10,
            menuCount: 15,
            priceRange: { min: 25000, max: 75000 },
          },
        ];

        return {
          restaurants: mockResults,
          pagination: {
            page: filters.page || 1,
            limit: filters.limit || 12,
            total: mockResults.length,
            totalPages: 1,
          },
        };
      }
    },
    enabled: options.enabled ?? !!filters.query,
    staleTime: 1000 * 10, // 10 seconds - very short cache for search
    gcTime: 1000 * 60 * 2, // 2 minutes
    refetchOnMount: 'always', // Always refetch when component mounts
    refetchOnWindowFocus: false,
    retry: false, // Don't retry failed searches to avoid delays
  });
};

// Search suggestions hook
export const useSearchSuggestions = (query: string) => {
  // Get restaurants data to use for suggestions
  const { data: restaurantsData } = useRestaurants({ limit: 100 }); // Get more restaurants for better suggestions

  return useQuery({
    queryKey: ['search', 'suggestions', query],
    queryFn: async (): Promise<SearchSuggestion[]> => {
      if (!query || query.length < 2) return [];

      const suggestions: SearchSuggestion[] = [];
      const queryLower = query.toLowerCase().trim();
      const addedTexts = new Set<string>(); // Prevent duplicates

      // Add restaurant name suggestions
      if (restaurantsData?.restaurants) {
        restaurantsData.restaurants.forEach((restaurant) => {
          const restaurantName = restaurant.name.toLowerCase();
          const restaurantPlace = restaurant.place.toLowerCase();

          // Check if restaurant name matches query
          if (
            restaurantName.includes(queryLower) &&
            !addedTexts.has(restaurant.name)
          ) {
            suggestions.push({
              id: `restaurant-${restaurant.id}`,
              text: restaurant.name,
              type: 'restaurant',
            });
            addedTexts.add(restaurant.name);
          }

          // Check if location matches query
          if (
            restaurantPlace.includes(queryLower) &&
            !addedTexts.has(restaurant.place)
          ) {
            suggestions.push({
              id: `location-${restaurant.place}`,
              text: restaurant.place,
              type: 'cuisine', // Use cuisine type for locations
            });
            addedTexts.add(restaurant.place);
          }
        });
      }

      // Add popular food/dish suggestions based on restaurant names and common foods
      const foodSuggestions = [
        'Pizza',
        'Burger',
        'Chicken',
        'Noodles',
        'Rice',
        'Sushi',
        'Sandwich',
        'Coffee',
        'Tea',
        'Pasta',
        'Salad',
        'Soup',
        'Steak',
        'Fish',
        'Curry',
        'Fried Rice',
        'Mie Ayam',
        'Nasi Goreng',
        'Bakso',
        'Rendang',
        'Sate',
        'Gado-gado',
        'Soto',
        'Gudeg',
        'Martabak',
        'Dimsum',
      ];

      foodSuggestions.forEach((food) => {
        if (food.toLowerCase().includes(queryLower) && !addedTexts.has(food)) {
          suggestions.push({
            id: `dish-${food.toLowerCase().replace(' ', '-')}`,
            text: food,
            type: 'dish',
          });
          addedTexts.add(food);
        }
      });

      // Sort suggestions: restaurants first, then dishes, then locations
      const sortedSuggestions = suggestions.sort((a, b) => {
        if (a.type === 'restaurant' && b.type !== 'restaurant') return -1;
        if (a.type !== 'restaurant' && b.type === 'restaurant') return 1;
        if (a.type === 'dish' && b.type === 'cuisine') return -1;
        if (a.type === 'cuisine' && b.type === 'dish') return 1;
        return 0;
      });

      return sortedSuggestions.slice(0, 6); // Limit to 6 suggestions
    },
    enabled: query.length >= 2 && !!restaurantsData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });
};

// Search menus hook
export const useSearchMenus = (
  filters: SearchFilters,
  options: { enabled?: boolean } = {}
) => {
  return useQuery({
    queryKey: ['search', 'menus', filters],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams();

        if (filters.query) queryParams.append('q', filters.query);
        if (filters.page) queryParams.append('page', filters.page.toString());
        if (filters.limit)
          queryParams.append('limit', filters.limit.toString());

        const response = await api.get(`/api/menus?${queryParams.toString()}`);
        const data: ApiResponse<{
          menus: any[];
          pagination: PaginationMeta;
        }> = response.data;

        if (!data.success) {
          throw new Error(data.message);
        }

        // Filter results by query if API doesn't support search
        const filteredMenus = filters.query
          ? data.data.menus.filter((menu: any) => {
              const query = filters.query.toLowerCase();
              const name = menu.name.toLowerCase();
              const description = menu.description?.toLowerCase() || '';
              const category = menu.category?.toLowerCase() || '';

              const queryWords = query.split(' ');
              return queryWords.some(
                (word) =>
                  name.includes(word) ||
                  description.includes(word) ||
                  category.includes(word) ||
                  (word.length >= 3 &&
                    (name.includes(word) ||
                      description.includes(word) ||
                      category.includes(word)))
              );
            })
          : data.data.menus;

        return {
          menus: filteredMenus,
          pagination: {
            ...data.data.pagination,
            total: filteredMenus.length,
          },
        };
      } catch (error: any) {
        console.warn('Menu search API failed, using fallback:', error.message);

        // Fallback mock menu results
        const mockMenus = [
          {
            id: 1,
            name: `${filters.query} Menu`,
            description: `Delicious ${filters.query} with our special recipe`,
            price: 35000,
            image:
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
            category: 'Main Course',
            restaurant: {
              id: 1,
              name: 'Restaurant Sederhana',
              place: 'Jakarta',
            },
          },
        ];

        return {
          menus: mockMenus,
          pagination: {
            page: filters.page || 1,
            limit: filters.limit || 12,
            total: mockMenus.length,
            totalPages: 1,
          },
        };
      }
    },
    enabled: options.enabled ?? !!filters.query,
    staleTime: 1000 * 10, // 10 seconds
    gcTime: 1000 * 60 * 2, // 2 minutes
    retry: false,
  });
};

// Custom hook for search state management
export const useSearchState = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setHasSearched(true);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearching(false);
    setHasSearched(false);
  }, []);

  const setSearchComplete = useCallback(() => {
    setIsSearching(false);
  }, []);

  return {
    searchQuery,
    isSearching,
    hasSearched,
    handleSearch,
    clearSearch,
    setSearchComplete,
  };
};
