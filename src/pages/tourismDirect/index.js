import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";

const TourismDirect = () => {
  const [data, setData] = useState([]);
  const [timeSeriesOptions, setTimeSeriesOptions] = useState([]);
  const [selectedTimeSeries, setSelectedTimeSeries] = useState("Gross Domestic Product (GDP)");
  const [chartData, setChartData] = useState({
    categories: [],
    series: [
      {
        name: "Value",
        type: "column",
        data: [],
      },
      {
        name: "Percentage Difference",
        type: "line",
        data: [],
      },
    ],
  });

  useEffect(() => {
    domo
      .get("/data/v1/time_series")
      .then((response) => {
        const timeSeriesSet = new Set(
          response.map((item) => item["Time Series of key Statistics"]),
        );
        setTimeSeriesOptions(Array.from(timeSeriesSet));
        setData(response);
        processChartData(response, "Gross Domestic Product (GDP)");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const processChartData = (data, timeSeries) => {
    const filteredData = data.filter(
      (item) => item["Time Series of key Statistics"] === timeSeries,
    );
    const yearlyData = filteredData.reduce((acc, item) => {
      if (!acc[item.Year]) acc[item.Year] = 0;
      acc[item.Year] += item["Value(M)"];
      return acc;
    }, {});
    const categories = Object.keys(yearlyData).map((year) => parseInt(year));
    const seriesData = Object.values(yearlyData).map((value) => parseFloat(value.toFixed(2)));
    const percentageDifference = seriesData.map((value, index, array) => {
      if (index === 0) return 0;
      return parseFloat((((value - array[index - 1]) / array[index - 1]) * 100).toFixed(1));
    });
    setChartData({
      categories,
      series: [
        {
          name: "Value",
          type: "column",
          data: seriesData,
        },
        {
          name: "Percentage Difference",
          type: "line",
          data: percentageDifference,
        },
      ],
    });
  };

  const handleTimeSeriesChange = (event) => {
    const selected = event.target.value;
    setSelectedTimeSeries(selected);
    processChartData(data, selected);
  };

  const options = {
    chart: {
      height: 550,
      width: 900,
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    xaxis: {
      categories: chartData.categories,
      title: {
        text: "Year",
      },
    },
    yaxis: [
      {
        labels: {
          show: false,
          formatter: (val) => `${val}`,
        },
        title: {
          text: "Value",
        },
      },
      {
        opposite: true,
        labels: {
          show: false,
          formatter: (val) => `${val}%`,
        },
        title: {
          text: "Percentage Difference",
        },
      },
    ],
  };

  return (
    <div>
      <div className="inbound_tourism_bg">
        <div className="max-w-screen-xl mx-auto my-0 py-6 px-5">
          <div className="mb-6">
            <Navigation backLink="/key-metric" />
          </div>
          <div>
            <h2 className="uppercase text-xl font-bold">Tourism Satellite Account</h2>
            <h5 className="uppercase text-sm font-medium">Employment in the Tourism Industry</h5>
          </div>
          <div className="grid grid-cols-2 mt-6">
            <div className="mt-10 ml-14 h-[1000] w-[1000]">
              <Chart
                options={options}
                series={chartData.series}
                type="line"
                width="100%"
                height="350px"
              />
            </div>
            <div>
              <select
                value={selectedTimeSeries}
                onChange={handleTimeSeriesChange}
                className="border p-2 ml-10"
              >
                {timeSeriesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourismDirect;
