import React from "react";
import ProductCard from "./ProductCard";

const NewProducts = () => {
  const productsData = [
    {
      img: "/nike1.jpg",
      title: "Jacket",
      desc: "Nike ZoomX Vaporfly",
      rating: 4,
      price: "45.00",
    },
    {
      img: "/nike2.jpg",
      title: "Skirt",
      desc: "Nike Vaporfly",
      rating: 5,
      price: "55.00",
    },
    {
      img: "/nike3.jpg",
      title: "Party Wear",
      desc: "Nike Air Max Flyknit Racer Next Nature",
      rating: 3,
      price: "25.00",
    },
    {
      img: "/nike4.jpg",
      title: "Shirt",
      desc: "Nike React Infinity Run Flyknit 3 Premium",
      rating: 4,
      price: "45.00",
    },
    {
      img: "/nike5.jpg",
      title: "Sports",
      desc: "Nike Air Zoom Alphafly",
      rating: 3,
      price: "58.00",
    },
    {
      img: "/nike6.jpg",
      title: "Watches",
      desc: "Air Jordan 1 Low",
      rating: 4,
      price: "100.00",
    },
    {
      img: "/nike7.jpg",
      title: "Watches",
      desc: "Air Jordan 1 Low",
      rating: 4,
      price: "120.00",
    },
    {
      img: "/nike8.jpg",
      title: "Watches",
      desc: "Nike Air Max SYSTM",
      rating: 4,
      price: "120.00",
    },
  ];
  return (
    <div>
      <div className="container pt-16">
        <h2 className="font-medium text-2xl pb-4">New Products</h2>

        <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
          {productsData.map((item, index) => (
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
