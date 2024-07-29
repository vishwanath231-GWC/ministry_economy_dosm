import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";

const EmploymentTime = () => {
  const [data, setData] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [chartData, setChartData] = useState({
    categories: [],
    series: [
      {
        name: "Employment",
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
      .get("/data/v1/time_series_employment")
      .then((response) => {
        const industrySet = new Set(response.map((item) => item.INDUSTRY));
        setIndustries(["All", ...industrySet]);
        setData(response);
        processChartData(response, "All");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const processChartData = (data, industry) => {
    const filteredData =
      industry === "All" ? data : data.filter((item) => item.INDUSTRY === industry);
    const yearlyData = filteredData.reduce((acc, item) => {
      if (!acc[item.YEAR]) acc[item.YEAR] = 0;
      acc[item.YEAR] += item["People(thousands)"];
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
          name: "Employment",
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

  const handleIndustryChange = (event) => {
    const selected = event.target.value;
    setSelectedIndustry(selected);
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
    labels: chartData.categories,
    yaxis: [
      {
        labels: {
          show: false,
        },
        title: {
          text: "Employment (thousands)",
        },
      },
      {
        opposite: true,
        labels: {
          show: false,
        },
        title: {
          text: "Percentage Difference",
        },
      },
    ],
    xaxis: {
      categories: chartData.categories,
    },
  };

  // const series = chartData.series.length ? chartData.series : [{ name: "", data: [] }];

  return (
    <div>
      <div className="inbound_tourism_bg">
        <div className="max-w-screen-xl mx-auto my-0 py-6 px-5">
          <div className="mb-6">
            <Navigation backLink="/employment" />
          </div>
          <div>
            <h2 className="uppercase text-xl font-bold">tourism satellite account</h2>
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
                value={selectedIndustry}
                onChange={handleIndustryChange}
                className="border p-2 ml-10"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
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

export default EmploymentTime;
