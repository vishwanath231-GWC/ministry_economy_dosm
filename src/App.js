import React, { useState } from "react";
import Chart from "react-apexcharts";

const App = () => {
  const [options] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
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
      <h2>Hello world!</h2>
      <Chart options={options} series={series} type="bar" width="500" />
    </div>
  );
};

export default App;
