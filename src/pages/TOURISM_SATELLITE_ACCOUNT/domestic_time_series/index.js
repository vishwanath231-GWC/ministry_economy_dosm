import React, { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import Chart from "react-apexcharts";
import domo from "ryuu.js";

const DomesticTimeSeries = () => {
  const [data, setData] = useState([]);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [chartData, setChartData] = useState(null); // Start with null

  useEffect(() => {
    domo
      .get("/data/v1/tourism_satellite")
      .then((response) => {
        const filteredData = response.filter(
          (item) => item.FLAG === "Domestic Tourism Expenditure",
        );
        const uniqueProducts = [...new Set(filteredData.map((item) => item.Product))];
        const uniqueCategories = [
          ...new Set(
            filteredData.map((item) => item.Category).filter((category) => category !== ""),
          ),
        ];

        setProductList(uniqueProducts);
        setCategoryList(uniqueCategories);
        setData(filteredData);
        processChartData(filteredData, "", "");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const processChartData = (data, product, category) => {
    let filteredData = data;
    if (product) {
      filteredData = filteredData.filter((item) => item.Product === product);
    }
    if (category) {
      filteredData = filteredData.filter((item) => item.Category === category);
    }

    const dataByYear = filteredData.reduce((acc, item) => {
      const year = item.Year;
      const convertedMillion = item["converted million"];
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += convertedMillion;
      return acc;
    }, {});

    const sortedData = Object.entries(dataByYear).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

    const years = sortedData.map(([year]) => parseInt(year));
    const expenditures = sortedData.map(([, expenditure]) => expenditure);
    const differences = expenditures.map((value, index, array) => {
      if (index === 0) return 0;
      return (((value - array[index - 1]) / array[index - 1]) * 100).toFixed(2);
    });

    // console.log("Years:", years);
    // console.log("Expenditures:", expenditures);
    // console.log("Differences:", differences);

    setChartData({
      categories: years,
      series: [
        {
          name: "Expenditure (in million)",
          type: "bar",
          data: expenditures,
        },
        {
          name: "Percentage Difference",
          type: "line",
          data: differences,
        },
      ],
    });
  };

  const handleProductChange = (e) => {
    const product = e.target.value;
    setSelectedProduct(product);
    processChartData(data, product, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    processChartData(data, selectedProduct, category);
  };

  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: chartData ? chartData.categories : [],
    },
    yaxis: [
      {
        title: {
          text: "Expenditure (in million)",
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
    dataLabels: {
      enabled: true,
      formatter: function (val, { seriesIndex }) {
        if (seriesIndex === 1) {
          return `${val}%`;
        }
        return val.toLocaleString();
      },
    },
    tooltip: {
      y: {
        formatter: (value, { seriesIndex }) => {
          if (seriesIndex === 1) {
            return `${value}%`;
          }
          return `${value.toLocaleString()} million`;
        },
      },
    },
  };

  return (
    <div>
      <div className="inbound_tourism_bg">
        <div className="max-w-screen-xl mx-auto my-0 py-6 px-5">
          <div className="mb-6">
            <Navigation backLink="/domestic-tourism" />
          </div>
          <div>
            <h2 className="uppercase text-xl font-bold">tourism satellite account</h2>
            <h5 className="uppercase text-sm font-medium">
              Time Series domestic tourism expenditure
            </h5>
          </div>
          <div className="grid grid-cols-2 mt-6">
            <div>
              {chartData && (
                <Chart options={options} series={chartData.series} type="line" height="350px" />
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
                    value={selectedProduct}
                    onChange={handleProductChange}
                  >
                    <option value="">Select Product</option>
                    {productList.map((product, index) => (
                      <option value={product} key={index}>
                        {product}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col mt-5">
                  <label className="font-bold mb-2">Category</label>
                  <select
                    id="category"
                    name="category"
                    className="border border-gray-300 rounded p-2"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select Category</option>
                    {categoryList.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
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

export default DomesticTimeSeries;
