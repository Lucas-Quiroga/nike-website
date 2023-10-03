"use client";
import React, { useState } from "react";
import { useShoppingCart } from "@/context/ShoppingCartProvider";
import Image from "next/image";
import productData from "@/json/productsData.json";
import { BsTrash } from "react-icons/bs";

//productos en general
type Product = {
  id: number;
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
  liked?: boolean;
};

const CanvaShoppingCart = () => {
  const {
    isOpen,
    toggleMenu,
    closeMenu,
    cart,
    removeItem,
    cartQuantityReduce,
    isOpenCart,
    isOpenLiked,
    cartLiked,
    cartLikedCount,
  } = useShoppingCart();

  const products: Product[] = productData;

  const getItemById = (id: number) => {
    return productData.find((e) => e.id === id);
  };

  const totalPrice = cart.reduce((total, itemCart) => {
    const item = products.find((i) => i.id === itemCart.id);
    return total + (Number(item?.price) || 0) * itemCart.quantity;
  }, 0);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-10"
          onClick={closeMenu}
        ></div>
      )}

      <div className="flex overflow-hidden bg-gray-100">
        <div
          className={`${
            isOpen ? "translate-x-0" : "translate-x-full"
          } fixed inset-y-0 right-0 w-100 min-w-[400px] sm:min-w-[650px] bg-white border-l transition-transform duration-300 transform z-20`}
        >
          <button
            onClick={closeMenu}
            className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded-full"
          >
            X
          </button>

          {isOpenLiked && (
            <div className="p-4">
              <h1 className="text-xl font-semibold">{`${
                isOpen && isOpenLiked && "Menu Liked"
              }`}</h1>
              <ul className="mt-4">
                {cartLiked.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="border-2 rounded-lg m-3 flex items-center"
                    >
                      <Image
                        src={item.img}
                        alt={item.desc}
                        width={125}
                        height={75}
                        className="mr-2"
                      />
                      <span className="text-1xl p-10 flex-grow">
                        {item.desc}{" "}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <hr />
              {cartLikedCount === 0 ? (
                <div className="text-center text-gray-500 mt-4">
                  No items yet
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          {isOpenCart && (
            <div className="p-4">
              <h1 className="text-xl font-semibold">{`${
                isOpen && isOpenCart && "Menu Cart"
              }`}</h1>
              <ul className="mt-4">
                {cart.map((item) => {
                  const product = getItemById(item.id);
                  if (product && item.quantity > 0) {
                    return (
                      <li
                        key={item.id}
                        className="border-2 rounded-lg m-3 flex items-center"
                      >
                        <Image
                          src={product.img}
                          alt={product.desc}
                          width={125}
                          height={75}
                          className="mr-2"
                        />
                        <span className="text-1xl p-10 flex-grow">
                          {product.desc}{" "}
                          <span className="text-gray-600 text-[10px]">
                            x{item.quantity}
                          </span>
                        </span>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="rounded-lg border-2 bg-blackish text-white border-blackish mx-2"
                        >
                          <BsTrash />
                        </button>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
              <hr />
              {totalPrice === 0 ? (
                <div className="text-center text-gray-500 mt-4">
                  No items yet
                </div>
              ) : (
                <h2 className="text-muted text-gray-600">
                  Total purchase: ${totalPrice}
                </h2>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CanvaShoppingCart;
