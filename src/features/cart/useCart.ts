import { useAppSelector, useAppDispatch } from '../../store';
import { 
  addToCart, 
  fetchCart, 
  updateCartItem, 
  removeCartItem, 
  clearCart 
} from './cartSlice';
import type { AddToCartRequest } from '../../types/api';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const addItemToCart = async (cartData: AddToCartRequest) => {
    return dispatch(addToCart(cartData));
  };

  const getCart = async () => {
    return dispatch(fetchCart());
  };

  const updateItem = async (cartItemId: number, quantity: number) => {
    return dispatch(updateCartItem({ cartItemId, quantity }));
  };

  const removeItem = async (cartItemId: number) => {
    return dispatch(removeCartItem(cartItemId));
  };

  const clearCartItems = async () => {
    return dispatch(clearCart());
  };

  return {
    // State
    items: cart.items,
    summary: cart.summary,
    isLoading: cart.isLoading,
    error: cart.error,
    
    // Loading states for specific actions
    isAddingToCart: cart.isAddingToCart,
    addToCartError: cart.addToCartError,
    isUpdatingItem: cart.isUpdatingItem,
    updateItemError: cart.updateItemError,
    isRemovingItem: cart.isRemovingItem,
    removeItemError: cart.removeItemError,
    isClearingCart: cart.isClearingCart,
    clearCartError: cart.clearCartError,
    
    // Actions
    addItemToCart,
    getCart,
    updateItem,
    removeItem,
    clearCartItems,
    
    // Computed values
    itemCount: cart.summary.totalItems,
    totalAmount: cart.summary.totalPrice,
    isEmpty: cart.items.length === 0,
  };
};
