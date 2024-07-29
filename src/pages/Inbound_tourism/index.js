import React, { useState } from "react";
import "./style.css";
import Navigation from "../../components/Navigation";
import Chart from "react-apexcharts";

const InboundTourisom = () => {
  const [options] = useState({
    chart: {
      id: "basic-bar",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#00c6ff"], // End color of the gradient
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.5,
        stops: [0, 100],
      },
    },
    grid: {
      show: false,
    },
  });

  const [series] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);

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
              <Chart options={options} series={series} type="bar" width="100%" height="300px" />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboundTourisom;
