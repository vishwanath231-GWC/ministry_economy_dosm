import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
// import Chart from "react-apexcharts";
import domo from "ryuu.js";
import { Link } from "react-router-dom";

const DomesticTourism = () => {
  const [yearList, setYearList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    domo
      .get("/data/v1/tourism_satellite")
      .then((data) => {
        const uniqueYears = [...new Set(data.map((item) => item.Year))];
        const uniqueCategories = [...new Set(data.map((item) => item.Category))];
        setYearList(uniqueYears);
        setCategoryList(uniqueCategories);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="inbound_tourism_bg">
        <div className="max-w-screen-xl mx-auto my-0 py-6 px-5">
          <div className="mb-6">
            <Navigation backLink="/key-metric" />
          </div>
          <div>
            <h2 className="uppercase text-xl font-bold">tourism satellite account</h2>
            <h5 className="uppercase text-sm font-medium">
              domestic tourism expenditure by products
            </h5>
          </div>
          <div className="grid grid-cols-2 mt-6">
            <div className="">bar chart</div>
            <div>
              <div className="max-w-sm mx-auto text-sm my-0 bg-white shadow-md rounded p-5">
                <div className="flex flex-col">
                  <label className="font-bold mb-2">Year</label>
                  <select id="year" name="year" className="border border-gray-300 rounded p-2">
                    <option value="">Select Year</option>
                    {yearList.map((year, index) => (
                      <option value={year} key={index}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col mt-5">
                  <label className="font-bold mb-2">Category</label>
                  <select id="year" name="year" className="border border-gray-300 rounded p-2">
                    <option value="">Select Category</option>
                    {categoryList
                      .filter((category) => category !== "")
                      .map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                  </select>
                </div>
                <Link
                  to="/domestic-time-series"
                  className="bg-[#0E6EC5] text-white mt-5 rounded p-2 mt-5 block w-fit"
                >
                  Time Series
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomesticTourism;
