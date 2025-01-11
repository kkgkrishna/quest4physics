"use client";
import { FaMapMarkerAlt, FaRegCopyright } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import BrandLogo from "../components/BrandLogo";

// Array of links
const footerLinks = [
  { name: "Home", onClick: () => console.log("Home clicked") },
  { name: "About Us", onClick: () => console.log("About Us clicked") },
  { name: "Services", onClick: () => console.log("Services clicked") },
  { name: "Contact", onClick: () => console.log("Contact clicked") },
];

// Array of social media links
const socialLinks = [
  { name: "Facebook", onClick: () => console.log("Facebook clicked") },
  { name: "Twitter", onClick: () => console.log("Twitter clicked") },
  { name: "Instagram", onClick: () => console.log("Instagram clicked") },
];

const Footer = () => {
  const useFullLinkArray = [
    { title: "About Us", link: "/" },
    { title: "Why Quest4Physics", link: "/" },
    { title: "Return Policy", link: "/" },
    { title: "Terms & Condiations", link: "/" },
    { title: "Refund Policy", link: "/" },
  ];
  const studentAreaArray = [
    { title: "Iit - Jee", link: "/" },
    { title: "Neet", link: "/" },
    { title: "Foundation", link: "/" },
    { title: "Center", link: "/" },
  ];
  const contactArray = [
    {
      title:
        "Opposite Chowk Thana Naer Kangan Ghat, Jhauganj Patna City, Bihar, PIN-800008",
      icon: <FaMapMarkerAlt />,
    },
    { title: "+91 7292986896", icon: <FaPhone /> },
    { title: "support@quest4physics.com", icon: <MdEmail /> },
  ];
  return (
    <div className="w-full flex flex-col items-center border-[#191770]  ">
      <div className="w-[90%] lg:w-[70%] tablet:w-[80%] flex flex-col tablet:flex-row tablet:flex-wrap lg:flex-row gap-5 py-5  lg:px-0">
        <div className="w-full lg:w-1/4 tablet:w-[48%] ">
          <div className="flex flex-col gap-5 ">
            <BrandLogo className={`w-[10rem]`} />
            <p className="text-sm">
              Quest4Physics is India’s largest online learning platform.
              Download our apps to start learning.
            </p>
          </div>
        </div>{" "}
        <div className="w-full lg:w-1/4 tablet:w-[48%] ">
          <div className="flex flex-col gap-5">
            <p className="text-xl font-bold text-gray-600">Useful Links </p>
            <ul className="">
              {useFullLinkArray?.map((items, index) => (
                <li
                  key={index}
                  className={` cursor-pointer text-sm  py-1  font-medium  ${
                    index === 0 ? "mt-0" : "mt-3"
                  }`}
                >
                  {items?.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full lg:w-1/4 tablet:w-[48%] ">
          <div className="flex flex-col gap-5">
            <p className="text-xl font-bold text-gray-600 ">Student Area</p>
            <ul className="">
              {studentAreaArray?.map((items, index) => (
                <li
                  key={index}
                  className={` cursor-pointer text-sm  py-1  font-medium ${
                    index === 0 ? "mt-0" : "mt-3"
                  }`}
                >
                  {items?.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full lg:w-1/4 tablet:w-[48%] ">
          <div className="flex flex-col gap-5">
            <p className="text-xl font-bold text-gray-600 mb-2">Contact Us</p>
            <div className="flex flex-col gap-4">
              {contactArray?.map((items, index) => (
                <div className="flex items-start " key={index}>
                  <span className=" text-xl w-[1.5em]"> {items?.icon}</span>
                  <span className=" text-sm w-full">{items?.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-2 text-xs py-4 text-white bg-[#1a1771]">
        <FaRegCopyright />
        Copyright 2024 Quest4Physics. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
