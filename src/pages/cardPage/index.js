import React from "react";
import { LuPlane } from "react-icons/lu";
import { TbWorld } from "react-icons/tb";
import "./style.css";
import { Link } from "react-router-dom";
const CardPage = () => {
  return (
    <div>
      <div className="about-background">
        <div className="max-w-screen-xl mx-auto my-0 py-6 px-2">
          <b className="gradient-text text-6xl w-10 mt-24">
            MALAYSIA <br /> TOURISM
          </b>
          <div className="grid grid-cols-4 gap-4 mt-10 mr-5">
            <div>
              <div className="bg-red-700 w-24 h-2 border-b-0 border-red-900 mt-9"></div>
              <div className="text-sm mt-11 text-justify">
                <p>
                  Malaysia, a vibrant Southeast Asian nation, offers an array of attractions ranging
                  from pristine beaches and lush rainforests to bustling cities and cultural
                  landmarks. Its rich cultural heritage, delectable cuisine, and hospitable locals
                  make it a captivating destination for travelers worldwide.
                </p>
              </div>
            </div>
            <Link to="/key-metric" className="border-b-0 bg-white p-4 rounded-lg">
              <div className="mb-4">
                <TbWorld className="text-3xl text-[#FFBC2F]" />
              </div>
              <h1 className="text-xl font-bold mb-2 text-indigo-700">TOURISM SATELLITE ACCOUNT</h1>
              <p className="text-justify text-sm">
                Tourism Satellite Analysis involves the systematic assessment of tourisms economic
                impact, utilizing data to gauge its contributions to GDP, employment, and foreign
                exchange earnings. This method enables precise measurement and strategic planning
                for sustainable tourism development
              </p>
            </Link>
            <div className="border-b-0 bg-white p-4 rounded-lg">
              <div className="mb-4">
                <LuPlane className="text-3xl text-[#FFBC2F]" />
              </div>
              <h1 className="text-xl font-bold mb-2 text-indigo-700">
                DOMESTIC TOURISM STATISTICS
              </h1>
              <p className="text-justify text-sm">
                Analyzing domestic tourism statistics involves examining travel patterns,
                expenditures, and demographic data to understand the behavior and preferences of
                tourists. This analysis helps in identifying trends, forecasting demand, and
                formulating strategies to boost the tourism industry.
              </p>
            </div>
            <div className="border-b-0 bg-white p-4 rounded-lg">
              <div className="mb-4">
                <LuPlane className="text-3xl text-[#FFBC2F]" />
              </div>
              <h1 className="text-xl font-bold mb-2 text-indigo-700">
                TOURISM MALAYSIA STATISTICS
              </h1>
              <p className="text-justify text-sm">
                Analyzing Malaysia tourism statistics aids in understanding visitor trends, economic
                impact, and the effectiveness of marketing strategies. This data-driven approach in
                in planning and improving tourism infrastructure and services to boost visitor
                satisfaction and industry growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
