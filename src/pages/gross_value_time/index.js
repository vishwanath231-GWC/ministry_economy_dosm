import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";
import { Link } from "react-router-dom";

const GrossValueTime = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [chartData, setChartData] = useState({
    categories: [],
    series: [
      {
        name: "Gross Value Added",
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
      .get("/data/v1/tourism_satellite")
      .then((response) => {
        const filteredData = response.filter(
          (item) => item.FLAG === "Gross value added of Tourism",
        );
        const productSet = new Set(filteredData.map((item) => item.Product));
        setProducts(["All", ...productSet]);
        setData(filteredData);
        processChartData(filteredData, "All");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const processChartData = (data, product) => {
    const filteredData = product === "All" ? data : data.filter((item) => item.Product === product);
    const yearlyData = filteredData.reduce((acc, item) => {
      if (!acc[item.Year]) acc[item.Year] = 0;
      acc[item.Year] += item["converted million"];
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
          name: "Gross Value Added",
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

  const handleProductChange = (event) => {
    const selected = event.target.value;
    setSelectedProduct(selected);
    processChartData(data, selected);
  };

  const options = {
    chart: {
      height: 550,
      width: 900,
      type: "line",
    },
    stroke: {
      width: [0, 2],
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [1],
    },
    colors: ["#FFBC2F", "#327EB8"],
    labels: chartData.categories,
    yaxis: [
      {
        labels: {
          show: false,
        },
        title: {
          text: "Gross Value Added (Million)",
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

  return (
    <div>
      <div className="inbound_tourism_bg">
        <div className="max-w-screen-xl mx-auto my-0 py-6 px-5">
          <div className="mb-6">
            <Navigation backLink="/gross-value" />
          </div>
          <div>
            <h2 className="uppercase text-xl font-bold">tourism satellite account</h2>
            <h5 className="uppercase text-sm font-medium">
              Gross value Added in the Tourism Industry
            </h5>
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
              <div className="max-w-sm mx-auto text-sm my-0 bg-white shadow-md rounded p-5">
                <div className="flex flex-col">
                  <label className="font-bold mb-2">Year</label>
                  <select
                    id="year"
                    name="year"
                    className="border border-gray-300 rounded p-2"
                    value={selectedProduct}
                    onChange={handleProductChange}
                  >
                    <option value="">Select Year</option>
                    {products.map((product, index) => (
                      <option value={product} key={index}>
                        {product}
                      </option>
                    ))}
                  </select>
                </div>
                <Link
                  to="/tourism-direct"
                  className="bg-[#0E6EC5] text-white mt-5 rounded p-2 mt-5 block w-fit"
                >
                  Key Statistics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrossValueTime;
