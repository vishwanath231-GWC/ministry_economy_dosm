import React, { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";
// import { Link } from "react-router-dom";
import "./style.css";

const DomesticExpend = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2022");
  const [barChartOptions, setBarChartOptions] = useState({ categories: [], series: [] });

  useEffect(() => {
    domo
      .get("/data/v1/Total_Exp_component")
      .then((response) => {
        console.log(response);
        const uniqueYears = [...new Set(response.map((item) => item.Year))];
        setYears(uniqueYears);
        setBarChartData(response);
        processBarChartData(response, "2022");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const processBarChartData = (data, year) => {
    const filteredData = data.filter((item) => item.Year === parseInt(year));
    const totalValues = filteredData.reduce((sum, item) => sum + item.values, 0);
    const sortedData = filteredData.sort((a, b) => b.values - a.values);
    const categories = sortedData.map((item) => item.component);
    const series = sortedData.map((item) => ((item.values / totalValues) * 100).toFixed(1));

    setBarChartOptions({
      categories,
      series: [
        {
          name: "Percentage",
          data: series,
        },
      ],
    });
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    processBarChartData(barChartData, year);
  };

  const barOptions = {
    chart: {
      type: "bar",
      height: 550,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
      formatter: (val) => `${val}%`,
      style: {
        colors: ["#000000"], // Change data label text color to white
      },
    },
    xaxis: {
      categories: barChartOptions.categories,
      labels: {
        style: {
          colors: "#000000", // Change x-axis text color to white
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
  };

  return (
    <div>
      <div className="domestic_bgs">
        <div className="max-w-screen-xl mx-auto my-0 h-screen py-6 px-5 relative">
          <div className="mb-6">
            <Navigation backLink="/domestic-tourism-homepage" />
          </div>
          <div className="flex justify-between items-center">
            <div className="text-white">
              <h2 className="uppercase text-xl font-bold">domestic tourism statistics </h2>
              <h5 className="uppercase text-sm font-medium">
                Domestic Visitors Expenditure by Component in {selectedYear}
              </h5>
            </div>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="border border-gray-300 rounded p-2"
            >
              {years.map((year, index) => (
                <option value={year} key={index}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="max-w-screen-sm mx-auto mt-10">
            <div
              style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
              className="flex w-[100%] rounded"
            >
              <Chart
                options={barOptions}
                series={barChartOptions.series}
                type="bar"
                height="370px"
                width="600px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomesticExpend;
