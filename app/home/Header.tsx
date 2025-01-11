"use client";
import React, { useState, useEffect } from "react";

import BrandLogo from "@/app/components/BrandLogo";
import { useRouter } from "next/navigation";
import CustomBtn from "../components/CustomBtn";

function Header() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Disable scrolling when popup is visible
    if (showLoginPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }

    // Cleanup when component unmounts or popup closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLoginPopup]);

  return (
    <header className="bg-white w-full flex justify-center animate-fadeIn">
      <div className="w-[95%] lg:w-[70%] tablet:w-[80%] py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800 cursor-pointer transform transition-transform hover:scale-105">
          <BrandLogo className={`w-[10rem]`} />
        </div>
        <div className="flex items-center gap-5">
          {/* Log In Button */}
          <CustomBtn
            label={`Log in`}
            className="bg-indigo-600 text-white hover:border-indigo-600 hover:text-indigo-600 hover:bg-white !px-10 !rounded-full transform transition-transform hover:scale-110"
            onClick={() => {
              router.push("/login");
            }}
          />
        </div>
      </div>

      {/* {showLoginPopup && (
        <Login
          popupAnimation="animate-wiggle"
          setShowLoginPopup={setShowLoginPopup}
        />
      )} */}
    </header>
  );
}

export default Header;
