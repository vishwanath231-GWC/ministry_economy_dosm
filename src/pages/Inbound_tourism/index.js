import React, { useEffect, useState } from "react";
import "./style.css";
import Navigation from "../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";
import { Link } from "react-router-dom";

const InboundTourisom = () => {
  const [yearList, setYearList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [data, setData] = useState({});
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "basic-bar",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          fontSize: "12px", // Adjust the font size as needed
          cssClass: "apexcharts-xaxis-label",
        },
        // Ensure that long words break and wrap
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    colors: ["#FFBC2F"],
    dataLabels: {
      enabled: true,
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
      name: "Expenditure",
      data: [],
    },
  ]);

  useEffect(() => {
    domo
      .get("/data/v1/tourism_satellite")
      .then((data) => {
        const uniqueYears = [...new Set(data.map((item) => item.Year))];
        const uniqueCategories = [...new Set(data.map((item) => item.Category))];
        setYearList(uniqueYears);
        setCategoryList(uniqueCategories);

        // Calculate the total expenditure by product
        const expenditureByProduct = data.reduce((acc, item) => {
          const product = item.Product;
          const expenditure = item["Expenditure(M)"];
          if (!acc[product]) {
            acc[product] = 0;
          }
          acc[product] += expenditure;
          return acc;
        }, {});

        // Calculate the total sum of all expenditures
        const totalSum = Object.values(expenditureByProduct).reduce((sum, value) => sum + value, 0);

        // Convert expenditure values to percentages
        const percentageData = Object.fromEntries(
          Object.entries(expenditureByProduct)
            .map(([product, expenditure]) => [
              product,
              ((expenditure / totalSum) * 100).toFixed(2), // Calculate percentage
            ])
            .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1])),
        );

        setData(percentageData);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

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
        name: "Expenditure",
        data: Object.values(data),
      },
    ]);
  }, [data]);

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
            <div className="">
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

export default InboundTourisom;
