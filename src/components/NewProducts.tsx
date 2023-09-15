"use client";

import React from "react";
import ProductCard from "./ProductCard";
import HeaderMain from "./HeaderMain";
import { useSearch } from "@/context/ProductsContextProvider";

const NewProducts = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  const productsData = [
    {
      id: 0,
      img: "/nike1.jpg",
      title: "NEW",
      desc: "Nike ZoomX Vaporfly",
      rating: 4,
      price: "45.00",
    },
    {
      id: 1,
      img: "/nike2.jpg",
      title: "NEW",
      desc: "Nike Vaporfly",
      rating: 5,
      price: "55.00",
    },
    {
      id: 2,
      img: "/nike3.jpg",
      title: "50% OFF",
      desc: "Nike Air Max Flyknit Racer Next Nature",
      rating: 3,
      price: "25.00",
    },
    {
      id: 3,
      img: "/nike4.jpg",
      title: "SPORTS",
      desc: "Nike React Infinity Run Flyknit 3 Premium",
      rating: 4,
      price: "45.00",
    },
    {
      id: 4,
      img: "/nike5.jpg",
      title: "SPORTS",
      desc: "Nike Air Zoom Alphafly",
      rating: 3,
      price: "58.00",
    },
    {
      id: 5,
      img: "/nike6.jpg",
      title: "AIR",
      desc: "Air Jordan 1 Low",
      rating: 4,
      price: "100.00",
    },
    {
      id: 6,
      img: "/nike7.jpg",
      title: "AIR",
      desc: "Air Jordan 1 Low",
      rating: 4,
      price: "120.00",
    },
    {
      id: 7,
      img: "/nike8.jpg",
      title: "NEW",
      desc: "Nike Air Max SYSTM",
      rating: 4,
      price: "120.00",
    },
  ];

  const filterDataProducts = productsData.filter(({ desc }) => {
    return desc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="container pt-16">
        <h2 className="font-medium text-2xl pb-4">New Products</h2>
        <HeaderMain />
        <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
          {filterDataProducts.map((item, index) => (
            <ProductCard
              key={index}
              img={item.img}
              title={item.title}
              desc={item.desc}
              rating={item.rating}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
