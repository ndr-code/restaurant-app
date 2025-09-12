import { useAppSelector } from '../store';

/**
 * Custom hook for managing order state
 * Provides all order-related state in one place
 */
export const useOrders = () => {
  const order = useAppSelector((state) => state.order);
  
  return {
    orders: order.orders,
    pagination: order.ordersPagination,
    isLoading: order.isOrdersLoading,
    error: order.ordersError,
    isCreatingOrder: order.isCreatingOrder,
    createOrderError: order.createOrderError,
    lastCreatedOrder: order.lastCreatedOrder,
    isUpdatingStatus: order.isUpdatingStatus,
    updateStatusError: order.updateStatusError,
    currentFilters: order.currentFilters,
  };
};
