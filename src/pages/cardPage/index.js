import React from "react";
import { Link } from "react-router-dom";
import { CgPerformance } from "react-icons/cg";
import { IoCameraOutline } from "react-icons/io5";
import { LuPlane, LuFlower } from "react-icons/lu";
import domo from "ryuu.js";
import "./style.css";

const CardPage = () => {

  // Function to handle navigation
  const handleNavigate = (url) => {
    domo.navigate(url, false);
  };

  return (
    <div>
      <div className="about-background">
        <div className="max-w-screen-xl mx-auto my-0 py-4 px-2">
          <b className="gradient-text text-6xl w-10 mt-20">
            MALAYSIA <br /> TOURISM
          </b>
          <div className="grid grid-cols-4 gap-4 mt-2 mr-5">
            <div className="col-span-1">
              <div className="bg-red-700 w-24 h-2 border-b-0 border-red-900 mt-9"></div>
              <div className="text-sm mt-11 text-justify font-medium">
                <p>
                  Malaysia, a vibrant Southeast Asian nation, offers an array of attractions ranging
                  from pristine beaches and lush rainforests to bustling cities and cultural
                  landmarks. Its rich cultural heritage, delectable cuisine, and hospitable locals
                  make it a captivating destination for travelers worldwide.
                </p>
              </div>
            </div>
            <div className="col-span-3 gap-2 grid grid-cols-2">
              <div className="border-b-0 bg-white p-4 rounded-lg">
                <div className="mb-2 flex">
                  <LuPlane className="mr-2 text-3xl text-[#FFBC2F]" />
                  <Link to="/key-metric">
                    <h1 className="text-xl font-bold mb-2 text-indigo-700">
                      TOURISM SATELLITE ACCOUNT
                    </h1>
                  </Link>
                </div>
                <p className="text-justify text-sm font-medium">
                  Tourism Satellite Analysis involves the systematic assessment of tourism's economic
                  impact, utilizing data to gauge its contributions to GDP, employment, and foreign
                  exchange earnings. This method enables precise measurement and strategic planning
                  for sustainable tourism development.
                </p>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-yellow-500 to-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => handleNavigate('https://gwcteq-partner.domo.com/app-studio/1796944236/pages/2109403124')}
                >
                  Explore
                </button>
              </div>
              <div className="border-b-0 bg-white p-4 rounded-lg">
                <div className="mb-2 flex">
                  <IoCameraOutline className="mr-2 text-3xl text-[#FFBC2F]" />
                  <Link to="/domestic-tourism-homepage">
                    <h1 className="text-xl font-bold mb-2 text-indigo-700">
                      DOMESTIC TOURISM STATISTICS
                    </h1>
                  </Link>
                </div>
                <p className="text-justify text-sm font-medium">
                  Analyzing domestic tourism statistics involves examining travel patterns,
                  expenditures, and demographic data to understand the behavior and preferences of
                  tourists. This analysis helps in identifying trends, forecasting demand, and
                  formulating strategies to boost the tourism industry.
                </p>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-yellow-500 to-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => handleNavigate('https://gwcteq-partner.domo.com/app-studio/1796944236/pages/2055071573')}
                >
                  Explore
                </button>
              </div>
              <div className="border-b-0 bg-white p-4 rounded-lg">
                <div className="mb-2 flex">
                  <LuFlower className="mr-2 text-3xl text-[#FFBC2F]" />
                  <h1 className="text-xl font-bold mb-2 text-indigo-700">
                    TOURISM MALAYSIA STATISTICS
                  </h1>
                </div>
                <p className="text-justify text-sm font-medium">
                  Analyzing Malaysia tourism statistics aids in understanding visitor trends, economic
                  impact, and the effectiveness of marketing strategies. This data-driven approach
                  assists in planning and improving tourism infrastructure and services to boost visitor
                  satisfaction and industry growth.
                </p>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-yellow-500 to-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => handleNavigate('https://gwcteq-partner.domo.com/app-studio/1796944236/pages/2133914494')}
                >
                  Explore
                </button>
              </div>
              <div className="border-b-0 bg-white p-4 rounded-lg">
                <div className="mb-2 flex">
                  <CgPerformance className="mr-2 text-3xl text-[#FFBC2F]" />
                  <h1 className="text-xl font-bold mb-2 text-indigo-700">
                    Global and Tourism Performance
                  </h1>
                </div>
                <p className="text-justify text-sm font-medium">
                  Analyzing Malaysia tourism statistics aids in understanding visitor trends, economic
                  impact, and the effectiveness of marketing strategies. This data-driven approach
                  assists in planning and improving tourism infrastructure and services to boost visitor
                  satisfaction and industry growth.
                </p>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-yellow-500 to-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => handleNavigate('https://gwcteq-partner.domo.com/app-studio/180666776/pages/899556376')}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
