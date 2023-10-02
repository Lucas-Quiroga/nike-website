"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useShoppingCart } from "@/context/ShoppingCartProvider";
import "@/styles/ProductCard.css";

interface propsType {
  id: number;
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
  liked: boolean;
}

const ProductCard: React.FC<propsType> = ({
  id,
  img,
  title,
  desc,
  rating,
  price,
  liked,
}) => {
  const {
    incrementQuantity,
    getItemQuantity,
    decrementQuantity,
    updateLikedStatus,
    isProductLiked,
  } = useShoppingCart();

  const [checkedLike, setCheckedLike] = useState(false);

  const quantity = getItemQuantity(id);

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

  const likedd = isProductLiked(id); // Obtén el estado liked del contexto

  const handleLikeClick = (id: number) => {
    // Actualiza el estado liked del producto
    updateLikedStatus(id, !likedd);
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
          <div className="flex justify-between items-center flex-row-reverse">
            <button
              type="button"
              className="button rounded-lg text-center"
              onClick={() => incrementQuantity(id)}
            >
              <span className="button__text rounded-lg">Add Item</span>
              <span className="button__icon rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="currentColor"
                  height="24"
                  fill="none"
                  className="svg"
                >
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </button>
            <label className="containerr">
              <input
                type="checkbox"
                onChange={() => handleLikeClick(id)}
                checked={likedd}
              />
              <svg
                id="Layer_1"
                version="1.0"
                viewBox="0 0 24 24"
                xmlSpace="preserve" // Cambiado de "xml:space" a "xmlSpace"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink" // Cambiado de "xmlns:xlink" a "xmlnsXlink"
              >
                <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
              </svg>
            </label>
          </div>
        ) : (
          <div
            className="text-center flex justify-center items-center"
            style={{ gap: ".5rem" }}
          >
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => decrementQuantity(id)}
                className="mb-2  bg-black rounded-3xl px-2 py-2 text-xs font-medium uppercase leading-normal text-white shadow-md hover:bg-gray-300 hover:text-black"
              >
                -
              </button>
              <div>
                <span className="col-end-2 relative top-1">{quantity}</span>
              </div>
              <button
                onClick={() => incrementQuantity(id)}
                className="mb-2 w-20 bg-black rounded-3xl px-2 py-2 text-xs font-medium uppercase leading-normal text-white shadow-md hover:bg-gray-300 hover:text-black"
              >
                +
              </button>
              {/* <button onClick={() => removeItem(id)} className="col-span-3">
                Remove
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
