import React from "react";
import CourseCard from "./PopularCourseCard";

function PopularCourse() {
  const coursesData = [
    {
      title: "IIT - JEE",
      courses: [
        "Two-year Regular Integrated Classroom Programme",
        "Quest4Physics Apex/Spark Integrated Programme for IIT-JEE Main & Advanced",
      ],
    },
    {
      title: "NEET",
      courses: [
        "One-Year NEET Dropper/Repeater Classroom Programme",
        "Two-year Integrated Classroom Programme",
      ],
    },
    {
      title: "FOUNDATION",
      courses: ["Three-year Foundation course", "One-year Foundation course"],
    },
  ];

  return (
    <div className="w-full flex justify-center  bg-purple-50 py-10">
      <div className="w-[95%] lg:w-[70%] tablet:w-[80%] mx-auto flex flex-col gap-8 animate-fade-in">
        <div className="w-full text-center">
          <p className="text-4xl font-bold text-purple-500 animate-fade-in-down">
            POPULAR COURSES
          </p>
        </div>
        <div className="flex flex-col items-center md:flex-row lg:mt-8 gap-8 px-5 lg:px-0">
          {coursesData.map((courseItem, index: number) => (
            <CourseCard
              key={index}
              title={courseItem.title}
              courses={courseItem.courses}
              className={`animate-slide-in delay-${index * 100}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularCourse;
