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
          className="flex items-center shadow-sm rounded p-2 border border-gray-200 bg-gray-200"
        >
          <GoHome />
          <div className="ml-2 text-medium">Home</div>
        </Link>
        <Link
          to={backLink}
          className="flex items-center shadow-sm border border-gray-200 rounded p-2 ml-3"
        >
          <IoChevronBackOutline />
          <div className="ml-2 text-medium">Back</div>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
