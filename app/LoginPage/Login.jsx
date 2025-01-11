import React, { useContext, useState } from "react";
import CustomBtn from "../../../CustomComponets/CustomBtn";
import { useStudentLoginMutation } from "../../../redux/ReduxToolkit";
import { enqueueSnackbar } from "notistack";
import { AuthContext } from "../../../Provider/AuthProvider";
import LoginCarousel from "./LoginCarousel";
import BrandLogo from "../../../BrandLogo/BrandLogo";
import CustomInputField from "../../../CustomComponets/CustomInputField";
import { WebConstant } from "../../../ConstantValue/WebConstant";
import SignUpPage from "../SignUp/SignUpPage";
import { AiFillCloseCircle } from "react-icons/ai";
import CustomLoader from "../../../CustomComponets/CustomLoader";

function Login({ popupAnimation, setShowLoginPopup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);

  const { login: setAccessToken } = useContext(AuthContext);

  const [studentLogin, { isLoading: studentLoginIsLoading }] =
    useStudentLoginMutation();

  function ValidateEmail(mail) {
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
      enqueueSnackbar("Email is required !", {
        autoHideDuration: 3000,
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
      return;
    }
    if (!ValidateEmail(email)) {
      enqueueSnackbar("Entered Email is incorrect !", {
        autoHideDuration: 3000,
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
      return;
    }
    if (!password) {
      enqueueSnackbar("Password is required !", {
        autoHideDuration: 3000,
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
      return;
    }

    try {
      const response = await studentLogin({
        body: { email: email?.toLowerCase(), password: password },
      });

      if (response.data) {
        setAccessToken(response.data?.serverResponse?.accessToken);
      } else {
        enqueueSnackbar(response?.error?.data?.message, {
          autoHideDuration: 3000,
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      }
    } catch (error) {
      console.log("Mutation Failed");
    }
  };

  return (
    <div className="bg-[rgba(128,128,128,.8)] w-full h-screen fixed top-0 left-0 z-50 rounded-md">
      {studentLoginIsLoading && <CustomLoader />}
      <div
        className={`bg-white h-[100vh] w-full lg:w-full tablet:w-[50%] 2sm:w-[60%] absolute left-0 right-0 mx-auto top-0 bottom-0 my-auto flex items-center justify-center lg:justify-between flex-col md:flex-row md:px-0 ${popupAnimation} relative transition-all duration-500 transform scale-90 opacity-0 animate-fadeInUp`}
      >
        {/* Login Carousel */}
        <div className="hidden lg:block tablet:hidden md:w-[60%]">
          <div className="bg-blue-100 p-5 h-screen flex justify-center items-center">
            <LoginCarousel />
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full md:w-[40%] tablet:w-full px-5 py-10 md:p-10 lg:px-20 flex justify-start flex-col items-start font-poppins">
          <AiFillCloseCircle
            className="cursor-pointer absolute top-5 right-5 text-4xl hover:scale-105 duration-300 hover:rotate-90 text-gray-500 hover:text-gray-700"
            onClick={() => setShowLoginPopup(false)}
          />
          <div className="flex flex-col gap-5 w-full">
            <div className="">
              <BrandLogo className="w-[13rem] -translate-x-2" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg font-medium">Welcome Back!</p>
              <p className="text-xs">Please login to access your account.</p>
            </div>
            <div className="">
              <CustomInputField
                label={`Email Id`}
                inputClassName={`!rounded !p-2 !text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200`}
                type={`email`}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomInputField
                type={`password`}
                label={`Password`}
                inputClassName={`!rounded !p-2 !text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200`}
                onChange={(e) => setPassword(e.target.value)}
              />

              <CustomBtn
                label={`Log in`}
                className="bg-indigo-600 text-white hover:border-indigo-600 hover:bg-indigo-500 !px-10 !rounded !border-none w-full transition-all duration-300 hover:scale-105"
                onClick={() => handleLogin()}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <b className="text-xs cursor-pointer text-indigo-600 hover:text-indigo-500 underline">
                Forget Password
              </b>
              <p className="text-xs">
                Don't have an Account?{" "}
                <b
                  className="cursor-pointer text-indigo-600 hover:text-indigo-500 underline"
                  onClick={() => setShowSignUpPopup(true)}
                >
                  Sign Up
                </b>
              </p>
            </div>
            {/* <div className="flex flex-col items-center text-xsm absolute bottom-2 left-0 right-0">
              <p>Having trouble?</p>
              <p>
                Write us on <b>{WebConstant?.HELP_EMAIL}</b>
              </p>
            </div> */}
          </div>
        </div>
      </div>
      {showSignUpPopup && (
        <SignUpPage
          setShowSignUpPopup={setShowSignUpPopup}
          setShowLoginPopup={setShowLoginPopup}
          popupAnimation="animate-wiggle"
        />
      )}
    </div>
  );
}

export default Login;
