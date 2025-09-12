import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import type { Order, OrderFilters, PaginatedResponse, ApiResponse } from '../../types/api';

export const useOrdersQuery = (filters: OrderFilters = {}) => {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: async (): Promise<PaginatedResponse<Order>> => {
      const params = new URLSearchParams();
      
      // Add filters to query parameters
      if (filters.status) params.append('status', filters.status);
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());

      const response = await axios.get<ApiResponse<PaginatedResponse<Order>>>(
        `/user/orders?${params.toString()}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes (orders update frequently)
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useOrderQuery = (orderId: number) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async (): Promise<Order> => {
      const response = await axios.get<ApiResponse<Order>>(
        `/orders/${orderId}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    enabled: !!orderId,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
