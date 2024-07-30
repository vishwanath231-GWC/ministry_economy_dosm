import React from "react";
import Navigation from "../../components/Navigation";
import "./style.css";
import { Link } from "react-router-dom";
import { IoIosArrowRoundUp } from "react-icons/io";
const DomesticTourismHomePage = () => {
  return (
    <div>
      <div className="domestic_bg">
        <div className="max-w-screen-xl mx-auto my-0 h-screen py-6 px-5 relative">
          <div className="mb-6">
            <Navigation backLink="/card" />
          </div>
          <div>
            <h2 className="uppercase text-xl font-bold">domestic tourism statistics </h2>
            <h5 className="uppercase text-sm font-medium">snapshot performance 2022</h5>
          </div>
          <Link to="/domestic-visitors" className="absolute top-[170px] right-1/4">
            <div>
              <div className="font-medium">Domestic visitors (Million)</div>
              <div className="flex items-center">
                <div className="font-bold">171.6</div>
                <div className="flex items-center ml-3">
                  <IoIosArrowRoundUp className="text-green-700" />
                  <div className="text-medium">160%</div>
                </div>
              </div>
            </div>
          </Link>
          <Link className="absolute top-[260px] right-[100px]">
            <div>
              <div className="font-medium">Number of trips (Million)</div>
              <div className="flex items-center">
                <div className="font-bold">171.6</div>
                <div className="flex items-center ml-3">
                  <IoIosArrowRoundUp className="text-green-700" />
                  <div className="text-medium">160%</div>
                </div>
              </div>
            </div>
          </Link>
          <Link className="absolute bottom-[100px] right-[250px]">
            <div>
              <div className="font-medium">Total Expenditure (Million)</div>
              <div className="flex items-center">
                <div className="font-bold">171.6</div>
                <div className="flex items-center ml-3">
                  <IoIosArrowRoundUp className="text-green-700" />
                  <div className="text-medium">160%</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DomesticTourismHomePage;
