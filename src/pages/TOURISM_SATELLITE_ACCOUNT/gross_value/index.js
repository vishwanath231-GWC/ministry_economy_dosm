import React, { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";
import { Link } from "react-router-dom";

const Grossvalue = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [chartData, setChartData] = useState({ categories: [], series: [] });
  const [statisticsData, setStatisticsData] = useState([]);
  const [statisticsCards, setStatisticsCards] = useState([]);

  useEffect(() => {
    setLoading(true);
    domo
      .get("/data/v1/tourism_satellite")
      .then((response) => {
        setLoading(false);
        const filteredData = response.filter(
          (item) => item.FLAG === "Gross value added of Tourism",
        );
        const uniqueYears = [...new Set(filteredData.map((item) => item.Year))];
        setYearList(uniqueYears);
        setData(filteredData);
        processChartData(filteredData, "");
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });

    domo
      .get("/data/v1/time_series")
      .then((response) => {
        setStatisticsData(response);
        processStatisticsCards(response, "");
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  const processChartData = (data, year) => {
    let filteredData = data;
    if (year) {
      filteredData = filteredData.filter((item) => item.Year === parseInt(year));
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

  const processStatisticsCards = (data, year) => {
    let filteredData = data;
    if (year) {
      filteredData = filteredData.filter((item) => item.Year === parseInt(year));
    }

    const statisticsByType = filteredData.reduce((acc, item) => {
      const type = item["Time Series of key Statistics"];
      const value = item["Value(M)"];
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += value;
      return acc;
    }, {});

    const cards = Object.entries(statisticsByType).map(([type, value]) => ({
      type,
      value,
    }));

    setStatisticsCards(cards);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    processChartData(data, year);
    processStatisticsCards(statisticsData, year);
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
    dataLabels: {
      enabled: false,
    },
    colors: ["#FFBC2F"],
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
              Gross value Added in the Tourism Industry
            </h5>
          </div>
          <div className="grid grid-cols-2 mt-2 gap-6">
            <div className="mt-10 ml-5">
              {loading ? (
                <div className="font-bold ml-2">Loading...</div>
              ) : (
                <Chart options={options} series={series} type="bar" height="350px" />
              )}
            </div>
            <div>
              <div className=" text-sm my-0 bg-white shadow-md rounded p-5">
                <div className="grid grid-cols-2 gap-4 rounded">
                  {statisticsCards.map((card, index) => (
                    <div key={index} className="bg-white shadow-md rounded p-3 w-full text-sm">
                      <div className="font-bold">{card.type}</div>
                      <div className="text-2xl font-bold mt-5">
                        {new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(card.value.toFixed(2))}{" "}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col mt-4">
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
                <Link
                  to="/gross-value-time"
                  className="bg-[#0E6EC5] text-white mt-5 rounded p-2 block w-fit"
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

export default Grossvalue;
