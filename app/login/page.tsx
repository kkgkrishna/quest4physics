"use client";
import React, { useContext, useEffect, useState } from "react";
import LoginCarousel from "./LoginCarousel";
import { AiFillCloseCircle } from "react-icons/ai";
import BrandLogo from "../components/BrandLogo";
import CustomInputField from "../components/CustomInputField";
import CustomBtn from "../components/CustomBtn";
import { WebConstant } from "../components/WebConstant";
import { useRouter } from "next/navigation";
import {
  useSendResetPasswordLinkMutation,
  useStudentLoginMutation,
} from "../store/api";
import CustomLoader from "../components/CustomLoader";

function StudentLogin() {
  const router = useRouter();
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [startForgerPasswordTimer, setStartForgetPasswordTimer] =
    useState(false);
  const [timer, setTimer] = useState(900); // 2 minutes in seconds
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageBox, setMessageBox] = useState<any>({
    isError: false,
    isSuccess: false,
    message: "",
  });

  // const { login: setAccessToken } = useContext(AuthContext);

  const [studentLogin, { isLoading: studentLoginIsLoading }] =
    useStudentLoginMutation();

  const [sendResetPasswordLink, { isLoading: sendResetPasswordLinkIsLoading }] =
    useSendResetPasswordLinkMutation();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (startForgerPasswordTimer && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            setCanResendOtp(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [startForgerPasswordTimer, timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  function ValidateEmail(mail: string) {
    if (
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  }

  const handleLogin = async () => {
    if (!email) {
      setMessageBox({
        message: "Email is required !",
        isError: true,
      });
      return;
    }
    if (!ValidateEmail(email)) {
      setMessageBox({
        message: "Entered Email is incorrect !",
        isError: true,
      });
      return;
    }
    if (!password) {
      setMessageBox({
        message: "Password is required !",
        isError: true,
      });
      return;
    }

    try {
      const response = await studentLogin({
        body: { email: email?.toLowerCase(), password: password },
      });
      // console.log(response?.error?.data?.message);

      if (response.data) {
        // setAccessToken(response.data?.serverResponse?.accessToken);
        router.push("/");
      } else {
        // setErrorMessage("Login failed. Please try again.");

        setMessageBox({
          message: (response?.error as any)?.data?.message,
          isError: true,
        });
      }
    } catch (error) {
      // setErrorMessage("Something went wrong.");
      console.log("Mutation Failed");
    }
  };

  const handleSendResetPasswordLink = async () => {
    if (!email || email.length === 0) {
      setMessageBox({
        message: "Email is required !",
        isError: true,
      });
      return;
    }

    if (!ValidateEmail(email)) {
      setMessageBox({
        message: "Entered email is incorrect !",
        isError: true,
      });
      return;
    }

    try {
      const response = await sendResetPasswordLink({ body: { email } });

      if (response) {
        console.log(response?.data?.message);
        setMessageBox({
          message: `${response?.data?.message} this ${email}`,
          isSuccess: true,
        });
        setTimer(900);
        setCanResendOtp(false);
        setStartForgetPasswordTimer(true);
      }
    } catch (error) {
      // enqueueSnackbar(
      //   error?.response?.data?.message || "Failed to send reset password link.",
      //   {
      //     autoHideDuration: 3000,
      //     variant: "error",
      //     anchorOrigin: { horizontal: "right", vertical: "top" },
      //   }
      // );
      console.log("Mutation Error", error);
    }
  };

  return (
    <div className="bg-[rgba(128,128,128,.8)] w-full h-screen fixed top-0 left-0 z-50 rounded-md ">
      {(studentLoginIsLoading || sendResetPasswordLinkIsLoading) && (
        <CustomLoader />
      )}
      <div
        className={`bg-white h-[100vh] w-full   lg:w-full tablet:w-[50%] 2sm:w-[60%]  left-0 right-0 mx-auto top-0 bottom-0 my-auto   flex items-center justify-center lg:justify-between flex-col md:flex-row  md:px-0  relative`}
      >
        <div className="hidden lg:block tablet:hidden md:w-[60%] ">
          <div className="  bg-blue-100 p-5 h-screen flex justify-center items-center">
            <LoginCarousel />
          </div>
        </div>
        {!showForgetPassword && (
          <div className="w-full h-[100dvh] md:w-[40%]  tablet:w-full px-5 py-10 md:p-10 lg:px-20 flex justify-start md:justify-center flex-col items-start font-poppins relative">
            <div className="flex flex-col gap-5  w-full">
              <div className="">
                <BrandLogo className={`w-[13rem] -translate-x-2`} />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-lg font-medium">Wellcome Back !</p>
                <p className="text-xs">Please login to access your account.</p>
              </div>

              {(messageBox?.isError || messageBox?.isSuccess) && (
                <p
                  className={`text-sm p-2 rounded-md mt-5 ${
                    messageBox?.isError ? "bg-red-400/20 text-red-900" : ""
                  } ${
                    messageBox?.isSuccess
                      ? "text-green-900 bg-green-400/20"
                      : ""
                  }`}
                >
                  {messageBox?.message}
                </p>
              )}
              <div className="">
                <CustomInputField
                  label={`Email Id`}
                  inputClassName={`!rounded !p-2 !text-sm`}
                  type={`email`}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessageBox({
                      isError: false,
                      isSuccess: false,
                      message: "",
                    });
                  }}
                />
                <CustomInputField
                  type={`password`}
                  label={`Password`}
                  inputClassName={`!rounded !p-2 !text-sm`}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessageBox({
                      isError: false,
                      isSuccess: false,
                      message: "",
                    });
                  }}
                />

                <CustomBtn
                  label={`Log in`}
                  className="bg-indigo-600 text-white hover:border-indigo-600 hover:bg-indigo-500 !px-10 !rounded !border-none w-full"
                  onClick={() => handleLogin()}
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <b
                  className="text-xs cursor-pointer text-indigo-600 hover:text-indigo-500 underline"
                  // onClick={() => router.push("/password-reset")}
                  onClick={() => setShowForgetPassword(true)}
                >
                  Forget Password
                </b>
                <p className="text-xs">
                  Don't have an Account ?{" "}
                  <b
                    className=" cursor-pointer text-indigo-600 hover:text-indigo-500 underline "
                    onClick={() => router.push("/register")}
                  >
                    Sign Up
                  </b>
                </p>
              </div>
              <div className="flex flex-col items-center text-xs absolute bottom-2 left-0 right-0">
                <p className="">Having trouble?</p>
                <p className="">
                  Write us on <b>{WebConstant?.HELP_EMAIL}</b>
                </p>
              </div>
            </div>
          </div>
        )}
        {showForgetPassword && (
          <div className="w-full h-[100dvh] lg:w-[40%] px-5 py-10 md:p-10 lg:px-20 flex justify-start md:justify-center flex-col items-start font-poppins relative">
            <div className="flex flex-col gap-5  w-full">
              <div className="">
                <BrandLogo className={`w-[13rem] -translate-x-2`} />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-lg font-medium">Forget Password!</p>
                <p className="text-xs">
                  Please Enter your Phone number for the verification process.
                </p>
              </div>

              {(messageBox?.isError || messageBox?.isSuccess) && (
                <p
                  className={`text-sm p-2 rounded-md mt-5 ${
                    messageBox?.isError ? "bg-red-400/20 text-red-900" : ""
                  } ${
                    messageBox?.isSuccess
                      ? "text-green-900 bg-green-400/20"
                      : ""
                  }`}
                >
                  {messageBox?.message}
                </p>
              )}
              <div className="">
                <CustomInputField
                  label={`Email Id`}
                  inputClassName={`!rounded !p-2 !text-sm`}
                  type={`email`}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessageBox({
                      isError: false,
                      isSuccess: false,
                      message: "",
                    });
                  }}
                />
                {startForgerPasswordTimer && (
                  <>
                    {timer > 0 && (
                      <div className="text-sm text-red-600 font-bold  mb-5 text-center ">
                        Link Expire at : {formatTime(timer)}
                      </div>
                    )}

                    <CustomBtn
                      label={`Send Reset Password Link`}
                      className="bg-indigo-600 text-white hover:border-indigo-600 hover:bg-indigo-500 !px-10 !rounded !border-none w-full"
                      onClick={() => handleSendResetPasswordLink()}
                      disabled={timer > 0}
                    />
                  </>
                )}

                {!startForgerPasswordTimer && (
                  <CustomBtn
                    label={`Send Reset Password Link`}
                    className="bg-indigo-600 text-white hover:border-indigo-600 hover:bg-indigo-500 !px-10 !rounded !border-none w-full"
                    onClick={() => handleSendResetPasswordLink()}
                  />
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                {/* <b
                  className="text-xs cursor-pointer text-indigo-600 hover:text-indigo-500 underline"
                  // onClick={() => router.push("/password-reset")}
                  onClick={() => setShowForgetPassword(true)}
                >
                  Forget Password
                </b> */}

                <p className="text-xs">
                  Don't have an Account ?{" "}
                  <b
                    className=" cursor-pointer text-indigo-600 hover:text-indigo-500 underline "
                    onClick={() => router.push("/register")}
                  >
                    Sign Up
                  </b>
                </p>
                <p className="text-xs">
                  Already have an account?
                  <b
                    className="cursor-pointer text-indigo-600 hover:text-indigo-500 underline ms-1"
                    onClick={() => {
                      setShowForgetPassword(false);
                    }}
                  >
                    Log In
                  </b>
                </p>
              </div>
              <div className="flex flex-col items-center text-xs absolute bottom-2 left-0 right-0">
                <p className="">Having trouble?</p>
                <p className="">
                  Write us on <b>{WebConstant?.HELP_EMAIL}</b>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* {showSignUpPopup && (
        <SignUpPage
          setShowSignUpPopup={setShowSignUpPopup}
          setShowLoginPopup={setShowLoginPopup}
          popupAnimation="animate-wiggle"
        />
      )} */}
    </div>
  );
}

export default StudentLogin;
