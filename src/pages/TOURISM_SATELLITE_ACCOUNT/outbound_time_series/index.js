import React, { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";

const OutboundTimeSeries = () => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "bar-line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 2],
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          fontSize: "12px",
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: [
      {
        title: {
          text: "Converted Million",
        },
        labels: {
          show: false,
        },
      },
      {
        opposite: true,
        title: {
          text: "Percentage Difference",
        },
        labels: {
          show: false,
        },
      },
    ],
    colors: ["#FFBC2F", "#327EB8"],
    dataLabels: {
      enabled: false,
      style: {
        colors: ["#000"],
      },
    },
    grid: {
      show: false,
    },
  });
  const [chartSeries, setChartSeries] = useState([
    {
      name: "Converted Million",
      type: "bar",
      data: [],
    },
    {
      name: "Percentage Difference",
      type: "line",
      data: [],
    },
  ]);

  useEffect(() => {
    setLoading(true);
    domo
      .get("/data/v1/tourism_satellite")
      .then((data) => {
        setLoading(false);
        const filtered = data.filter((item) => item.FLAG === "Outbound Tourism Expenditure");

        const uniqueProducts = [...new Set(filtered.map((item) => item.Product))];
        setProductList(uniqueProducts);
        setFilteredData(filtered);

        processData(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const processData = (data) => {
    const dataByYear = data.reduce((acc, item) => {
      const year = item.Year;
      const converted = item["converted million"];
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += converted;
      return acc;
    }, {});

    const years = Object.keys(dataByYear)
      .map((year) => parseInt(year))
      .sort((a, b) => a - b);
    const totalValues = years.map((year) => dataByYear[year]);
    const percentageDifferences = [0];

    for (let i = 1; i < years.length; i++) {
      const previous = dataByYear[years[i - 1]];
      const current = dataByYear[years[i]];
      percentageDifferences.push((((current - previous) / previous) * 100).toFixed(1));
    }

    setChartOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: years,
      },
    }));

    setChartSeries([
      {
        name: "Converted Million",
        type: "bar",
        data: totalValues,
      },
      {
        name: "Percentage Difference",
        type: "line",
        data: percentageDifferences,
      },
    ]);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const filtered = value ? filteredData.filter((item) => item.Product === value) : filteredData;
    processData(filtered);
  };

  return (
    <div>
      <div className="inbound_tourism_bg">
        <div className="max-w-screen-xl mx-auto my-0 py-6 px-5">
          <div className="mb-6">
            <Navigation backLink="/outbound-tourism" />
          </div>
          <div>
            <h2 className="uppercase text-xl font-bold">tourism satellite account</h2>
            <h5 className="uppercase text-sm font-medium">
              Time Series outbound tourism expenditure
            </h5>
          </div>
          <div className="grid grid-cols-2 mt-6">
            <div>
              {loading ? (
                <div className="font-bold ml-7">Loading...</div>
              ) : (
                <Chart options={chartOptions} series={chartSeries} type="line" height="300px" />
              )}
            </div>
            <div>
              <div className="max-w-sm mx-auto text-sm my-0 bg-white shadow-md rounded p-5">
                <div className="flex flex-col">
                  <label className="font-bold mb-2">Product</label>
                  <select
                    id="product"
                    name="product"
                    className="border border-gray-300 rounded p-2"
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Product</option>
                    {productList.map((product, index) => (
                      <option value={product} key={index}>
                        {product}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutboundTimeSeries;
