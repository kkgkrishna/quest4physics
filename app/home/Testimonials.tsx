import React from "react";
import TestimonialCarousel from "./TestimonialCarousel";

function Testimonials() {
  return (
    <div className="w-full flex justify-center  bg-[rgb(106,100,241,0.1)] py-10 ">
      <div className=" w-[80%] lg:w-[70%] tablet:w-[80%] mx-auto flex flex-col gap-5">
        <div className="w-full flex justify-center">
          <p className="text-3xl  font-bold text-[#6A64F1] ">TESTIMONIALS</p>
        </div>
        <div className=" mt-10">
          <TestimonialCarousel />
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
