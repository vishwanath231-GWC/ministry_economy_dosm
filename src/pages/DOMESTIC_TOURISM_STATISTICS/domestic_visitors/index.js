import React, { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";
// import { Link } from "react-router-dom";
import "./style.css";

const DomesticVisitors = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2022");
  const [barChartOptions, setBarChartOptions] = useState({ categories: [], series: [] });
  const [pieChartOptions, setPieChartOptions] = useState({ labels: [], series: [] });
  const [excursionistValue, setExcursionistValue] = useState("0M");
  const [touristValue, setTouristValue] = useState("0M");

  useEffect(() => {
    domo
      .get("/data/v1/D_Visit_Visitor_by_StateVisited")
      .then((response) => {
        const uniqueYears = [...new Set(response.map((item) => item.Year))];
        setYears(uniqueYears);
        setBarChartData(response);
        processBarChartData(response, "2022");
      })
      .catch((err) => {
        console.log(err);
      });

    domo
      .get("/data/v1/Domestic_Visitors_No_Visitor") // For pie chart
      .then((response) => {
        setPieChartData(response);
        processPieChartData(response, "2022");
      })
      .catch((err) => {
        console.log(err);
      });
    domo
      .get("/data/v1/Number_of_trips")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const processBarChartData = (data, year) => {
    const filteredData = data.filter((item) => item.Year === parseInt(year));
    const sortedData = filteredData.sort((a, b) => b.values - a.values);
    const categories = sortedData.map((item) => item["Visitor Name"]);
    const series = sortedData.map((item) => item.values);

    setBarChartOptions({
      categories,
      series: [
        {
          name: "Values",
          data: series,
        },
      ],
    });
  };

  const processPieChartData = (data, year) => {
    const filteredData = data.filter((item) => item.Year === parseInt(year));
    const labels = filteredData.map((item) => item["Types Of Visitor"]);
    const series = filteredData.map((item) => item["Values(thousand)"]);

    const excursionist = filteredData.find((item) => item["Types Of Visitor"] === "Excursionist");
    const tourist = filteredData.find((item) => item["Types Of Visitor"] === "Tourist");

    setExcursionistValue(
      excursionist ? `${(excursionist["Values(thousand)"] / 1000).toFixed(1)}M` : "0M",
    );
    setTouristValue(tourist ? `${(tourist["Values(thousand)"] / 1000).toFixed(1)}M` : "0M");

    setPieChartOptions({
      labels,
      series,
    });
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    processBarChartData(barChartData, year);
    processPieChartData(pieChartData, year);
  };

  const barOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
      formatter: (val) => `${val}`,
    },
    xaxis: {
      categories: barChartOptions.categories,
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
    yaxis: {
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
    grid: {
      show: false, // Hide grid lines
    },
  };

  const pieOptions = {
    chart: {
      type: "donut", // Change to donut
      toolbar: {
        show: false,
      },
    },
    labels: pieChartOptions.labels,
    plotOptions: {
      pie: {
        donut: {
          size: "70%", // Adjust the size of the donut hole
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ["#327EB8", "#FFBC2F"],
  };

  return (
    <div>
      <div className="domestic_bgs">
        <div className="max-w-screen-xl mx-auto my-0 h-screen py-6 px-5 relative">
          <div className="mb-6">
            <Navigation backLink="/domestic-tourism-homepage" />
          </div>
          <div className="text-white">
            <h2 className="uppercase text-xl font-bold">domestic tourism statistics </h2>
            <h5 className="uppercase text-sm font-medium">snapshot performance {selectedYear}</h5>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="flex">
              <div style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} className="p-4 rounded">
                <div className="font-bold">Most Visited State by Domestic Visitor (`000), 2022</div>
                <Chart
                  options={barOptions}
                  series={barChartOptions.series}
                  type="bar"
                  height="350px"
                />
              </div>
            </div>
            <div>
              <div style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} className="p-4 rounded">
                <div className="font-bold">Percentage Share</div>
                <Chart
                  options={pieOptions}
                  series={pieChartOptions.series}
                  type="donut" // Change to donut
                  height="350px"
                />
              </div>
            </div>
            <div>
              <div className="max-w-sm mx-auto text-sm my-0 bg-white shadow-md rounded p-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="shadow-sm p-4 border border-gray-200 rounded">
                    <div className="font-medium">Excursionist</div>
                    <div className="mt-1 font-bold">{excursionistValue}</div>
                  </div>
                  <div className="shadow-sm p-4 border border-gray-200 rounded">
                    <div className="font-medium">Tourist</div>
                    <div className="mt-1 font-bold">{touristValue}</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-bold mb-2">Select Year</label>
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
                {/* <div className="flex flex-col mt-5">
                  <Link to="" className="bg-[#0E6EC5] text-white rounded p-2 block w-fit">
                    Number of Visitor - Time Series
                  </Link>
                </div>
                <div className="flex flex-col mt-5">
                  <Link to="" className="bg-[#0E6EC5] text-white rounded p-2 block w-fit">
                    Visitor by state visited - Time Series
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomesticVisitors;
