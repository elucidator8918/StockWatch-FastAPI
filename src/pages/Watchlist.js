import React, { useState, useEffect } from "react";
import Stock from "../components/Stock";
import Navbar from "../components/Navbar";
import LineChart from "../components/LineChart";
import { Typewriter } from "react-simple-typewriter";
import StockCarousel from "../components/StockCarousel";
import News from "../components/News";
import { useNavigate } from "react-router-dom";
import StockCarousel2 from "../components/StockCarousel2";
import axios from "axios";
import { Footer } from "../components/Footer";

export default function Watchlist() {
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const navigate = useNavigate();
  // Function to toggle between watchlist and portfolio list
  const toggleList = () => {
    setShowWatchlist(!showWatchlist);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("userLists");

        if (cachedData) {
          //console.log("No dashboard list call");
          const parsedData = JSON.parse(cachedData);
          setWatchlist(parsedData.WatchList);
          setPortfolio(parsedData.StockList);
        } else {
          const res = await axios.post(
            "https://stockwatch-backend-p3zq.onrender.com/getlists",
            {},
            {
              headers: {
                token: `${localStorage.getItem("jwt")}`,
                "Content-Type": `application/json`,
              },
            }
          );
          //console.log(res);
          setWatchlist(res.data.WatchList);
          setPortfolio(res.data.StockList);
          localStorage.setItem("userLists", JSON.stringify(res.data));
        }
        // Handle the response from the server as needed
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []);

  return (
    <div className="bg-gray-900">
      <div className="flex flex-col xl:flex-row bg-gray-900 bg-auto overflow-x-hidden my-16 ">
        <Navbar />

        <div className="flex flex-col p-5 items-left min-h-fit xl:max-h-screen mb-0 rounded-lg overflow-y-auto overflow-x-hidden w-full xl:w-1/3 bg-gray-800 ">
          <button
            className="hover:scale-105 transition-transform duration-1000 bg-gradient-to-r  from-violet-600 to-blue-600 text-white font-bold p-3 mt-4 rounded-lg"
            onClick={() => {
              navigate("/Recommend");
            }}
          >
            GET YOUR RECOMMENDATIONS
          </button>
          <div className="flex flex-col sm:flex-col xl:flex-row justify-between">
            <p className="mt-2 text-left text-6xl font-extrabold tracking-tight text-white sm:text-3xl">
              {showWatchlist ? "My Watchlist" : "My Portfolio"}
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-4 mt-4 rounded"
              onClick={toggleList}
            >
              {showWatchlist ? "Switch to Portfolio" : "Switch to Watchlist"}
            </button>
          </div>

          <ul className="mt-4">
            {showWatchlist ? (
              <li>
                {watchlist.map((ticker, index) => (
                  <Stock key={index} ticker={ticker} />
                ))}
              </li>
            ) : (
              <li>
                {" "}
                {portfolio.map((ticker, index) => (
                  <Stock key={index} ticker={ticker} />
                ))}
              </li>
            )}
          </ul>
          {/* Button to toggle between watchlist and portfolio list */}
        </div>

        <div className="flex flex-col mt-0 min-h-max xl:w-2/3 xl:px-1 justify-start items-center xl:mx-4 ">
          <div className="flex flex-col xl:flex-row gap-y-6 xl:gap-y-0 w-full xl:w-1/2 items-center justify-center ml-0  ">
            <div className="flex flex-col  mt-4 w-11/12 xl:w-full mr-0 xl:mr-2 ">
              <p className="mb-2 text-4xl font-extrabold text-white text-center">
                Top Gainers
                <span className="text-green-600">
                  <Typewriter words={[""]} cursor cursorStyle="%" loop={0} />
                </span>
              </p>
              <StockCarousel color="green" />
            </div>

            <div className="flex flex-col mt-4 w-11/12 xl:w-full">
              <p className="mb-2 text-4xl font-extrabold text-white text-center">
                Top Losers
                <span className="text-red-600">
                  <Typewriter words={[""]} cursor cursorStyle="%" loop={0} />
                </span>
              </p>
              <StockCarousel2 color="red" />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row my-4 gap-y-6 xl:gap-y-0 w-11/12 xl:w-full items-center justify-center">
            <LineChart symbol={1} />
            <LineChart symbol={2} />
          </div>

          <div className="my-1 overflow-y-auto overflow-x-hidden rounded-2xl w-11/12 xl:w-full items-center justify-center">
            <News />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
