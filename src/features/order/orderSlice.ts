import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { 
  Order, 
  CreateOrderRequest, 
  CreateOrderResponse, 
  OrderFilters,
  PaginationMeta,
  ApiResponse 
} from '../../types/api';

// Async thunks
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData: CreateOrderRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch('/api/order/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data: ApiResponse<CreateOrderResponse> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  'order/fetchMyOrders',
  async (filters: OrderFilters = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const queryParams = new URLSearchParams();
      
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());

      const response = await fetch(`/api/order/my-order?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data: ApiResponse<{ orders: Order[]; pagination: PaginationMeta }> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ orderId, status }: { orderId: number; status: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`/api/order/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data: ApiResponse<{ order: Order }> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data.order;
    } catch {
      return rejectWithValue('Network error occurred');
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
