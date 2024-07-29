import React from "react";
import { GoHome } from "react-icons/go";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const Navigation = ({ backLink }) => {
  return (
    <div>
      <div className="w-fit flex items-center text-sm">
        <Link
          to="/"
          className="flex items-center shadow-lg rounded border border-[#0E6EC5] p-2 bg-white"
        >
          <GoHome />
          <div className="ml-2 text-medium">Home</div>
        </Link>
        <Link
          to={backLink}
          className="flex items-center shadow-lg border border-[#0E6EC5] rounded p-2 ml-3 bg-white"
        >
          <IoChevronBackOutline />
          <div className="ml-2 text-medium">Back</div>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
