import { configureStore } from '@reduxjs/toolkit';

// Import reducers from features
import { authReducer } from '@/features/auth';
import { cartReducer } from '@/features/cart';
import { orderReducer } from '@/features/order';
import { reviewReducer } from '@/features/review';
import restaurantUIReducer from '@/features/restaurant/restaurantUISlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurantUI: restaurantUIReducer, // Hanya UI state untuk restaurant
    cart: cartReducer,
    order: orderReducer,
    review: reviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks  
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
