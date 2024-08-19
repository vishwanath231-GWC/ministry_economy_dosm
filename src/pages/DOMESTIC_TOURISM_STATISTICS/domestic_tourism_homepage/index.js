import React, { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import "./style.css";
import { Link } from "react-router-dom";
import { IoIosArrowRoundUp } from "react-icons/io";
import domo from "ryuu.js";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
// eslint-disable-next-line no-duplicate-imports
import topojson from "highcharts/modules/map";
import { GoArrowUpRight } from "react-icons/go";

// Initialize the Highcharts map module
HighchartsMap(Highcharts);
topojson(Highcharts);

const stateCodeMapping = {
  Johor: "my-jh",
  Kedah: "my-kh",
  Kelantan: "my-kn",
  Melaka: "my-me",
  "Negeri Sembilan": "my-ns",
  Pahang: "my-ph",
  Perak: "my-pk",
  Perlis: "my-pl",
  "Pulau Pinang": "my-pg",
  Sabah: "my-sa",
  Sarawak: "my-sk",
  Selangor: "my-sl",
  Terengganu: "my-te",
  "W.P. Kuala Lumpur": "my-kl",
  "W.P.Labuan": "my-lb",
  "W.P.Putrajaya": "my-pj",
};

const DomesticTourismHomePage = () => {
  const [data, setData] = useState([]);
  const [chartCreated, setChartCreated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await domo.get("/data/v1/Map");
        const chartData = response.map((item) => ({
          code: stateCodeMapping[item["State Name"]],
          value: item["Domestic Visitor(Thousands)"], // Convert to whole number
        }));
        setData(chartData);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };

    const fetchTopologyAndCreateChart = async () => {
      const topology = await fetch(
        "https://code.highcharts.com/mapdata/countries/my/my-all.topo.json",
      ).then((response) => response.json());

      // Create the chart only if data is fetched successfully
      if (data.length > 0 && !chartCreated) {
        Highcharts.mapChart("container", {
          chart: {
            map: topology,
            backgroundColor: "rgba(0,0,0,0)",
          },
          title: {
            text: " ",
          },
          credits: {
            enabled: false,
          },
          mapNavigation: {
            enabled: false,
            buttonOptions: {
              verticalAlign: "bottom",
            },
          },
          series: [
            {
              data: data.map((item) => [item.code, item.value]),
              name: "Domestic Visitors",
              states: {
                hover: {
                  color: "#BADA55",
                },
              },
              dataLabels: {
                enabled: true,
                format: "{point.name}",
              },
              color: "#ec7c30",
              allAreas: false,
              joinBy: "hc-key",
              tooltip: {
                pointFormat: "{point.name}: {point.value:,.0f}", // Format as whole number with comma separator
              },
            },
          ],
        });
        setChartCreated(true);
      }
    };

    fetchData().then(fetchTopologyAndCreateChart);
  }, [data, chartCreated]);

  return (
    <div>
      <div className="domestic_bg">
        <div className="max-w-screen-xl mx-auto my-0 h-screen py-6 px-5 relative">
          <div className="mb-6">
            <Navigation backLink="/" />
          </div>
          <div>
            <h2 className="uppercase text-xl font-bold">domestic tourism statistics </h2>
            <h5 className="uppercase text-sm font-medium">snapshot performance 2022</h5>
          </div>
          <div id="container" className="w-[40%] bg-transparent"></div>
          <div className="absolute -bottom-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link to="/domestic-visitors" className="">
              <div className="bg-white border border-[#EC7C30] shadow p-3 rounded mb-2">
                <div className="font-medium flex items-start">
                  Domestic visitors (Million)
                  <GoArrowUpRight />
                </div>
                <div className="flex items-center">
                  <div className="font-bold text-xl">171.6</div>
                  <div className="flex items-center ml-3">
                    <IoIosArrowRoundUp className="text-green-700" />
                    <div className="font-bold">160.1%</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/domestic-trips" className="">
              <div className="bg-white border border-[#EC7C30] shadow p-3 rounded mb-2">
                <div className="font-medium flex items-start">
                  Number of trips (Million) <GoArrowUpRight />
                </div>
                <div className="flex items-center">
                  <div className="font-bold text-xl">207.8</div>
                  <div className="flex items-center ml-3">
                    <IoIosArrowRoundUp className="text-green-700" />
                    <div className="font-bold">187.0%</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/domestic-expend" className="">
              <div className="bg-white border border-[#EC7C30] shadow p-3 rounded">
                <div className="font-medium flex items-start">
                  Total Expenditure (Million)
                  <GoArrowUpRight />
                </div>
                <div className="flex items-center">
                  <div className="font-bold text-xl">64.1</div>
                  <div className="flex items-center ml-3">
                    <IoIosArrowRoundUp className="text-green-700" />
                    <div className="font-bold">248.1%</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomesticTourismHomePage;
