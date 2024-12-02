import React, { useState, useEffect } from "react";
import axios from "axios";
import Tilt from "react-parallax-tilt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Autoplay, Navigation]);

export default function StockCarousel({ color }) {
  const getPercentageColorClass = () => {
    if (color === "green") {
      return "bg-green-600";
    } else if (color === "red") {
      return "bg-red-600";
    }
  };

  const [gainers, setGainers] = useState([
    { name: "Loading", percentage: 0 },
    { name: "Loading", percentage: 0 },
    { name: "Loading", percentage: 0 },
    { name: "Loading", percentage: 0 },
    { name: "Loading", percentage: 0 },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          "https://stockwatch-backend-p3zq.onrender.com/topgainers",
          {},
          {}
        );
        // console.log(res.data);
        setGainers(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col sm:flex-col md:flex-row justify-center w-full overflow-x-auto overflow-y-hidden bg-gray-800 p-2 px-1 rounded-lg">
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        style={{ width: "100%" }}
        breakpoints={{
          1100: {
            slidesPerView: 3,
          },
        }}
      >
        {gainers.map((stock, index) => (
          <SwiperSlide key={index}>
            <Tilt>
              <li className="flex flex-col justify-center items-center py-2 rounded-md bg-gray-700 mx-1">
                <div className="flex gap-x-4">
                  {loading ? (
                    <div className="animate-pulse">
                      <div className="bg-gray-400 h-8 w-20 mb-2 rounded-md"></div>
                    </div>
                  ) : (
                    <div className="min-w-0 flex flex-col items-start">
                      <p className="text-sm font-extrabold leading-5 text-white">
                        {stock.name}
                      </p>
                    </div>
                  )}
                </div>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="bg-gray-400 h-4 w-20 mb-2 rounded-md"></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-end">
                    <p
                      className={`mt-1 text-sm leading-5 font-bold text-white py-2 px-6 rounded-lg ${getPercentageColorClass()}`}
                    >
                      {`${stock.percentage.toFixed(2)}%`}
                    </p>
                  </div>
                )}
              </li>
            </Tilt>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
