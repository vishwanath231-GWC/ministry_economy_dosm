import React, { useEffect, useState } from "react";
import "./style.css";
import Navigation from "../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";
import { Link } from "react-router-dom";

const InboundTourism = () => {
  const [yearList, setYearList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState({});
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          fontSize: "12px", // Adjust the font size as needed
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    colors: ["#FFBC2F"],
    dataLabels: {
      enabled: false,
      style: {
        colors: ["#000"], // Set percentage values to black
      },
    },
    grid: {
      show: false,
    },
  });
  const [chartSeries, setChartSeries] = useState([
    {
      name: "Converted Million (%)",
      data: [],
    },
  ]);

  useEffect(() => {
    domo
      .get("/data/v1/tourism_satellite")
      .then((data) => {
        // Filter data with "FLAG": "Inbound Tourism Expenditure"
        const filtered = data.filter((item) => item.FLAG === "Inbound Tourism Expenditure");

        const uniqueYears = [...new Set(filtered.map((item) => item.Year))];
        const uniqueCategories = [...new Set(filtered.map((item) => item.Category))];
        setYearList(uniqueYears);
        setCategoryList(uniqueCategories);
        setFilteredData(filtered);

        processData(filtered);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  const processData = (data) => {
    // Calculate the total converted million by product
    const convertedByProduct = data.reduce((acc, item) => {
      const product = item.Product;
      const converted = item["converted million"];
      if (!acc[product]) {
        acc[product] = 0;
      }
      acc[product] += converted;
      return acc;
    }, {});

    // Calculate the total sum of all converted values
    const totalSum = Object.values(convertedByProduct).reduce((sum, value) => sum + value, 0);

    // Convert values to percentages
    const percentageData = Object.fromEntries(
      Object.entries(convertedByProduct)
        .map(([product, converted]) => [
          product,
          ((converted / totalSum) * 100).toFixed(1), // Calculate percentage
        ])
        .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1])), // Sort in descending order
    );

    setData(percentageData);
  };

  useEffect(() => {
    // Update chart options and series whenever data changes
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: Object.keys(data),
      },
    }));

    setChartSeries([
      {
        name: "Converted Million (%)",
        data: Object.values(data),
      },
    ]);
  }, [data]);

  const handleFilterChange = (filterType, value) => {
    let filtered = filteredData;

    if (filterType === "year") {
      filtered = filteredData.filter((item) => item.Year === parseInt(value));
    } else if (filterType === "category") {
      filtered = filteredData.filter((item) => item.Category === value);
    }

    processData(filtered);
  };

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
              inbound tourism expenditure by products
            </h5>
          </div>
          <div className="grid grid-cols-2 mt-6">
            <div className="mt-20 ml-10">
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                width="100%"
                height="300px"
              />
            </div>
            <div>
              <div className="max-w-sm mx-auto text-sm my-0 bg-white shadow-md rounded p-5">
                <div className="flex flex-col">
                  <label className="font-bold mb-2">Year</label>
                  <select
                    id="year"
                    name="year"
                    className="border border-gray-300 rounded p-2"
                    onChange={(e) => handleFilterChange("year", e.target.value)}
                  >
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
                  <select
                    id="category"
                    name="category"
                    className="border border-gray-300 rounded p-2"
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                  >
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
                  to="/inbound-time-series"
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

export default InboundTourism;
