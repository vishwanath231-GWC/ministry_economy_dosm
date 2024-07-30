import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";
import { Link } from "react-router-dom";

const DomesticTourism = () => {
  const [data, setData] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [chartData, setChartData] = useState({ categories: [], series: [] });

  useEffect(() => {
    domo
      .get("/data/v1/tourism_satellite")
      .then((response) => {
        const filteredData = response.filter(
          (item) => item.FLAG === "Domestic Tourism Expenditure",
        );
        const uniqueYears = [...new Set(filteredData.map((item) => item.Year))];
        const uniqueCategories = [
          ...new Set(
            filteredData.map((item) => item.Category).filter((category) => category !== ""),
          ),
        ];
        setYearList(uniqueYears);
        setCategoryList(uniqueCategories);
        setData(filteredData);
        processChartData(filteredData, "", "");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const processChartData = (data, year, category) => {
    let filteredData = data;
    if (year) {
      filteredData = filteredData.filter((item) => item.Year === parseInt(year));
    }
    if (category) {
      filteredData = filteredData.filter((item) => item.Category === category);
    }

    const dataByProduct = filteredData.reduce((acc, item) => {
      const product = item.Product;
      const expenditure = item["Expenditure(M)"];
      if (!acc[product]) {
        acc[product] = 0;
      }
      acc[product] += expenditure;
      return acc;
    }, {});

    const sortedData = Object.entries(dataByProduct).sort((a, b) => b[1] - a[1]);

    const totalExpenditure = sortedData.reduce((acc, [, expenditure]) => acc + expenditure, 0);

    const products = sortedData.map(([product]) => product);
    const expenditures = sortedData.map(([, expenditure]) =>
      ((expenditure / totalExpenditure) * 100).toFixed(1),
    );

    setChartData({
      categories: products,
      series: [
        {
          name: "Expenditure(M)",
          data: expenditures,
        },
      ],
    });
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    processChartData(data, year, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    processChartData(data, selectedYear, category);
  };

  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: chartData.categories,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val}%`;
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}%`,
      },
    },
  };

  const series = chartData.series;

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
            <div>
              <Chart options={options} series={series} type="bar" height="350px" />
            </div>
            <div>
              <div className="max-w-sm mx-auto text-sm my-0 bg-white shadow-md rounded p-5">
                <div className="flex flex-col">
                  <label className="font-bold mb-2">Year</label>
                  <select
                    id="year"
                    name="year"
                    className="border border-gray-300 rounded p-2"
                    value={selectedYear}
                    onChange={handleYearChange}
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
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select Category</option>
                    {categoryList.map((item, index) => (
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
