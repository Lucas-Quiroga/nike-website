"use client";
import { createContext, useContext, useState } from "react";

type CartItem = {
  id: number;
  quantity: number;
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
};

type CartItemContextType = {
  quantity: number;
  setQuantity: (id: number) => void;
  cart: CartItem[];
  setCart: (items: CartItem[]) => void;
  incrementQuantity: (id: number) => void;
};

const ShoppingCart = createContext<CartItemContextType | undefined>(undefined);

export const ShoppingCartProvider = ({ children }: any) => {
  const [quantity, setQuantity] = useState(0);

  const [cart, setCart] = useState<CartItem[]>([]);

  const incrementQuantity = (id: number) => {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((currentCart) => [
        ...currentCart,
        { id, quantity: 1, img: "", title: "", desc: "", rating: 0, price: "" },
      ]);
    }
  };

  return (
    <ShoppingCart.Provider
      value={{ quantity, setQuantity, cart, setCart, incrementQuantity }}
    >
      {children}
    </ShoppingCart.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCart);
  if (context === undefined) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider "
    );
  }
  return context;
};
