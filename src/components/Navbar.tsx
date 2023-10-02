"use client";
import React from "react";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Image from "next/image";
import { useShoppingCart } from "@/context/ShoppingCartProvider";

const Navbar = () => {
  const { cartQuantityReduce, toggleMenu, like, cartLikedCount } =
    useShoppingCart();

  return (
    <div className="sm:hidden md:block sticky top-0 overflow-hidden bg-white z-10">
      <div className="container flex justify-between items-center">
        <div className=" font-bold text-4xl text-center pb-2 sm:pb-0 text-blackish flex items-center justify-center">
          <Image
            src={"./nike-logo.svg"}
            alt="nikeLogo"
            width={60}
            height={60}
          />
        </div>
        <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
          <Link className="navbar__link relative" href="#">
            {" "}
            HOME
          </Link>
          <Link className="navbar__link relative" href="#">
            {" "}
            CATEGORIES
          </Link>
          <Link className="navbar__link relative" href="#">
            {" "}
            MEN
          </Link>
          <Link className="navbar__link relative" href="#">
            {" "}
            WOMEN
          </Link>
          <Link className="navbar__link relative" href="#">
            {" "}
            HOT OFFERS
          </Link>
        </div>
        {/* //hiden */}
        <div className=" lg:flex gap-4 text-gray-500 text-[30px]">
          <BiUser />
          <div
            onClick={() => toggleMenu("liked")}
            className="relative cursor-pointer"
          >
            <FiHeart />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              {cartLikedCount}
            </div>
          </div>
          <div
            onClick={() => toggleMenu("cart")}
            className="relative cursor-pointer"
          >
            <HiOutlineShoppingBag />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              {cartQuantityReduce}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
