import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";

export default function Stock({ ticker }) {
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

  const [loading, setLoading] = useState(true);

  const [lastClosePrice, setLastClosePrice] = useState("");
  const [secondLastClosePrice, setSecondLastClosePrice] = useState("");
  const [percentageChange, setPercentageChange] = useState("");

  const stockOptions = [
    { value: "ADANIENT.NS", label: "Adani Enterprises Limited" },
    {
      value: "ADANIPORTS.NS",
      label: "Adani Ports and Special Economic Zone Limited",
    },
    { value: "APOLLOHOSP.NS", label: "Apollo Hospitals Enterprise Limited" },
    { value: "ASIANPAINT.NS", label: "Asian Paints Limited" },
    { value: "AXISBANK.NS", label: "Axis Bank Limited" },
    { value: "BAJAJ-AUTO.NS", label: "Bajaj Auto Limited" },
    { value: "BAJFINANCE.NS", label: "Bajaj Finance Limited" },
    { value: "BAJAJFINSV.NS", label: "Bajaj Finserv Limited" },
    { value: "BPCL.NS", label: "Bharat Petroleum Corporation Limited" },
    { value: "BHARTIARTL.NS", label: "Bharti Airtel Limited" },
    { value: "BRITANNIA.NS", label: "Britannia Industries Limited" },
    { value: "CIPLA.NS", label: "Cipla Limited" },
    { value: "COALINDIA.NS", label: "Coal India Limited" },
    { value: "DIVISLAB.NS", label: "Divi's Laboratories Limited" },
    { value: "DRREDDY.NS", label: "Dr. Reddy's Laboratories Limited" },
    { value: "EICHERMOT.NS", label: "Eicher Motors Limited" },
    { value: "GRASIM.NS", label: "Grasim Industries Limited" },
    { value: "HCLTECH.NS", label: "HCL Technologies Limited" },
    { value: "HDFCBANK.NS", label: "HDFC Bank Limited" },
    { value: "HDFCLIFE.NS", label: "HDFC Life Insurance Company Limited" },
    { value: "HEROMOTOCO.NS", label: "Hero MotoCorp Limited" },
    { value: "HINDALCO.NS", label: "Hindalco Industries Limited" },
    { value: "HINDUNILVR.NS", label: "Hindustan Unilever Limited" },
    { value: "ICICIBANK.NS", label: "ICICI Bank Limited" },
    { value: "ITC.NS", label: "ITC Limited" },
    { value: "INDUSINDBK.NS", label: "IndusInd Bank Limited" },
    { value: "INFY.NS", label: "Infosys Limited" },
    { value: "JSWSTEEL.NS", label: "JSW Steel Limited" },
    { value: "KOTAKBANK.NS", label: "Kotak Mahindra Bank Limited" },
    { value: "LTIM.NS", label: "Larsen & Toubro Limited" },
    { value: "LT.NS", label: "Larsen & Toubro Limited" },
    { value: "M&M.NS", label: "Mahindra & Mahindra Limited" },
    { value: "MARUTI.NS", label: "Maruti Suzuki India Limited" },
    { value: "NTPC.NS", label: "NTPC Limited" },
    { value: "NESTLEIND.NS", label: "Nestlé India Limited" },
    { value: "ONGC.NS", label: "Oil and Natural Gas Corporation Limited" },
    { value: "POWERGRID.NS", label: "Power Grid Corporation of India" },
    { value: "RELIANCE.NS", label: "Reliance Industries Limited" },
    { value: "SBILIFE.NS", label: "SBI Life Insurance Company Limited" },
    { value: "SBIN.NS", label: "State Bank of India" },
    { value: "SUNPHARMA.NS", label: "Sun Pharmaceutical Industries Limited" },
    { value: "TCS.NS", label: "Tata Consultancy Services Limited" },
    { value: "TATACONSUM.NS", label: "Tata Consumer Products Limited" },
    { value: "TATAMOTORS.NS", label: "Tata Motors Limited" },
    { value: "TATASTEEL.NS", label: "Tata Steel Limited" },
    { value: "TECHM.NS", label: "Tech Mahindra Limited" },
    { value: "TITAN.NS", label: "Titan Company Limited" },
    { value: "UPL.NS", label: "UPL Limited" },
    { value: "ULTRACEMCO.NS", label: "UltraTech Cement Limited" },
    { value: "WIPRO.NS", label: "Wipro Limited" },
  ];

  const stockOptionsDict = stockOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
  }, {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://stockwatch-backend-p3zq.onrender.com/yfin",
          {
            ticker: ticker,
          },
          {
            headers: {
              "Content-Type": `application/json`,
            },
          }
        );

        const data = response.data.stockPrices;
        //console.log(data);

        // Assuming the API response is an array of objects with 'closePrice' and 'date' properties
        const sortedData = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        // Update the lastClosePrice and secondLastClosePrice states with the last two close prices from the API response
        if (sortedData.length >= 2) {
          const lastClose = sortedData[sortedData.length - 1].closePrice;
          const secondLastClose = response.data.prevClose;
          setLastClosePrice(lastClose.toFixed(2).toLocaleString());
          setSecondLastClosePrice(secondLastClose.toFixed(2).toLocaleString());

          // Calculate the percentage change
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
                borderWidth: 1.5,
                pointRadius: 0,
              },
              {
                ...chartData.datasets[1],
                data: Array(sortedData.length).fill(sortedData[0].closePrice),
                borderWidth: 1,
                borderColor: "lightgray",
                borderDash: [5, 5], // Optional: Set a border dash pattern for a dotted line
                pointRadius: 0, // Set pointRadius to 0 to hide points
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
  }, [ticker]);

  const chartOptions = {
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: false, // Hide x-axis scale and labels
      },
      y: {
        display: false, // Hide y-axis scale and labels
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
    elements: {
      point: {
        radius: 0.1, // Set the radius of the data points to 0 to remove dots
      },
    },
  };

  const colour = percentageChange >= 0 ? "bg-green-600" : "bg-red-600";
  const stockLabel = stockOptionsDict[ticker];
  return (
    <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} className="flex justify-center">
      <li className="flex items-center justify-between p-3 rounded-lg bg-gray-700 mb-1 w-full">
        <div className="flex items-center w-1/4">
          {" "}
          {loading ? (
            <div className="animate-pulse">
              <div className="bg-gray-400 h-4 w-16 mb-2 rounded-md"></div>
              <div className="bg-gray-500 h-4 w-16 rounded-md"></div>
            </div>
          ) : (
            <div className="flex flex-col items-start">
              <p className="text-xs md:text-sm font-bold leading-5 text-white">
                {ticker}
              </p>
              <p className="mt-1 truncate text-[8px] md:text-[10px] leading-5 w-1/2 text-slate-400 overflow-auto">
                {stockLabel}
              </p>
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex justify-center items-center flex-shrink-0 w-1/4">
            <div className="block w-full h-auto md:w-36 md:h-20 text-right">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
        {!loading && (
          <div className="flex flex-col items-end w-1/4">
            <p className="text-sm font-extrabold leading-6 text-white">
              {lastClosePrice}
            </p>
            <p
              className={`mt-1 text-sm font-bold leading-5 ${colour} py-1 px-2 rounded-md text-white`}
            >
              {percentageChange}%
            </p>
          </div>
        )}
      </li>
    </Tilt>
  );
}
