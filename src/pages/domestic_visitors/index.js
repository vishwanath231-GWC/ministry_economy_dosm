import React from "react";
import Navigation from "../../components/Navigation";
import "./style.css";
import { Link } from "react-router-dom";
const DomesticVisitors = () => {
  return (
    <div>
      <div className="domestic_bgs">
        <div className="max-w-screen-xl mx-auto my-0 h-screen py-6 px-5 relative">
          <div className="mb-6">
            <Navigation backLink="/domestic-tourism-homepage" />
          </div>
          <div className="text-white">
            <h2 className="uppercase text-xl font-bold">domestic tourism statistics </h2>
            <h5 className="uppercase text-sm font-medium">snapshot performance 2022</h5>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div></div>
            <div>
              <div className="max-w-sm mx-auto text-sm my-0 bg-white shadow-md rounded p-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="shadow-sm p-4 border border-gray-200 rounded">
                    <div className="font-medium">Excursionist</div>
                    <div className="mt-1 font-bold">106.5M</div>
                  </div>
                  <div className="shadow-sm p-4 border border-gray-200 rounded">
                    <div className="font-medium">Excursionist</div>
                    <div className="mt-1 font-bold">106.5M</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Link
                    to="/inbound-time-series"
                    className="bg-[#0E6EC5] text-white mt-5 rounded p-2 mt-5 block w-fit"
                  >
                    Number of Visitor - Time Series
                  </Link>
                </div>
                <div className="flex flex-col">
                  <Link
                    to="/inbound-time-series"
                    className="bg-[#0E6EC5] text-white mt-5 rounded p-2 mt-5 block w-fit"
                  >
                    Visitor by state visited - Time Series
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomesticVisitors;
