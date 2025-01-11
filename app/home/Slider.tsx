"use client";
import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing arrow icons
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../public/assets/Slider_Images/banner1.jpeg";
import img2 from "../../public/assets/Slider_Images/banner2.jpeg";
import img3 from "../../public/assets/Slider_Images/banner3.jpeg";
import img4 from "../../public/assets/Slider_Images/banner4.jpeg";
import Image from "next/image";

const CustomPrevArrow = ({ onClick }: any) => {
  return (
    <div
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer z-10 hover:scale-110 transition-transform"
      onClick={onClick}
    >
      <FaArrowLeft className="text-gray-800" />
    </div>
  );
};

const CustomNextArrow = ({ onClick }: any) => {
  return (
    <div
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer z-10 hover:scale-110 transition-transform"
      onClick={onClick}
    >
      <FaArrowRight className="text-gray-800" />
    </div>
  );
};

function CustomSlider() {
  const sliderSettings = {
    dots: false, // show dots at the bottom
    infinite: true, // Infinite loop sliding
    speed: 500, // transition speed
    slidesToShow: 1, // How many slides to show
    slidesToScroll: 1, // How many slides to scroll per click
    arrows: true, // Left and right arrows
    nextArrow: <CustomNextArrow />, // Custom next arrow
    prevArrow: <CustomPrevArrow />, // Custom previous arrow

    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images = [img1, img2, img3, img4];

  return (
    <div className="w-full my-0 py-0">
      <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <div key={index} className="h-full !my-0 animate-fadeIn py-0">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full tablet:h-[25rem] lg:h-[35rem] "
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomSlider;
