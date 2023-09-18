"use client";
import { createContext, useContext, useState } from "react";

type CartItem = {
  id: number;
  quantity: number;
};

type CartItemContextType = {
  quantity: number;
  setQuantity: (id: number) => void;
  cart: CartItem[];
  setCart: (items: CartItem[]) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  cartQuantityReduce: number;
  getItemQuantity: (id: number) => number;
  removeItem: (id: number) => void;
  toggleMenu: () => void;
  isOpen: boolean;
  closeMenu: () => void;
  like: number;
  setLike: (n: number) => void;
};

const ShoppingCart = createContext<CartItemContextType | undefined>(undefined);

export const ShoppingCartProvider = ({ children }: any) => {
  const [quantity, setQuantity] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [like, setLike] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const cartQuantityReduce = cart.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cart.find((item) => item.id == id)?.quantity || 0;
  }

  const incrementQuantity = (id: number) => {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((currentCart) => [...currentCart, { id, quantity: 1 }]);
    }
  };

  const decrementQuantity = (id: number) => {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      setCart((currentCart) => {
        const itemToRemove = currentCart.find((e) => e.id === id);
        if (itemToRemove && itemToRemove.quantity === 1) {
          return currentCart.filter((e) => e.id !== id);
        } else {
          return currentCart;
        }
      });
    }
  };

  const removeItem = (id: number) => {
    return setCart((currentItem) => currentItem.filter((e) => e.id !== id));
  };

  return (
    <ShoppingCart.Provider
      value={{
        like,
        setLike,
        isOpen,
        toggleMenu,
        closeMenu,
        quantity,
        setQuantity,
        cart,
        setCart,
        incrementQuantity,
        cartQuantityReduce,
        getItemQuantity,
        decrementQuantity,
        removeItem,
      }}
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
