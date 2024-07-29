import React, { useEffect } from "react";
import "./style.css";
import { TbWorld } from "react-icons/tb";
import { IoIosArrowRoundUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { LuPlane } from "react-icons/lu";
import { IoCarSportOutline, IoBarChartOutline } from "react-icons/io5";
import { VscOrganization } from "react-icons/vsc";
import { BiCoinStack } from "react-icons/bi";
import Navigation from "../../components/Navigation";
import domo from "ryuu.js";

const KeyMetric = () => {
  useEffect(() => {
    domo
      .get("/data/v1/tourism_satellite")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="key_metric_bg">
        <div className="max-w-screen-xl mx-auto my-0 py-6 px-5">
          <div className="mb-6">
            <Navigation backLink={"/"} />
          </div>
          <div>
            <h2 className="uppercase text-xl font-bold">tourism satellite account</h2>
            <h5 className="uppercase text-sm font-medium">performance snapshot</h5>
          </div>
          <div className="grid grid-cols-3 mt-6">
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-5">
                <Link
                  to="/inbound-tourisom"
                  className="flex bg-white shadow-md border border-gray-100 rounded p-5"
                >
                  <div>
                    <TbWorld className="text-3xl text-[#FFBC2F]" />
                  </div>
                  <div className="ml-3">
                    <div className="font-bold">RM 33,437.1</div>
                    <div className="flex items-center">
                      <IoIosArrowRoundUp className="text-green-700" />
                      <div className="text-medium">70%</div>
                    </div>
                    <div className="text-medium text-md">Inbound Tourism Expenditure</div>
                  </div>
                </Link>
                <Link
                  to="/outbound-tourism"
                  className="flex bg-white shadow-md border border-gray-100 rounded p-5"
                >
                  <div>
                    <LuPlane className="text-3xl text-[#FFBC2F]" />
                  </div>
                  <div className="ml-3">
                    <div className="font-bold">RM 33,437.1</div>
                    <div className="flex items-center">
                      <IoIosArrowRoundUp className="text-green-700" />
                      <div className="text-medium">70%</div>
                    </div>
                    <div className="text-medium text-md">Outbound Tourism Expenditure</div>
                  </div>
                </Link>
                <Link
                  to="/domestic-tourism"
                  className="flex bg-white shadow-md border border-gray-100 rounded p-5"
                >
                  <div>
                    <IoCarSportOutline className="text-3xl text-[#FFBC2F]" />
                  </div>
                  <div className="ml-3">
                    <div className="font-bold">RM 33,437.1</div>
                    <div className="flex items-center">
                      <IoIosArrowRoundUp className="text-green-700" />
                      <div className="text-medium">70%</div>
                    </div>
                    <div className="text-medium text-md">Domestic Tourism Expenditure</div>
                  </div>
                </Link>
                <Link className="flex bg-white shadow-md border border-gray-100 rounded p-5">
                  <div>
                    <IoBarChartOutline className="text-3xl text-[#FFBC2F]" />
                  </div>
                  <div className="ml-3">
                    <div className="font-bold">RM 33,437.1</div>
                    <div className="flex items-center">
                      <IoIosArrowRoundUp className="text-green-700" />
                      <div className="text-medium">70%</div>
                    </div>
                    <div className="text-medium text-md">Tourism Direct Gross Domestic Product</div>
                  </div>
                </Link>
                <Link className="flex bg-white shadow-md border border-gray-100 rounded p-5">
                  <div>
                    <VscOrganization className="text-3xl text-[#FFBC2F]" />
                  </div>
                  <div className="ml-3">
                    <div className="font-bold">RM 33,437.1</div>
                    <div className="flex items-center">
                      <IoIosArrowRoundUp className="text-green-700" />
                      <div className="text-medium">70%</div>
                    </div>
                    <div className="text-medium text-md">Employment in Tourism Industry</div>
                  </div>
                </Link>
                <Link className="flex bg-white shadow-md border border-gray-100 rounded p-5">
                  <div>
                    <BiCoinStack className="text-3xl text-[#FFBC2F]" />
                  </div>
                  <div className="ml-3">
                    <div className="font-bold">RM 33,437.1</div>
                    <div className="flex items-center">
                      <IoIosArrowRoundUp className="text-green-700" />
                      <div className="text-medium">70%</div>
                    </div>
                    <div className="text-medium text-md">Gross Value Added of Tourism Industry</div>
                  </div>
                </Link>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetric;
