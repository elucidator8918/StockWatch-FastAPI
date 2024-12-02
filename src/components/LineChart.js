import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";

export default function LineChart({ symbol }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        fill: true,
        borderColor: "white",
        tension: 0.4,
      },
      {
        label: "Starting Price",
        data: [],
        fill: false,
        borderColor: "white",
        borderDash: [5, 5],
        tension: 0,
      },
    ],
  });

  const [lastClosePrice, setLastClosePrice] = useState("");
  const [secondLastClosePrice, setSecondLastClosePrice] = useState("");
  const [percentageChange, setPercentageChange] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ticker = symbol === 2 ? "^BSESN" : "^NSEI";
        const response = await axios.post(
          "https://stockwatch-backend-p3zq.onrender.com/yfin",
          {
            ticker: ticker,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data.stockPrices;
        const sortedData = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        if (sortedData.length > 0) {
          const lastClose = sortedData[sortedData.length - 1].closePrice;
          const secondLastClose = response.data.prevClose;
          setLastClosePrice(lastClose.toFixed(2).toLocaleString());
          setSecondLastClosePrice(secondLastClose.toFixed(2).toLocaleString());

          const change = lastClose - secondLastClose;
          const percentageChange = ((change / secondLastClose) * 100).toFixed(
            2
          );
          setPercentageChange(percentageChange);

          const lineColor = percentageChange >= 0 ? "green" : "red";

          const chartDataUpdated = {
            labels: sortedData.map((item) => {
              const date = new Date(item.date);
              const formattedDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
              return formattedDateTime;
            }),
            datasets: [
              {
                ...chartData.datasets[0],
                data: sortedData.map((item) => item.closePrice),
                borderColor: lineColor,
                pointRadius: 1.5,
              },
              {
                ...chartData.datasets[1],
                data: Array(sortedData.length).fill(secondLastClose),
                pointRadius: 0,
                borderWidth: 2, // Set the desired thickness
                borderColor: "lightgray", // Set the desired color
              },
            ],
          };

          setChartData(chartDataUpdated);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  const chartOptions = {
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const colour = percentageChange >= 0 ? "bg-green-600" : "bg-red-600";

  return (
    <>
      {loading ? (
        <div className="bg-gray-800 px-3 py-2 mx-2 rounded-lg flex flex-col w-full xl:w-1/2">
          <div className="flex flex-row justify-between items-center pb-1">
            {symbol === 1 && (
              <h1 className="text-lg md:text-3xl font-extrabold tracking-tight text-white sm:text-2xl">
                Nifty-50(^NSEI)
              </h1>
            )}
            {symbol === 2 && (
              <h1 className="text-lg md:text-3xl font-extrabold tracking-tight text-white sm:text-2xl">
                Sensex (^BSESN)
              </h1>
            )}
            <InfinitySpin width="100" color="white" />
          </div>
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <div className="bg-gray-800 px-3 py-2 mx-2 rounded-lg flex flex-col w-full xl:w-1/2">
          <div className="flex flex-row justify-between items-center pb-1">
            {symbol === 1 && (
              <h1 className="text-md md:text-2xl font-extrabold mr-2 tracking-tight text-white sm:text-2xl">
                Nifty-50
              </h1>
            )}
            {symbol === 2 && (
              <h1 className="text-md md:text-2xl mr-2 font-extrabold tracking-tight text-white sm:text-2xl">
                Sensex
              </h1>
            )}
            <p
              className={`mt-1 text-lg md:text-xl font-bold leading-5 ${colour} py-1 px-2 rounded-md text-white`}
            >
              {percentageChange}%
            </p>
            <p
              className={`ml-2 text-lg md:text-3xl font-extrabold tracking-tight text-white sm:text-xl p-1 rounded-lg`}
            >
              {lastClosePrice}
            </p>
          </div>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </>
  );
}
