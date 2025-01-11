"use client";
import React, { useState, useEffect } from "react";
import OTPInput from "react-otp-input";

import CustomBtn from "../components/CustomBtn";
import CustomLoader from "../components/CustomLoader";
import LoginCarousel from "../login/LoginCarousel";
import BrandLogo from "../components/BrandLogo";
import CustomInputField from "../components/CustomInputField";
import { WebConstant } from "../components/WebConstant";
import { useRouter } from "next/navigation";
import {
  useGenerateOtpMutation,
  useRegisterUserMutation,
  useVerifyOtpMutation,
} from "../store/api";

function SignUpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState<any>();
  const [password, setPassword] = useState("");
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [canResendOtp, setCanResendOtp] = useState(false);

  const [messageBox, setMessageBox] = useState<any>({
    isError: false,
    isSuccess: false,
    message: "",
  });

  const [
    generateOtp,
    { isLoading: generateOtpIsLoading, isError: generateOtpIsError },
  ] = useGenerateOtpMutation();

  const [verfyOtp, { isLoading: verfyOtpIsLoading }] = useVerifyOtpMutation();

  const [registerUser, { isLoading: registerUserIsloading }] =
    useRegisterUserMutation();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isOtpRequested && timer > 0) {
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
  }, [isOtpRequested, timer]);

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleGenerateOtp = async () => {
    if (!email) {
      setMessageBox({
        message: `Email is required !`,
        isError: true,
      });
      return;
    }
    if (!ValidateEmail(email)) {
      setMessageBox({
        message: `Entered Email is incorrect !`,
        isError: true,
      });
      return;
    }

    try {
      const response = await generateOtp({
        body: { email: email?.toLowerCase() },
      });
      if (response.data) {
        setIsOtpRequested(true);
        setTimer(120); // Reset timer
        setCanResendOtp(false);
        setMessageBox({
          message: `We have sent an OTP to ${email}`,
          isSuccess: true,
        });
      } else {
        setMessageBox({
          message: (response?.error as any)?.data?.msg,
          isError: true,
        });
      }
    } catch (error) {
      console.log("Mutation Failed");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      setMessageBox({
        message: "OTP must be 6 digits long.",
        isError: true,
      });
      return;
    }
    try {
      const response = await verfyOtp({
        body: { email: email?.toLowerCase(), otp: otp },
      });
      if (response.data) {
        setIsSignUpForm(true);
      } else {
        setMessageBox({
          message: (response?.error as any)?.data?.msg,
          isError: true,
        });
      }
    } catch (error) {
      console.log("Mutation Failed");
    }
  };

  const handleRegisterUser = async () => {
    if (!firstName) {
      setMessageBox({
        message: "First Name is required !",
        isError: true,
      });
      return;
    }
    if (!lastName) {
      setMessageBox({
        message: "Last Name is required !",
        isError: true,
      });
      return;
    }
    if (!mobile) {
      setMessageBox({
        message: "Mobile Number is required !",
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
      const response = await registerUser({
        body: {
          profile: {
            firstName: firstName,
            lastName: lastName,
            mobile: parseInt(mobile),
          },
          email: email.toLowerCase(),
          password: password,
        },
      });
      if (response.data) {
        setIsOtpRequested(false);
        setFirstName("");
        setLastName("");
        setPassword("");
        setEmail("");
        router.push("/login");
      } else {
        setMessageBox({
          message: (response?.error as any)?.data?.message,
          isError: true,
        });
      }
    } catch (error) {
      console.log("Mutation Failed");
    }
  };

  return (
    <div className="bg-[rgba(128,128,128,.8)] w-full h-screen fixed top-0 left-0 z-50 rounded-md">
      {(generateOtpIsLoading || verfyOtpIsLoading || registerUserIsloading) && (
        <CustomLoader />
      )}
      <div
        className={`bg-white h-[100vh] w-full lg:w-full tablet:w-[50%] 2sm:w-[60%]  left-0 right-0 mx-auto top-0 bottom-0 my-auto flex items-center justify-between flex-col md:flex-row md:px-0 relative`}
      >
        <div className="hidden lg:block tablet:hidden md:w-[60%]">
          <div className="bg-blue-100 p-5 h-screen flex justify-center items-center">
            <LoginCarousel />
          </div>
        </div>

        <div className="w-full md:w-[40%]  h-[100vh] tablet:w-full px-5 py-10 md:p-10 lg:px-20 flex justify-start md:justify-center flex-col items-start font-poppins relative">
          <div className="flex flex-col gap-5 w-full">
            <div className="">
              <BrandLogo className={`w-[13rem] -translate-x-2`} />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg font-medium">Registration here</p>
            </div>

            {(messageBox?.isError || messageBox?.isSuccess) && (
              <p
                className={`text-sm p-2 rounded-md mt-5 ${
                  messageBox?.isError ? "bg-red-400/20 text-red-900" : ""
                } ${
                  messageBox?.isSuccess ? "text-green-900 bg-green-400/20" : ""
                }`}
              >
                {messageBox?.message}
              </p>
            )}

            {!isOtpRequested && (
              <div className="">
                <CustomInputField
                  label={`Email Id`}
                  inputClassName={`!rounded !p-2 !text-sm shadow`}
                  type={`email`}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessageBox({
                      isError: false,
                      isSuccess: false,
                      message: "",
                    });
                  }}
                  outerClassName={`!mb-2`}
                />
                <p className="mb-10 text-xs">
                  We'll send an OTP for verification
                </p>

                <CustomBtn
                  label={`Request OTP`}
                  className="bg-indigo-600 text-white hover:border-indigo-600 hover:bg-indigo-500 !px-10 !rounded !border-none w-full"
                  onClick={() => handleGenerateOtp()}
                />
              </div>
            )}

            {!isSignUpForm && isOtpRequested && (
              <div className="flex flex-col gap-5 my-5">
                <div className="flex flex-col items-center gap-3">
                  <OTPInput
                    value={otp}
                    onChange={(otpValue) => {
                      setOtp(otpValue);
                      setMessageBox({
                        isError: false,
                        isSuccess: false,
                        message: "",
                      });
                    }}
                    inputStyle={{ width: "100%" }}
                    numInputs={6}
                    renderSeparator={<span></span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="border border-black rounded-md px-2 mx-1 h-[3rem]"
                      />
                    )}
                  />
                  <div className="text-sm text-gray-600">
                    Time remaining: {formatTime(timer)}
                  </div>
                  {canResendOtp && (
                    <button
                      onClick={handleGenerateOtp}
                      className="text-indigo-600 text-sm hover:text-indigo-800"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
                <CustomBtn
                  label={`Verify OTP`}
                  className="bg-indigo-600 text-white hover:border-indigo-600 hover:bg-indigo-500 !px-10 !rounded !border-none w-full"
                  onClick={() => handleVerifyOtp()}
                  disabled={timer === 0}
                />
              </div>
            )}

            {isSignUpForm && (
              <div className="flex flex-col">
                <div className="">
                  <CustomInputField
                    label={`Email Id`}
                    inputClassName={`!rounded !p-2 !text-sm`}
                    labelClassName={`mb-1`}
                    outerClassName={`!mb-3`}
                    type={`email`}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setMessageBox({
                        isError: false,
                        isSuccess: false,
                        message: "",
                      });
                    }}
                    value={email}
                    disabled={true}
                  />
                  <CustomInputField
                    label={`First Name`}
                    inputClassName={`!rounded !p-2 !text-sm`}
                    labelClassName={`mb-1`}
                    outerClassName={`!mb-3`}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setMessageBox({
                        isError: false,
                        isSuccess: false,
                        message: "",
                      });
                    }}
                  />
                  <CustomInputField
                    label={`Last Name`}
                    inputClassName={`!rounded !p-2 !text-sm`}
                    labelClassName={`mb-1`}
                    outerClassName={`!mb-3`}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setMessageBox({
                        isError: false,
                        isSuccess: false,
                        message: "",
                      });
                    }}
                  />
                  <CustomInputField
                    label={`Mobile No.`}
                    type={`number`}
                    inputClassName={`!rounded !p-2 !text-sm`}
                    labelClassName={`mb-1`}
                    outerClassName={`!mb-3`}
                    onChange={(e) => {
                      setMobile(e.target.value);
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
                    labelClassName={`mb-1`}
                    outerClassName={`!mb-3`}
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
                    label={`Sign up`}
                    className="bg-indigo-600 text-white hover:border-indigo-600 hover:bg-indigo-500 !px-10 !rounded !border-none w-full"
                    onClick={() => handleRegisterUser()}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col items-center gap-2">
              <p className="text-xs">
                Already have an account?
                <b
                  className="cursor-pointer text-indigo-600 hover:text-indigo-500 underline ms-1"
                  onClick={() => {
                    router.push("/login");
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
      </div>
    </div>
  );
}

export default SignUpPage;
