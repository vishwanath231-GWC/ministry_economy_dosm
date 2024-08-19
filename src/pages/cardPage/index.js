import React from "react";
import Logo from "../../assets/images/logo.png";
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
          <img src={Logo} alt="Logo" className="large-logo mb-10" />
          <b className="gradient-text text-3xl mt-10">MALAYSIA TOURISM DASHBOARD</b>
          <div className="grid grid-cols-4 gap-4 mt-2 mr-5">
            <div className="col-span-3 gap-2 grid grid-cols-2 ">
              <div className="border-b-0 bg-white p-4 rounded-lg">
                <div className="mb-2">
                  <LuPlane className="mr-2 text-4xl text-[#FFBC2F]" />
                </div>
                <div className="mb-2">
                  <Link to="/key-metric">
                    <h1 className="text-lg font-bold mb-2 text-black">TOURISM SATELLITE ACCOUNT</h1>
                  </Link>
                </div>
                {/* <p className="text-justify text-sm font-medium">
                  Tourism Satellite Analysis involves the systematic assessment of tourism's
                  economic impact, utilizing data to gauge its contributions to GDP, employment, and
                  foreign exchange earnings. This method enables precise measurement and strategic
                  planning for sustainable tourism development.
                </p> */}
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-yellow-500 to-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() =>
                    handleNavigate(
                      "https://gwcteq-partner.domo.com/app-studio/1796944236/pages/2109403124",
                    )
                  }
                >
                  Explore
                </button>
              </div>
              <div className="border-b-0 bg-white p-4 rounded-lg">
                <div className="mb-2">
                  <IoCameraOutline className="mr-2 text-3xl text-[#FFBC2F]" />
                </div>
                <div className="mb-2">
                  <Link to="/domestic-tourism-homepage">
                    <h1 className="text-lg font-bold mb-2 text-black">
                      DOMESTIC TOURISM STATISTICS
                    </h1>
                  </Link>
                </div>
                {/* <p className="text-justify text-sm font-medium">
                  Analyzing domestic tourism statistics involves examining travel patterns,
                  expenditures, and demographic data to understand the behavior and preferences of
                  tourists. This analysis helps in identifying trends, forecasting demand, and
                  formulating strategies to boost the tourism industry.
                </p> */}
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-yellow-500 to-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() =>
                    handleNavigate(
                      "https://gwcteq-partner.domo.com/app-studio/1796944236/pages/2055071573",
                    )
                  }
                >
                  Explore
                </button>
              </div>
              <div className="border-b-0 bg-white p-4 rounded-lg">
                <div className="mb-2">
                  <LuFlower className="mr-2 text-3xl text-[#FFBC2F]" />
                </div>
                <div className="mb-2 flex">
                  <h1 className="text-lg font-bold mb-2 text-black">TOURISM MALAYSIA STATISTICS</h1>
                </div>
                {/* <p className="text-justify text-sm font-medium">
                  Analyzing Malaysia tourism statistics aids in understanding visitor trends,
                  economic impact, and the effectiveness of marketing strategies. This data-driven
                  approach assists in planning and improving tourism infrastructure and services to
                  boost visitor satisfaction and industry growth.
                </p> */}
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-yellow-500 to-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() =>
                    handleNavigate(
                      "https://gwcteq-partner.domo.com/app-studio/1796944236/pages/2133914494",
                    )
                  }
                >
                  Explore
                </button>
              </div>
              <div className="border-b-0 bg-white p-4 rounded-lg">
                <div className="mb-2">
                  <CgPerformance className="mr-2 text-3xl text-[#FFBC2F]" />
                </div>
                <div className="mb-2 flex">
                  <h1 className="text-lg font-bold mb-2 text-black uppercase">
                    Global and Tourism Performance
                  </h1>
                </div>
                {/* <p className="text-justify text-sm font-medium">
                  The Global and Tourism Performance analysis provides a comprehensive overview of
                  the international and domestic tourism landscape. This assessment focuses on
                  global trends, visitor demographics, and economic impact, enabling strategic
                  insights for enhancing tourism policies, infrastructure, and overall performance
                  on a global scale.
                </p> */}
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-yellow-500 to-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() =>
                    handleNavigate(
                      "https://gwcteq-partner.domo.com/app-studio/180666776/pages/899556376",
                    )
                  }
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
