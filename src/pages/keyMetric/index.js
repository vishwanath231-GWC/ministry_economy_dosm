import React, { useEffect, useState } from "react";
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
  const [inboundTotal, setInboundTotal] = useState(0);
  const [inboundGrowth, setInboundGrowth] = useState(0);

  const [outboundTotal, setOutboundTotal] = useState(0);
  const [outboundGrowth, setOutboundGrowth] = useState(0);

  const [domesticTotal, setDomesticTotal] = useState(0);
  const [domesticGrowth, setDomesticGrowth] = useState(0);

  const [tourismTotal, setTourismTotal] = useState(0);
  const [tourismGrowth, setTourismGrowth] = useState(0);

  const [grossTotal, setGrossTotal] = useState(0);
  const [grossGrowth, setGrossGrowth] = useState(0);

  useEffect(() => {
    domo
      .get("/data/v1/tourism_satellite")
      .then((data) => {
        const uniqueYears = [...new Set(data.map((item) => item.Year))];
        const min_year = Math.max(...uniqueYears) - 1;
        const max_year = Math.max(...uniqueYears);
        // -----------------------------------------------------------------------------
        // inbound expenditure
        const inboundFilter = data.filter((item) => item.FLAG === "Inbound Tourism Expenditure");
        const totalExpenditure = inboundFilter.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);
        setInboundTotal(totalExpenditure.toFixed(2));

        // inbound growth
        const inboundFilterMin = data.filter(
          (item) => item.FLAG === "Inbound Tourism Expenditure" && item.Year === min_year,
        );
        const totalExpenditureMin = inboundFilterMin.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);

        const inboundFilterMax = data.filter(
          (item) => item.FLAG === "Inbound Tourism Expenditure" && item.Year === max_year,
        );
        const totalExpenditureMax = inboundFilterMax.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);
        const inboundGrowth =
          ((Math.round(totalExpenditureMax) - Math.round(totalExpenditureMin)) /
            Math.round(totalExpenditureMin)) *
          100;
        setInboundGrowth(inboundGrowth.toFixed(0));

        // -----------------------------------------------------------------------------
        // outbound expenditure
        const outboundFilter = data.filter((item) => item.FLAG === "Outbound Tourism Expenditure");
        const outboundTotalExpenditure = outboundFilter.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);
        setOutboundTotal(outboundTotalExpenditure.toFixed(2));

        // outbound growth
        const outboundFilterMin = data.filter(
          (item) => item.FLAG === "Outbound Tourism Expenditure" && item.Year === min_year,
        );
        const outboundTotalExpenditureMin = outboundFilterMin.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);

        const outboundFilterMax = data.filter(
          (item) => item.FLAG === "Outbound Tourism Expenditure" && item.Year === max_year,
        );
        const outboudTotalExpenditureMax = outboundFilterMax.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);
        const outboundGrowth =
          ((Math.round(outboudTotalExpenditureMax) - Math.round(outboundTotalExpenditureMin)) /
            Math.round(outboundTotalExpenditureMin)) *
          100;
        setOutboundGrowth(outboundGrowth.toFixed(0));

        // -----------------------------------------------------------------------------
        // domestic expenditure
        const domesticFilter = data.filter((item) => item.FLAG === "Domestic Tourism Expenditure");
        const domesticTotalExpenditure = domesticFilter.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);
        setDomesticTotal(domesticTotalExpenditure.toFixed(2));

        // outbound growth
        const domesticFilterMin = data.filter(
          (item) => item.FLAG === "Domestic Tourism Expenditure" && item.Year === min_year,
        );
        const domesticTotalExpenditureMin = domesticFilterMin.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);

        const domesticFilterMax = data.filter(
          (item) => item.FLAG === "Domestic Tourism Expenditure" && item.Year === max_year,
        );
        const domesticTotalExpenditureMax = domesticFilterMax.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);
        const domesticGrowth =
          ((Math.round(domesticTotalExpenditureMax) - Math.round(domesticTotalExpenditureMin)) /
            Math.round(domesticTotalExpenditureMin)) *
          100;
        setDomesticGrowth(domesticGrowth.toFixed(0));

        // -----------------------------------------------------------------------------
        // tourism expenditure
        const tourismFilter = data.filter((item) => item.FLAG === "Tourism Direct Gross Domestic ");
        const tourismTotalExpenditure = tourismFilter.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);
        setTourismTotal(tourismTotalExpenditure.toFixed(2));

        // tourism growth
        const tourismFilterMin = data.filter(
          (item) => item.FLAG === "Tourism Direct Gross Domestic " && item.Year === min_year,
        );
        const tourismtotalExpenditureMin = tourismFilterMin.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);

        const tourismFilterMax = data.filter(
          (item) => item.FLAG === "Tourism Direct Gross Domestic " && item.Year === max_year,
        );
        const tourismtotalExpenditureMax = tourismFilterMax.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);
        const tourismGrowth =
          ((Math.round(tourismtotalExpenditureMax) - Math.round(tourismtotalExpenditureMin)) /
            Math.round(tourismtotalExpenditureMin)) *
          100;
        setTourismGrowth(tourismGrowth.toFixed(0));
        // -----------------------------------------------------------------------------
        // domestic expenditure
        const grossFilter = data.filter((item) => item.FLAG === "Gross value added of Tourism");
        const grossTotalExpenditure = grossFilter.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);
        setGrossTotal(grossTotalExpenditure.toFixed(2));

        // tourism growth
        const grossFilterMin = data.filter(
          (item) => item.FLAG === "Gross value added of Tourism" && item.Year === min_year,
        );
        const grosstotalExpenditureMin = grossFilterMin.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);

        const grossFilterMax = data.filter(
          (item) => item.FLAG === "Gross value added of Tourism" && item.Year === max_year,
        );
        const grosstotalExpenditureMax = grossFilterMax.reduce((sum, item) => {
          return sum + item["Expenditure(M)"];
        }, 0);
        const grossGrowth =
          ((Math.round(grosstotalExpenditureMax) - Math.round(grosstotalExpenditureMin)) /
            Math.round(grosstotalExpenditureMin)) *
          100;
        setGrossGrowth(grossGrowth.toFixed(0));
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="key_metric_bg">
        <div className="max-w-screen-xl mx-auto my-0 py-6 px-5">
          <div className="mb-6">
            <Navigation backLink="/card" />
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
                    <div className="font-bold">
                      RM{" "}
                      {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(inboundTotal)}{" "}
                    </div>
                    <div className="flex items-center">
                      <IoIosArrowRoundUp className="text-green-700" />
                      <div className="text-medium">{inboundGrowth} %</div>
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
                    <div className="font-bold">
                      RM{" "}
                      {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(outboundTotal)}{" "}
                    </div>
                    <div className="flex items-center">
                      <IoIosArrowRoundUp className="text-green-700" />
                      <div className="text-medium">{outboundGrowth}%</div>
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
                    <div className="font-bold">
                      RM{" "}
                      {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(domesticTotal)}{" "}
                    </div>
                    <div className="flex items-center">
                      <IoIosArrowRoundUp className="text-green-700" />
                      <div className="text-medium">{domesticGrowth}%</div>
                    </div>
                    <div className="text-medium text-md">Domestic Tourism Expenditure</div>
                  </div>
                </Link>
                <Link
                  to="/tourism-direct"
                  className="flex bg-white shadow-md border border-gray-100 rounded p-5"
                >
                  <div>
                    <IoBarChartOutline className="text-3xl text-[#FFBC2F]" />
                  </div>
                  <div className="ml-3">
                    <div className="font-bold">
                      RM{" "}
                      {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(tourismTotal)}{" "}
                    </div>
                    <div className="flex items-center">
                      <IoIosArrowRoundUp className="text-green-700" />
                      <div className="text-medium">{tourismGrowth}%</div>
                    </div>
                    <div className="text-medium text-md">Tourism Direct Gross Domestic Product</div>
                  </div>
                </Link>
                <Link
                  to="/employment"
                  className="flex bg-white shadow-md border border-gray-100 rounded p-5"
                >
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
                <Link
                  to="/gross-value"
                  className="flex bg-white shadow-md border border-gray-100 rounded p-5"
                >
                  <div>
                    <BiCoinStack className="text-3xl text-[#FFBC2F]" />
                  </div>
                  <div className="ml-3">
                    <div className="font-bold">
                      RM{" "}
                      {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(grossTotal)}{" "}
                    </div>
                    <div className="flex items-center">
                      <IoIosArrowRoundUp className="text-green-700" />
                      <div className="text-medium">{grossGrowth}%</div>
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
