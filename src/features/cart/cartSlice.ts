import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { 
  CartItem, 
  Cart, 
  AddToCartRequest,
  ApiResponse 
} from '../../types/api';

// Async thunks
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartData: AddToCartRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });

      const data: ApiResponse<{ cartItem: CartItem }> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data.cartItem;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch('/api/cart', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data: ApiResponse<Cart> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ cartItemId, quantity }: { cartItemId: number; quantity: number }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      const data: ApiResponse<{ cartItem: CartItem }> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data.cartItem;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (cartItemId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`/api/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data: ApiResponse<{ message: string }> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return cartItemId;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data: ApiResponse<{ message: string }> = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.message;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

interface CartState {
  items: CartItem[];
  summary: {
    totalItems: number;
    totalPrice: number;
  };
  isLoading: boolean;
  error: string | null;
  isAddingToCart: boolean;
  addToCartError: string | null;
  isUpdatingItem: boolean;
  updateItemError: string | null;
  isRemovingItem: boolean;
  removeItemError: string | null;
  isClearingCart: boolean;
  clearCartError: string | null;
}

const initialState: CartState = {
  items: [],
  summary: {
    totalItems: 0,
    totalPrice: 0,
  },
  isLoading: false,
  error: null,
  isAddingToCart: false,
  addToCartError: null,
  isUpdatingItem: false,
  updateItemError: null,
  isRemovingItem: false,
  removeItemError: null,
  isClearingCart: false,
  clearCartError: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.addToCartError = null;
      state.updateItemError = null;
      state.removeItemError = null;
      state.clearCartError = null;
    },
  },
  extraReducers: (builder) => {
    // Add to cart cases
    builder
      .addCase(addToCart.pending, (state) => {
        state.isAddingToCart = true;
        state.addToCartError = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isAddingToCart = false;
        // Check if item already exists
        const existingItemIndex = state.items.findIndex(
          item => item.menuId === action.payload.menuId
        );
        
        if (existingItemIndex >= 0) {
          // Update existing item
          state.items[existingItemIndex] = action.payload;
        } else {
          // Add new item
          state.items.push(action.payload);
        }
        
        // Recalculate summary
        state.summary.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
        state.summary.totalPrice = state.items.reduce((sum, item) => sum + item.itemTotal, 0);
        state.addToCartError = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isAddingToCart = false;
        state.addToCartError = action.payload as string;
      })
      
      // Fetch cart cases
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.summary = action.payload.summary;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Update cart item cases
      .addCase(updateCartItem.pending, (state) => {
        state.isUpdatingItem = true;
        state.updateItemError = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isUpdatingItem = false;
        const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
        if (itemIndex >= 0) {
          state.items[itemIndex] = action.payload;
          // Recalculate summary
          state.summary.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
          state.summary.totalPrice = state.items.reduce((sum, item) => sum + item.itemTotal, 0);
        }
        state.updateItemError = null;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isUpdatingItem = false;
        state.updateItemError = action.payload as string;
      })
      
      // Remove cart item cases
      .addCase(removeCartItem.pending, (state) => {
        state.isRemovingItem = true;
        state.removeItemError = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isRemovingItem = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        // Recalculate summary
        state.summary.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
        state.summary.totalPrice = state.items.reduce((sum, item) => sum + item.itemTotal, 0);
        state.removeItemError = null;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isRemovingItem = false;
        state.removeItemError = action.payload as string;
      })
      
      // Clear cart cases
      .addCase(clearCart.pending, (state) => {
        state.isClearingCart = true;
        state.clearCartError = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isClearingCart = false;
        state.items = [];
        state.summary = { totalItems: 0, totalPrice: 0 };
        state.clearCartError = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isClearingCart = false;
        state.clearCartError = action.payload as string;
      });
  },
});

export const { clearErrors } = cartSlice.actions;
export default cartSlice.reducer;
