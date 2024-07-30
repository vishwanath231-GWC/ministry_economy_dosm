import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";
import { Link } from "react-router-dom";

const Employment = () => {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [chartData, setChartData] = useState({ categories: [], series: [] });

  useEffect(() => {
    domo
      .get("/data/v1/time_series_employment")
      .then((response) => {
        const yearSet = new Set(response.map((item) => item.YEAR));
        setYears(["All", ...Array.from(yearSet)]);
        setData(response);
        processChartData(response, "All");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const processChartData = (data, year) => {
    const filteredData =
      year === "All" ? data : data.filter((item) => item.YEAR === parseInt(year));
    const totalPeople = filteredData.reduce((acc, item) => acc + item["People(thousands)"], 0);

    const industryData = filteredData.reduce((acc, item) => {
      if (!acc[item.INDUSTRY]) acc[item.INDUSTRY] = 0;
      acc[item.INDUSTRY] += item["People(thousands)"];
      return acc;
    }, {});

    const categories = Object.keys(industryData);
    const seriesData = Object.values(industryData).map((value) =>
      ((value / totalPeople) * 100).toFixed(1),
    );

    const sortedData = categories
      .map((category, index) => ({
        category,
        value: parseFloat(seriesData[index]),
      }))
      .sort((a, b) => b.value - a.value);

    setChartData({
      categories: sortedData.map((item) => item.category),
      series: [
        {
          name: "Percentage",
          type: "bar",
          data: sortedData.map((item) => item.value),
        },
      ],
    });
  };

  const handleYearChange = (event) => {
    const selected = event.target.value;
    setSelectedYear(selected);
    processChartData(data, selected);
  };

  const options = {
    chart: {
      height: 550,
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    grid: {
      show: false, // you can either change hear to disable all grids
      xaxis: {
        lines: {
          show: false, //or just here to disable only x axis grids
        },
      },
      yaxis: {
        lines: {
          show: false, //or just here to disable only y axis
        },
      },
    },
    xaxis: {
      categories: chartData.categories.length ? chartData.categories : [""],
      title: {
        text: "Industry",
      },
      labels: {
        style: {
          // This ensures the text wraps and does not get cut off
          overflow: "wrap",
          whiteSpace: "normal",
        },
        formatter: (value) => value,
      },
    },
    yaxis: {
      title: {
        text: "Percentage",
      },
      labels: {
        formatter: (val) => `${val}%`,
      },
    },
    dataLabels: {
      enabled: false,
      formatter: (val) => `${val}%`,
      style: {
        colors: ["#000"], // Set percentage values to black
      },
    },
  };

  const series = chartData.series.length ? chartData.series : [{ name: "", data: [] }];

  return (
    <div>
      <div className="inbound_tourism_bg">
        <div className="max-w-screen-xl mx-auto my-0 py-6 px-5">
          <div className="mb-6">
            <Navigation backLink="/key-metric" />
          </div>
          <div>
            <h2 className="uppercase text-xl font-bold">tourism satellite account</h2>
            <h5 className="uppercase text-sm font-medium">Employment in the Tourism Industry</h5>
          </div>
          <div className="grid grid-cols-2 mt-6">
            <div className="mt-10 ml-14 h-[1000] w-[1000]">
              <Chart options={options} series={series} type="bar" width="100%" height="350px" />
            </div>
            <div>
              <div className="max-w-sm mx-auto text-sm my-0 bg-white shadow-md rounded p-5">
                <div className="flex flex-col">
                  <label className="font-bold mb-2">Year</label>
                  <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    id="year"
                    name="year"
                    className="border border-gray-300 rounded p-2"
                  >
                    <option value="">Select Year</option>
                    {years.map((year, index) => (
                      <option value={year} key={index}>
                        {year}
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

export default Employment;
