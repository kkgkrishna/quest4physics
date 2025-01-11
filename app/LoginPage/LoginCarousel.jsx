import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../../assets/loginPage/slide1.webp";
import slide2 from "../../../assets/loginPage/slide2.webp";
import slide3 from "../../../assets/loginPage/slide3.webp";
import slide4 from "../../../assets/loginPage/slide4.webp";

// Sample data (you can add more cards here)
const testimonials = [
  // {
  //   image: slide1, // Replace with actual image path
  // },
  {
    image: slide2, // Replace with actual image path
  },
  {
    image: slide3, // Replace with actual image path
  },
  // {
  //   image: slide4, // Replace with actual image path
  // },
];

const LoginCarousel = () => {
  const sliderSettings = {
    dots: true, // Disable dots for a cleaner look
    infinite: true, // Infinite scroll
    speed: 500, // Transition speed
    slidesToShow: 1, // Show 2 cards at a time
    slidesToScroll: 1, // Scroll 1 card at a time
    arrows: false, // Show navigation arrows
    autoplay: true, // Enable auto-scrolling
    autoplaySpeed: 3000, // Duration of each slide before it changes (in milliseconds)
    pauseOnHover: true, // Pause autoplay on hover
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  return (
    <div className="  w-[50%] text-center ">
      <Slider {...sliderSettings}>
        {testimonials.map((item, index) => (
          <div className="" key={index}>
            <div className="  flex flex-col items-center  justify-center gap-5  ">
              <img src={item?.image} alt="" className="" />
              <p className="text-lg font-semibold">
                Login to access the courses and materials
              </p>
              <p className="text-xs w-[80%] ">
                Create account and access of the courses, test and study
                materials
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LoginCarousel;
