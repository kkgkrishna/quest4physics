import React from "react";
import { FaGraduationCap } from "react-icons/fa";

interface PopularCourseCardPropTypes {
  title: string;
  courses: string[];
  className?: string; // Added className prop
}

const PopularCourseCard = ({
  title,
  courses,
  className = "",
}: PopularCourseCardPropTypes) => {
  return (
    <div
      className={`rounded-xl shadow-lg w-full lg:w-1/3 bg-gradient-to-r from-purple-50 to-purple-100 transition-transform transform hover:scale-105 hover:shadow-xl ${className}`}
    >
      {/* Header with medium purple color */}
      <div className="bg-gradient-to-r from-purple-200 to-purple-300 text-center py-4 rounded-t-xl">
        <h3 className="text-lg font-bold text-purple-700">{title}</h3>
      </div>

      {/* Programme List */}
      <div className="py-6 px-5 flex flex-col gap-4 min-h-[12rem]">
        {courses.map((course, index) => (
          <div key={index} className="flex gap-4 items-center">
            <FaGraduationCap className="text-purple-600 text-xl w-[1.5rem] animate-bounce" />
            <p className="text-purple-800 text-sm lg:text-base flex-1">
              {course}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-purple-200 mx-5" />

      {/* Check More Button */}
      <div className="text-center py-4">
        <button className="text-purple-600 font-semibold p-3 rounded-md hover:bg-purple-200 transition-colors animate-pulse">
          Check More
        </button>
      </div>
    </div>
  );
};

export default PopularCourseCard;
