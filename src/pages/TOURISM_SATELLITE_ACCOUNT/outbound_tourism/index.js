import React, { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import domo from "ryuu.js";

const OutboundTourism = () => {
  const [loading, setLoading] = useState(false);
  const [yearList, setYearList] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState({ categories: [], series: [] });

  useEffect(() => {
    setLoading(true);
    domo
      .get("/data/v1/tourism_satellite")
      .then((data) => {
        setLoading(false);
        const uniqueYears = [...new Set(data.map((item) => item.Year))];
        setYearList(uniqueYears);
        setFilteredData(data.filter((item) => item.FLAG === "Outbound Tourism Expenditure"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const data = filteredData.filter((item) => item.Year === parseInt(selectedYear));
      processChartData(data);
    } else {
      processChartData(filteredData);
    }
  }, [selectedYear, filteredData]);

  const processChartData = (data) => {
    const dataByProduct = data.reduce((acc, item) => {
      const product = item.Product;
      const expenditure = item["Expenditure(M)"];
      if (!acc[product]) {
        acc[product] = 0;
      }
      acc[product] += expenditure;
      return acc;
    }, {});

    // Convert the object into an array of [product, expenditure] pairs and sort it
    const sortedData = Object.entries(dataByProduct).sort((a, b) => b[1] - a[1]);

    const totalExpenditure = sortedData.reduce((acc, [, expenditure]) => acc + expenditure, 0);

    const products = sortedData.map(([product]) => product);
    const expenditures = sortedData.map(([, expenditure]) =>
      ((expenditure / totalExpenditure) * 100).toFixed(2),
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
    setSelectedYear(e.target.value);
  };

  const options = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: chartData.categories,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    colors: ["#FFBC2F"],
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return `${val}%`;
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}%`,
      },
    },
    grid: {
      show: false,
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
              outbound tourism expenditure by products
            </h5>
          </div>
          <div className="grid grid-cols-2 mt-6">
            <div className="mt-10">
              {loading ? (
                <div className="font-bold ml-7">Loading...</div>
              ) : (
                <Chart options={options} series={series} type="bar" height="350px" />
              )}
            </div>
            <div>
              <div className="max-w-sm mx-auto text-sm my-0 bg-white shadow-md rounded p-5">
                <div className="flex flex-col">
                  <label className="font-bold mb-2">Year</label>
                  <select
                    id="year"
                    name="year"
                    className="border border-gray-300 rounded p-2"
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
                <Link
                  to="/outbound-time-series"
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

export default OutboundTourism;
