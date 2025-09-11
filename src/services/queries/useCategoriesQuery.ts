import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import type { ApiResponse } from '../../types/api';

interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const response = await axios.get<ApiResponse<Category[]>>('/categories');

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes (categories change less frequently)
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useCategoryQuery = (categoryId: number) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: async (): Promise<Category> => {
      const response = await axios.get<ApiResponse<Category>>(
        `/categories/${categoryId}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};
