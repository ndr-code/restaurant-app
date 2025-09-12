import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api/axios';
import type { 
  Order, 
  CreateOrderRequest, 
  CreateOrderResponse, 
  OrderFilters,
  PaginationMeta,
  ApiResponse 
} from '../../types/api';

// Helper function for error handling
const handleAsyncError = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return axiosError.response?.data?.message || 'Network error occurred';
  }
  return 'Network error occurred';
};

// Async thunks
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData: CreateOrderRequest, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse<CreateOrderResponse>>('/api/order/checkout', orderData);
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  'order/fetchMyOrders',
  async (filters: OrderFilters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.status) queryParams.append('status', filters.status);
      // Additional filters can be added to OrderFilters interface if needed
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());

      const response = await api.get<ApiResponse<{ orders: Order[]; pagination: PaginationMeta }>>(`/api/order/my-order?${queryParams.toString()}`);
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ orderId, status }: { orderId: number; status: string }, { rejectWithValue }) => {
    try {
      const response = await api.put<ApiResponse<Order>>(`/api/order/${orderId}/status`, { status });
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

interface OrderState {
  // My orders
  orders: Order[];
  ordersPagination: PaginationMeta | null;
  isOrdersLoading: boolean;
  ordersError: string | null;
  
  // Create order
  isCreatingOrder: boolean;
  createOrderError: string | null;
  lastCreatedOrder: CreateOrderResponse | null;
  
  // Update order status
  isUpdatingStatus: boolean;
  updateStatusError: string | null;
  
  // Filters
  currentFilters: OrderFilters;
}

const initialState: OrderState = {
  orders: [],
  ordersPagination: null,
  isOrdersLoading: false,
  ordersError: null,
  
  isCreatingOrder: false,
  createOrderError: null,
  lastCreatedOrder: null,
  
  isUpdatingStatus: false,
  updateStatusError: null,
  
  currentFilters: {},
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.ordersError = null;
      state.createOrderError = null;
      state.updateStatusError = null;
    },
    setFilters: (state, action) => {
      state.currentFilters = action.payload;
    },
    clearLastCreatedOrder: (state) => {
      state.lastCreatedOrder = null;
    },
  },
  extraReducers: (builder) => {
    // Create order cases
    builder
      .addCase(createOrder.pending, (state) => {
        state.isCreatingOrder = true;
        state.createOrderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isCreatingOrder = false;
        state.lastCreatedOrder = action.payload;
        state.createOrderError = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isCreatingOrder = false;
        state.createOrderError = action.payload as string;
      })
      
      // Fetch my orders cases
      .addCase(fetchMyOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.ordersError = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.orders = action.payload.orders;
        state.ordersPagination = action.payload.pagination;
        state.ordersError = null;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.ordersError = action.payload as string;
      })
      
      // Update order status cases
      .addCase(updateOrderStatus.pending, (state) => {
        state.isUpdatingStatus = true;
        state.updateStatusError = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isUpdatingStatus = false;
        // Update the order in the list
        const orderIndex = state.orders.findIndex(order => order.id === action.payload.id);
        if (orderIndex >= 0) {
          state.orders[orderIndex] = action.payload;
        }
        state.updateStatusError = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isUpdatingStatus = false;
        state.updateStatusError = action.payload as string;
      });
  },
});

export const { clearErrors, setFilters, clearLastCreatedOrder } = orderSlice.actions;
export default orderSlice.reducer;

// Selectors
export const selectOrderState = (state: { order: OrderState }) => state.order;
export const selectOrders = (state: { order: OrderState }) => state.order.orders;
export const selectOrdersPagination = (state: { order: OrderState }) => state.order.ordersPagination;
export const selectIsOrdersLoading = (state: { order: OrderState }) => state.order.isOrdersLoading;
export const selectOrdersError = (state: { order: OrderState }) => state.order.ordersError;
export const selectIsCreatingOrder = (state: { order: OrderState }) => state.order.isCreatingOrder;
export const selectCreateOrderError = (state: { order: OrderState }) => state.order.createOrderError;
export const selectLastCreatedOrder = (state: { order: OrderState }) => state.order.lastCreatedOrder;
export const selectCurrentFilters = (state: { order: OrderState }) => state.order.currentFilters;
