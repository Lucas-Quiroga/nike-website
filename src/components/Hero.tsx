"use client";

import React from "react";
import Slider from "react-slick";
import Slide from "./Slide";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
  };

  const SliderData = [
    {
      id: 0,
      img: "/banner-4.jpg",
      title: "Trending Item",
      mainTitle: "Nike Air Force AF1",
      price: "$20",
    },
    {
      id: 1,
      img: "/banner-5.jpg",
      title: "Trending Accessories",
      mainTitle: "Nike Air Zoom Pegasus 37 Mujer",
      price: "$15",
    },
    {
      id: 2,
      img: "/banner-6.jpg",
      title: "Sale Offer",
      mainTitle: "Nike Air Zoom Pegasus 37",
      price: "$30",
    },
  ];

  return (
    <div>
      <div className="container pt-6 lg:pt-0">
        <Slider {...settings}>
          {SliderData.map((item) => (
            <Slide
              key={item.id}
              id={item.id}
              img={item.img}
              title={item.title}
              mainTitle={item.mainTitle}
              price={item.price}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
