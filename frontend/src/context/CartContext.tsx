import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; product: Product; quantity?: number }
  | { type: 'REMOVE'; productId: string | number }
  | { type: 'UPDATE_QUANTITY'; productId: string | number; quantity: number }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const id = action.product.documentId ?? action.product.id;
      const existing = state.items.find((i) => (i.product.documentId ?? i.product.id) === id);
      const qty = action.quantity ?? 1;
      if (existing) {
        return {
          items: state.items.map((i) =>
            (i.product.documentId ?? i.product.id) === id
              ? { ...i, quantity: i.quantity + qty }
              : i
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: qty }] };
    }
    case 'REMOVE': {
      return {
        items: state.items.filter((i) => (i.product.documentId ?? i.product.id) !== action.productId),
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.quantity < 1) {
        return { items: state.items.filter((i) => (i.product.documentId ?? i.product.id) !== action.productId) };
      }
      return {
        items: state.items.map((i) =>
          (i.product.documentId ?? i.product.id) === action.productId
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalAmount: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: 'ADD', product, quantity });
  }, []);

  const removeItem = useCallback((productId: string | number) => {
    dispatch({ type: 'REMOVE', productId });
  }, []);

  const updateQuantity = useCallback((productId: string | number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const totalCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = state.items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0);

  const value: CartContextValue = {
    items: state.items,
    totalCount,
    totalAmount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
