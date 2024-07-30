import React, { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";
// import { Link } from "react-router-dom";
import "./style.css";
// import { color } from "highcharts";

const DomesticTrips = () => {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2022");
  const [individualData, setIndividualData] = useState({ series: [] });
  const [familyData, setFamilyData] = useState({ series: [] });
  const [totalTrips, setTotalTrips] = useState(0);
  const [sameDayTrips, setSameDayTrips] = useState(0);
  const [overnightTrips, setOvernightTrips] = useState(0);

  useEffect(() => {
    domo
      .get("/data/v1/Number_of_trips")
      .then((response) => {
        const uniqueYears = [...new Set(response.map((item) => item.year))];
        setYears(uniqueYears);
        setData(response);
        processChartData(response, "2022");
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  const processChartData = (data, year) => {
    const filteredData = data.filter((item) => item.year === parseInt(year));
    const individual = filteredData.filter((item) => item["Type of Trip"] === "Individual");
    const family = filteredData.filter((item) => item["Type of Trip"] === "With Family");

    const individualSeries = [
      individual.find((item) => item.Trip.includes("Same Day"))?.["Total Trip"] || 0,
      individual.find((item) => item.Trip.includes("Overnight"))?.["Total Trip"] || 0,
    ];
    const familySeries = [
      family.find((item) => item.Trip.includes("Same Day"))?.["Total Trip"] || 0,
      family.find((item) => item.Trip.includes("Overnight"))?.["Total Trip"] || 0,
    ];

    setIndividualData({
      series: individualSeries,
    });
    setFamilyData({
      series: familySeries,
    });

    const sameDay = individualSeries[0] + familySeries[0];
    const overnight = individualSeries[1] + familySeries[1];
    setSameDayTrips(sameDay);
    setOvernightTrips(overnight);
    setTotalTrips(sameDay + overnight);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    processChartData(data, year);
  };

  const pieOptions = () => ({
    labels: ["Same Day Trips", "Overnight Trips"],
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(2)}%`,
    },
    colors: ["#327EB8", "#FFBC2F"],
    legend: {
      show: false,
    },
  });

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
              <h5 className="uppercase text-sm font-medium">Number of trips in {selectedYear}</h5>
            </div>
            <div>
              <select
                value={selectedYear}
                onChange={handleYearChange}
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
          </div>
          <div className="grid grid-cols-4 gap-4 mt-10">
            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
              <div className="my-4 text-center font-bold text-black">Individual Trips</div>
              <Chart
                options={pieOptions}
                series={individualData.series}
                type="pie"
                height="350px"
              />
            </div>
            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
              <div className="my-4 text-center font-bold text-black">With Family Trips</div>
              <Chart options={pieOptions} series={familyData.series} type="pie" height="350px" />
            </div>
            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
              <div className="my-4 text-center font-bold text-black">Total Trips</div>
              <Chart
                options={pieOptions}
                series={[sameDayTrips, overnightTrips]}
                type="donut"
                height="350px"
              />
            </div>

            <div
              style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
              className="bg-white p-4 rounded"
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="shadow-sm p-4 border border-gray-200 rounded">
                  <div className="font-medium">Same Day</div>
                  <div className="mt-1 font-bold">{sameDayTrips.toLocaleString()}</div>
                </div>
                <div className="shadow-sm p-4 border border-gray-200 rounded">
                  <div className="font-medium">Over night</div>
                  <div className="mt-1 font-bold">{overnightTrips.toLocaleString()}</div>
                </div>
                <div className="shadow-sm p-4 border border-gray-200 rounded">
                  <div className="font-medium">Total</div>
                  <div className="mt-1 font-bold">{totalTrips.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomesticTrips;
