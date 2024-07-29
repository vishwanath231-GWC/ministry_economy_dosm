import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { RiArrowDropRightLine } from "react-icons/ri";
import "./style.css";

const HomePage = () => {
  return (
    <div className="home_background ">
      <div className="max-w-screen-xl mx-auto my-0 py-6 px-2">
        <img src={Logo} alt="Logo" className="large-logo mb-10" />
        <b className="text-6xl text-white ">
          Malaysia Tourism <br /> Dashboard
        </b>
        <Link to="/card" className="block w-fit bg-white p-2 rounded-full  mt-10">
          <RiArrowDropRightLine className="text-3xl text-[#FFBC2F]" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
