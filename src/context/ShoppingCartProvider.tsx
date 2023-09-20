"use client";
import { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
  id: number;
  quantity: number;
  liked?: boolean;
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
  updateLikedStatus: (id: number, liked: boolean) => void;
  like: number;
  checkedLike: boolean;
  setCheckedLike: (checked: boolean) => void;
};

const ShoppingCart = createContext<CartItemContextType | undefined>(undefined);

export const ShoppingCartProvider = ({ children }: any) => {
  const [quantity, setQuantity] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkedLike, setCheckedLike] = useState(false);
  const [like, setLiked] = useState(0);

  const updateLikedStatus = (id: number, likede: boolean) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, liked: likede };
      }
      return item;
    });
    setCart(updatedCart);
  };

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

  useEffect(() => {
    const likedItemCount = cart.filter((elem) => elem.liked).length;
    console.log(likedItemCount);

    setLiked(likedItemCount);
  }, [cart]);

  return (
    <ShoppingCart.Provider
      value={{
        checkedLike,
        setCheckedLike,
        like,
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
        updateLikedStatus,
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
