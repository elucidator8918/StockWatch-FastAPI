import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import image from "./assets/download.jpg";

SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation]);

export default function News() {
  const [articles, setArticles] = useState([
    { title: "News 1", image_url: "", link: "#" },
    { title: "News 2", image_url: "", link: "#" },
    { title: "News 3", image_url: "", link: "#" },
    { title: "News 4", image_url: "", link: "#" },
    { title: "News 5", image_url: "", link: "#" },
  ]);
  const [placeholderImageUrl, setPlaceholderImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const currentDate = new Date();
        // const lastMonthDate = new Date();
        // lastMonthDate.setMonth(currentDate.getMonth() - 1);

        // const formattedCurrentDate = currentDate.toISOString().split("T")[0];
        // const formattedLastMonthDate = lastMonthDate
        //   .toISOString()
        //   .split("T")[0];
        //https://newsapi.org/v2/everything?q=indian%20stock%20market%20economy&from=${formattedLastMonthDate}&to=${formattedCurrentDate}&sortBy=publishedAt&language=en&apiKey=baea8a5de1a74cfc93627e7a4ca3a4d4
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_37443c86e03e4a7e9543ef652dad23b0b89ca&q=indian%20stock%20market%20nifty`
        );
        const data = await response.json();
        //console.log(data.results);
        const sortedArticles = data.results;

        setArticles(sortedArticles);

        if (sortedArticles.length > 0) {
          setPlaceholderImageUrl(image);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const truncateTitle = (title, wordCount) => {
    const words = title.split(" ");
    if (words.length > wordCount) {
      return `${words.slice(0, wordCount).join(" ")}...`;
    }
    return title;
  };

  return (
    <div className="pb-2">
      <p className="text-2xl md:text-xl font-extrabold flex justify-center items-left tracking-tight text-white bg-clip-text text-transparent p-2 md:hidden">
        News
      </p>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        style={{ width: "100%" }}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
        }}
      >
        {articles.slice(0, 21).map((article) => (
          <SwiperSlide
            key={article.title}
            style={{ width: "305px", height: "17.5rem" }}
          >
            {loading ? (
              <div className="bg-gray-800 p-3 h-full rounded-lg flex flex-col justify-between overflow-y-auto no-scrollbar animate-pulse">
                <div className="bg-gray-400 h-16 w-full mb-2 rounded-md" />
                <div className="bg-gray-400 h-72 w-full mb-2 rounded-md" />
              </div>
            ) : (
              <div className="bg-gray-800 p-3 h-full rounded-lg flex flex-col justify-between overflow-y-auto no-scrollbar">
                <div className="flex-grow">
                  <h2
                    className={`text-white text-left text-[16px] md:text-[12px] font-bold mb-4`}
                  >
                    {truncateTitle(article.title, 10)}
                  </h2>
                </div>
                <div className="flex-shrink-0">
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-auto rounded-lg"
                      style={{ aspectRatio: "16/9" }}
                    />
                  ) : (
                    <img
                      src={placeholderImageUrl}
                      alt="Placeholder"
                      className="w-full h-auto rounded-lg"
                      style={{ aspectRatio: "16/9" }}
                    />
                  )}
                </div>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-blue-600 rounded-lg px-4 py-1 mt-1 block text-center"
                >
                  Read
                </a>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
