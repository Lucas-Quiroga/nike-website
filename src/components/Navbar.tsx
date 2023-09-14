import React from "react";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="lg:block">
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
        <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
          <BiUser />
          <div className="relative">
            <FiHeart />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              0
            </div>
          </div>
          <div className="relative">
            <HiOutlineShoppingBag />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
