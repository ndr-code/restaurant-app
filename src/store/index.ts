import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

// Import reducers from features
import { authReducer } from '../features/auth';
import { restaurantReducer } from '../features/restaurant';
import { cartReducer } from '../features/cart';
import { orderReducer } from '../features/order';
import { reviewReducer } from '../features/review';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
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
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
