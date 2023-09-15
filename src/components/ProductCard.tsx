"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useShoppingCart } from "@/context/ShoppingCartProvider";

interface propsType {
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
}

const ProductCard: React.FC<propsType> = ({
  img,
  title,
  desc,
  rating,
  price,
}) => {
  const { quantity, setQuantity } = useShoppingCart();

  const generateRating = (rating: number) => {
    if (rating < 1 || rating > 5) {
      return null;
    }

    const stars = (
      <div className="flex gap-1 text-[20px] text-[#FF9529]">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index}>
            {index < rating ? <AiFillStar /> : <AiOutlineStar />}
          </div>
        ))}
      </div>
    );

    return stars;
  };

  return (
    <div className="flex flex-col justify-between px-4 border border-gray-200 rounded-xl max-w-[400px] h-full">
      <div>
        <Image
          className="w-full h-auto"
          src={img}
          width={300}
          height={300}
          alt={title}
        />
      </div>

      <div className="space-y-2 py-2 flex flex-col justify-between h-full">
        <h2 className="text-accent font-medium uppercase">{title}</h2>
        <p className="text-gray-500 max-w-[150px]">{desc}</p>
        <div>{generateRating(rating)}</div>

        <div className="font-bold flex gap-4">
          ${price}
          <del className="text-gray-500 font-normal">
            ${parseInt(price) + 50}.00
          </del>
        </div>
        {quantity === 0 ? (
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="mb-2 w-full bg-black rounded-3xl px-2 py-2 text-xs font-medium uppercase leading-normal text-white shadow-md hover:bg-gray-300 hover:text-black"
          >
            Buy
          </button>
        ) : (
          <div
            className="text-center flex justify-center items-center"
            style={{ gap: ".5rem" }}
          >
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setQuantity(quantity - 1)}
                className="mb-2  bg-black rounded-3xl px-2 py-2 text-xs font-medium uppercase leading-normal text-white shadow-md hover:bg-gray-300 hover:text-black"
              >
                -
              </button>
              <div>
                <span className="col-end-2">{quantity}</span> in cart
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="mb-2 bg-black rounded-3xl px-2 py-2 text-xs font-medium uppercase leading-normal text-white shadow-md hover:bg-gray-300 hover:text-black"
              >
                +
              </button>
              <button className="col-span-3">Remove</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
