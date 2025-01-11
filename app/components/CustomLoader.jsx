import React from "react";
import Loader from "react-js-loader";
const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-indigo-100/90 fixed top-0 left-0 z-50">
      <div className={"item"}>
        <Loader type="spinner-default" bgColor="#4F47E5" size={100} />
      </div>
    </div>
  );
};

export default CustomLoader;
