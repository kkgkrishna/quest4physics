import React from "react";
import { TbProgress } from "react-icons/tb";
function CustomLoader() {
  return (
    <div className="h-screen w-screen z-50 fixed top-0 left-0 bg-gray-800/50 flex justify-center items-center">
      <TbProgress className="animate-spin text-[#2e25a5] size-16 md:size-24 transition-all  z-50" />
    </div>
  );
}

export default CustomLoader;
