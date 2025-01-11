"use client";
import React, { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import BrandLogo from "../components/BrandLogo";
import CustomBtn from "../components/CustomBtn";
import { useResetPasswordMutation } from "../store/api";
import { useRouter } from "next/navigation";
import CustomInputField from "../components/CustomInputField";

function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [messageBox, setMessageBox] = useState<any>({
    isError: false,
    isSuccess: false,
    message: "",
  });

  const [resetPassword, { isLoading: resetPasswordIsLoading }] =
    useResetPasswordMutation();

  useEffect(() => {
    const getIdFromURL = (search: any) => {
      const params = new URLSearchParams(search);
      return params.get("id");
    };

    const idFromURL = getIdFromURL(location.search);
    if (idFromURL) {
      setToken(idFromURL);
    }
  }, []);

  // Password validation function
  const validatePassword = (pass: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    if (pass.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const error = validatePassword(newPassword);
    setPasswordError(error);
    setMessageBox({
      isError: false,
      isSuccess: false,
      message: "",
    });
  };

  const handleResetPassword = async () => {
    // Reset any previous messages
    setMessageBox({
      isError: false,
      isSuccess: false,
      message: "",
    });

    // Validate password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessageBox({
        isError: true,
        message: "Passwords do not match",
      });
      return;
    }

    // Check if password is empty
    if (!password || password.length === 0) {
      setMessageBox({
        isError: true,
        message: "New password is required",
      });
      return;
    }

    try {
      const response = await resetPassword({
        body: {
          token: token,
          newPassword: password,
        },
      });

      if (response?.data) {
        router.push("/");

        // enqueueSnackbar(response?.data?.message, {
        //   autoHideDuration: 3000,
        //   variant: "success",
        //   anchorOrigin: { horizontal: "right", vertical: "top" },
        // });
        // setTimeout(() => {}, 3000);
      }
      if (response?.error) {
        setMessageBox({
          isError: true,
          message: (response?.error as any)?.data?.message,
        });
      }
    } catch (error) {
      console.log("Mutation Error", error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#4F45E4]/20">
      {resetPasswordIsLoading && <CustomLoader />}

      <div className="flex items-start flex-col gap-5 w-[90%] md:w-[25rem] bg-white p-5 rounded-2xl shadow-no-border-shadow">
        <div className="">
          <BrandLogo className={`w-[13rem] -translate-x-2`} />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg font-medium">Reset Your Password</p>
        </div>

        {(messageBox?.isError || messageBox?.isSuccess) && (
          <p
            className={`w-full text-sm p-2 rounded-md mt-5 ${
              messageBox?.isError ? "bg-red-400/20 text-red-900" : ""
            } ${messageBox?.isSuccess ? "text-green-900 bg-green-400/20" : ""}`}
          >
            {messageBox?.message}
          </p>
        )}

        <div className="sm:col-span-3 w-full">
          <div className="relative">
            <CustomInputField
              type={showPassword ? "text" : "password"}
              label={`New Password`}
              inputClassName={`!rounded !p-2 !text-sm pr-10`}
              labelClassName={`mb-1`}
              outerClassName={`!mb-3`}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 text-xs mt-1 mb-2">{passwordError}</p>
          )}

          <div className="relative">
            <CustomInputField
              type={showConfirmPassword ? "text" : "password"}
              label={`Confirm New Password`}
              inputClassName={`!rounded !p-2 !text-sm pr-10`}
              labelClassName={`mb-1`}
              outerClassName={`!mb-3`}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {/* {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} */}
            </button>
          </div>
        </div>

        <CustomBtn
          label={`Reset Password`}
          className="bg-indigo-600 text-white hover:border-indigo-600 hover:bg-indigo-500 !px-10 !rounded !border-none w-full"
          onClick={handleResetPassword}
          disabled={!!passwordError || !password || !confirmPassword}
        />
      </div>
    </div>
  );
}

export default ResetPasswordScreen;
