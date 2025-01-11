"use client"
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ayushi from "../../public/assets/TestimonialImage/ayushi.png";
import manyaSinha from "../../public/assets/TestimonialImage/manyaSinha.png";
import raj from "../../public/assets/TestimonialImage/Raj_Jaiswal.png";
import anshu from "../../public/assets/TestimonialImage/Anshu.png";
import sakshi from "../../public/assets/TestimonialImage/Sakshi.png";
import Image from "next/image";

const TestimonialCarousel = () => {
  // Sample data (you can add more cards here)
  const testimonials = [
    {
      name: "Ayushideep",
      rank: "AIR-3",
      exam: "JEE ADV 2024",
      testimonial: `Hi, I’m B. Sandesh. I have secured AIR 3 in JEE Advanced 2024. My dream was to get into IIT since 8th Class. Thanks to Narayana, I’m able to achieve that. The nLearn app helped me tremendously with its modules, tests, timely analysis and doubt lessons.`,
      image: ayushi, // Replace with actual image path
    },
    {
      name: "Raj Jaiswal",
      rank: "AIR-7",
      exam: "JEE ADV 2024",
      testimonial: `I am Student B and nLearn helped me immensely with exam preparation.`,
      image: raj, // Replace with actual image path
    },
    {
      name: "Sakshi",
      rank: "AIR-10",
      exam: "JEE ADV 2024",
      testimonial: `Student C's testimonial goes here... Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi inventore ex sunt nulla voluptas vel, dolores exercitationem tenetur amet, voluptate ea reiciendis, quia quasi perferendis molestiae sit sed architecto error!`,
      image: sakshi, // Replace with actual image path
    },
    {
      name: "Anshu",
      rank: "AIR-10",
      exam: "JEE ADV 2024",
      testimonial: `Student C's testimonial goes here... Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi inventore ex sunt nulla voluptas vel, dolores exercitationem tenetur amet, voluptate ea reiciendis, quia quasi perferendis molestiae sit sed architecto error!`,
      image: anshu, // Replace with actual image path
    },
    {
      name: "Manya Sinha",
      rank: "AIR-10",
      exam: "JEE ADV 2024",
      testimonial: `Student C's testimonial goes here... Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi inventore ex sunt nulla voluptas vel, dolores exercitationem tenetur amet, voluptate ea reiciendis, quia quasi perferendis molestiae sit sed architecto error!`,
      image: manyaSinha, // Replace with actual image path
    },
  ];
  const sliderSettings = {
    dots: false, // Disable dots for a cleaner look
    infinite: true, // Infinite scroll
    speed: 500, // Transition speed
    slidesToShow: 3, // Show 2 cards at a time
    slidesToScroll: 1, // Scroll 1 card at a time
    arrows: true, // Show navigation arrows
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
    <div className="w-full">
      <Slider {...sliderSettings}>
        {testimonials.map((item, index) => (
          <div key={index} className="px-2">
            <div className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center justify-between h-[25rem]">
              <div className="flex flex-col ">
                {/* Student image */}
                <div className="flex gap-5 items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-full mb-4 border border-gray-400 p-1 "
                  />
                  {/* Rank and exam details */}
                  <div className="flex flex-col gap-5">
                    <h2 className="text-orange-600 text-3xl font-bold">
                      {item.rank}
                    </h2>
                    <h4 className="text-gray-600 text-lg mb-2">{item.exam}</h4>
                  </div>
                </div>
                {/* Student name */}
                <div className="flex flex-col ">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">
                    {item.name}
                  </h3>
                  {/* Testimonial */}
                  <p className="text-gray-700 text-xs leading-relaxed ">
                    {item.testimonial}
                  </p>
                </div>
              </div>
              {/* Spacer div to push content evenly */}
              <div className="h-8"></div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;
