"use client";

import { createContext, useState, useContext, ReactNode } from 'react';
import { type Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  isCheckoutModalOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckoutModal: () => void;
  closeCheckoutModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => { setCartItems([]); };
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openCheckoutModal = () => setIsCheckoutModalOpen(true);
  const closeCheckoutModal = () => setIsCheckoutModalOpen(false);

  const value = {
    cartItems,
    isCartOpen,
    isCheckoutModalOpen,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    openCart,
    closeCart,
    openCheckoutModal,
    closeCheckoutModal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}