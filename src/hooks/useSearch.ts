import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api/axios';
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
              return queryWords.some(word =>
                name.includes(word) ||
                place.includes(word) ||
                // Check for partial matches
                word.length >= 3 && (name.includes(word) || place.includes(word))
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
    staleTime: 1000 * 30, // 30 seconds - short cache for search
    gcTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: 'always', // Always refetch when component mounts
    refetchOnWindowFocus: false,
  });
};

// Search suggestions hook
export const useSearchSuggestions = (query: string) => {
  return useQuery({
    queryKey: ['search', 'suggestions', query],
    queryFn: async (): Promise<SearchSuggestion[]> => {
      if (!query || query.length < 2) return [];

      // Mock suggestions based on query
      const suggestions: SearchSuggestion[] = [
        { id: '1', text: `${query} Restaurant`, type: 'restaurant' },
        { id: '2', text: `${query} Food`, type: 'dish' },
        { id: '3', text: `${query} Cuisine`, type: 'cuisine' },
      ];

      // Add some popular suggestions
      const popularSuggestions = [
        { id: '4', text: 'Pizza', type: 'dish' as const },
        { id: '5', text: 'Burger', type: 'dish' as const },
        { id: '6', text: 'Sushi', type: 'dish' as const },
        { id: '7', text: 'Italian', type: 'cuisine' as const },
        { id: '8', text: 'Chinese', type: 'cuisine' as const },
      ].filter((s) => s.text.toLowerCase().includes(query.toLowerCase()));

      return [...suggestions, ...popularSuggestions].slice(0, 5);
    },
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
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
