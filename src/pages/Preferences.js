import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Navbar from "../components/Navbar";
import Phone from "../components/Phone";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const animatedComponents = makeAnimated();

export default function PreferencesForm() {
  const [stockList, setStockList] = useState([]);
  const [watchList, setWatchlist] = useState([]);
  const [risk, setRisk] = useState("");
  const [forceRerender, setForceRerender] = useState(false); // Way to force the react select component to rerender after API call

  const navigate = useNavigate();

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

  const watchlistOptions = [
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
  const riskOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check local storage first
        const cachedData = localStorage.getItem("userLists");

        if (cachedData) {
          // If data is in local storage, use it
          const parsedData = JSON.parse(cachedData);
          setWatchlist(parsedData.WatchList);
          setStockList(parsedData.StockList);
          setRisk(parsedData.Risk);
        } else {
          // If not in local storage, make API call
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

          // Update state with API data
          setWatchlist(res.data.WatchList);
          setStockList(res.data.StockList);
          setRisk(res.data.Risk);

          // Update local storage
          localStorage.setItem("userLists", JSON.stringify(res.data));
        }

        // Force rerender
        setForceRerender((prev) => !prev);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleStockChoose = (selectedOptions) => {
    const selectedStocks = selectedOptions.map((option) => option.value);
    setStockList(selectedStocks);
    //console.log(selectedStocks);
  };

  const handleWatchlistChoose = (selectedOptions) => {
    const selectedWatchlist = selectedOptions.map((option) => option.value);
    setWatchlist(selectedWatchlist);
    //console.log(selectedWatchlist);
  };

  const handleRiskChoose = (selectedOptions) => {
    const selectedRisk = selectedOptions.value;
    setRisk(selectedRisk);
    //console.log(selectedRisk);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Watchlist:", watchlist);
    //console.log("Stocklist:", stockList);
    //console.log("Risk:", risk);
    // Perform the post request to the server with the selected data
    localStorage.removeItem("userLists");
    try {
      const res = await axios.post(
        "https://stockwatch-backend-p3zq.onrender.com/updatelists",
        {
          watch_list: watchList,
          stock_list: stockList,
          risk: risk,
        },
        {
          headers: {
            token: `${localStorage.getItem("jwt")}`,
            "Content-Type": `application/json`,
          },
        }
      );
      //console.log(res.data);
      // Handle the response from the server as needed
    } catch (error) {
      console.error(error);
      // Handle error case
    }

    navigate("/dashboard");
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full md:flex-row min-h-screen bg-gray-900 pb-6">
      <Navbar />
      <div className="overflow-hidden py-12 sm:py-18 w-full">
        <div className="mx-auto w-full px-10 lg:px-14">
          <div className="mx-auto grid max-w-2xl pt-16 grid-cols-1 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:p-12 lg:pt-4">
              <div className="m lg:max-w-lg justify-between text-center flex flex-col">
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-2xl pt-10 pb-2">
                  Select Your Portfolio Holdings
                </h1>
                <div className="">
                  <Select
                    key={forceRerender ? "forceRerender" : "normal"} // Change the key to force re-render
                    options={stockOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={handleStockChoose}
                    defaultValue={stockList.map((stock) => ({
                      value: stock,
                      label: stock,
                    }))}
                  />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-2xl pt-10 pb-2">
                  Select Your Watchlist Holdings
                </h1>
                <div className="">
                  <Select
                    key={forceRerender ? "forceRerender" : "normal"} // Change the key to force re-render
                    options={watchlistOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={handleWatchlistChoose}
                    defaultValue={watchList.map((stock) => ({
                      value: stock,
                      label: stock,
                    }))}
                  />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-2xl pt-10 pb-2">
                  Select Your Risk Tolerance
                </h1>
                <div className="">
                  <Select
                    key={forceRerender ? "forceRerender" : "normal"}
                    options={riskOptions}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={handleRiskChoose}
                    defaultValue={{
                      value: risk,
                      label: risk,
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-10 bg-blue-600 text-white px-10 py-2 rounded hover:bg-blue-800 "
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
            <Phone />
          </div>
        </div>
      </div>
    </div>
  );
}
