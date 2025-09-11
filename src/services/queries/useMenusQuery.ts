import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import type { Menu, ApiResponse } from '../../types/api';

export const useMenusQuery = (restaurantId: number) => {
  return useQuery({
    queryKey: ['menus', restaurantId],
    queryFn: async (): Promise<Menu[]> => {
      const response = await axios.get<ApiResponse<Menu[]>>(
        `/restaurants/${restaurantId}/menus`
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

export const useMenuQuery = (menuId: number) => {
  return useQuery({
    queryKey: ['menu', menuId],
    queryFn: async (): Promise<Menu> => {
      const response = await axios.get<ApiResponse<Menu>>(
        `/menus/${menuId}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    enabled: !!menuId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};
