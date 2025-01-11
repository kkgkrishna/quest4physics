import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Importing eye icons

interface CustomInputFieldPropTypes {
  label?: string;
  type?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string; // Optional with a default value
  labelClassName?: string; // Optional with a default value
  inputClassName?: string; // Optional with a default value
  outerClassName?: string; // Optional with a default value
  disabled?: boolean; // Optional with a default value
}

const CustomInputField = ({
  label,
  type,
  value,
  onChange,
  placeholder = "", // Default placeholder
  labelClassName = "", // Default label class
  inputClassName = "", // Default input class
  outerClassName = "", // Default outer class
  disabled = false, // Default disabled state
}: CustomInputFieldPropTypes) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={`mb-6 ${outerClassName}`}>
      {label && (
        <label
          className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type === "password" && isPasswordVisible ? "text" : type}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border rounded-lg shadow-lg focus:outline-none transition-all duration-200 ease-in-out sm:text-base ${
            disabled
              ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
              : "border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          } ${inputClassName}`}
          placeholder={placeholder}
          disabled={disabled}
          required
        />
        {type === "password" && !disabled && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center focus:outline-none"
          >
            {isPasswordVisible ? (
              <AiFillEyeInvisible className="text-gray-500 text-2xl" />
            ) : (
              <AiFillEye className="text-gray-500 text-2xl" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomInputField;
