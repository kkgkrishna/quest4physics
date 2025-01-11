import React from "react";

interface CustomBtnPropType {
  label?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const CustomBtn = ({
  label,
  onClick,
  className = "",
  disabled,
}: CustomBtnPropType) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined} // Use undefined instead of null
      disabled={disabled} // Apply disabled state
      className={`py-2.5 px-3 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out ${className} 
      ${disabled ? "!bg-gray-400 text-gray-500 cursor-not-allowed" : ""}`} // Style changes when disabled
    >
      {label}
    </button>
  );
};

export default CustomBtn;
