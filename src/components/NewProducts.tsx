"use client";

import React from "react";
import ProductCard from "./ProductCard";
import HeaderMain from "./HeaderMain";
import { useSearch } from "@/context/ProductsContextProvider";
import productsData from "@/json/productsData.json";

const NewProducts = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  const filterDataProducts = productsData.filter(({ desc }) => {
    return desc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="container pt-16">
        <div className="flex items-center gap-4">
          {" "}
          <h2 className="font-medium text-2xl">New Products</h2>
          <select
            className="text-gray-500 text-[12px] w-[80px]"
            name="language"
            id="language"
          >
            <option value="All">All</option>
            <option value="Like">Like</option>
          </select>
        </div>

        <HeaderMain />
        <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
          {filterDataProducts.map((item, index) => (
            <ProductCard
              id={item.id}
              key={index}
              img={item.img}
              title={item.title}
              desc={item.desc}
              rating={item.rating}
              price={item.price}
              liked={item.liked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
