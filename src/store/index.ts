import { configureStore } from '@reduxjs/toolkit';

// Import reducers from store/slices
import { 
  authReducer,
  cartReducer,
  orderReducer,
  reviewReducer,
  restaurantUIReducer
} from './slices';

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
