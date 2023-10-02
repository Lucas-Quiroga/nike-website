"use client";
import React from "react";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoMenuOutline } from "react-icons/io5";
import { AiOutlineHome, AiOutlineAppstore } from "react-icons/ai";
import { useShoppingCart } from "@/context/ShoppingCartProvider";

const MobNavbar = () => {
  const { cartQuantityReduce, toggleMenu, like, cartLikedCount } =
    useShoppingCart();
  return (
    <div className="lg:hidden fixed bottom-0 w-full left-[50%] -translate-x-[50%] max-w-[500px] mob_navbar px-8 bg-white z-10">
      <div className="flex justify-between text-[28px] py-2">
        <IoMenuOutline />
        <div
          onClick={() => toggleMenu("cart")}
          className="relative cursor-pointer"
        >
          <HiOutlineShoppingBag />
          <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1 ">
            {cartQuantityReduce}
          </div>
        </div>

        <AiOutlineHome />

        <div
          onClick={() => toggleMenu("liked")}
          className="relative cursor-pointer"
        >
          <FiHeart />
          <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
            {cartLikedCount}
          </div>
        </div>

        <AiOutlineAppstore />
      </div>
    </div>
  );
};

export default MobNavbar;
