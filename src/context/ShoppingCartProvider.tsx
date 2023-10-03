"use client";
import { createContext, useContext, useState, useEffect } from "react";
import productData from "@/json/productsData.json";

type CartItem = {
  id: number;
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
  quantity: number;
  liked?: boolean;
};

type CartItemLiked = {
  id: number;
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
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
  isOpen: boolean;
  closeMenu: () => void;
  updateLikedStatus: (id: number, liked: boolean) => void;
  like: number;
  toggleMenu: (current: "cart" | "liked") => void;
  isOpenCart: boolean;
  isOpenLiked: boolean;
  isProductLiked: (id: number) => boolean;
  cartLikedCount: number;
  cartLiked: CartItemLiked[];
};

const ShoppingCart = createContext<CartItemContextType | undefined>(undefined);

export const ShoppingCartProvider = ({ children }: any) => {
  const [quantity, setQuantity] = useState(0);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenLiked, setOpenLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [like, setLiked] = useState(0);

  //CARRITO DE LIKES
  const [cartLiked, setCartLiked] = useState<CartItemLiked[]>([]);

  const updateLikedStatus = (id: number, likede: boolean) => {
    const item = productData.find((elem) => elem.id === id);

    if (!item) {
      return; // Salir si no se encuentra el producto
    }

    if (likede) {
      // Verificar si el producto ya está en el carrito de likes
      const isProductInLikedCart = cartLiked.some(
        (product) => product.id === id
      );

      if (!isProductInLikedCart) {
        // Agregar el producto al carrito de likes si no existe
        setCartLiked([...cartLiked, item]);
      }
    } else {
      // Eliminar el producto del carrito de likes si existe
      setCartLiked(cartLiked.filter((product) => product.id !== id));
    }
  };

  const isProductLiked = (id: number) => {
    return cartLiked.some((product) => product.id === id);
  };

  const toggleMenu = (current: string) => {
    switch (current) {
      case "liked":
        setOpenLiked(true);
        setIsOpenCart(false);
        setIsOpen(true);
        break;
      case "cart":
        setIsOpenCart(true);
        setOpenLiked(false);
        setIsOpen(true);
        break;
      default:
        break;
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const cartQuantityReduce = cart.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const cartLikedCount: number = cartLiked.length;

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
      const productToAdd = productData.find((product) => product.id === id);

      if (productToAdd) {
        // Agrega el producto al carrito con su cantidad original y otros datos originales
        setCart((currentCart) => [
          ...currentCart,
          {
            ...productToAdd,
            quantity: 1,
          },
        ]);
      }
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
    setLiked(likedItemCount);
  }, [cart]);

  return (
    <ShoppingCart.Provider
      value={{
        cartLiked,
        cartLikedCount,
        isOpenCart,
        isOpenLiked,
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
        isProductLiked,
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
