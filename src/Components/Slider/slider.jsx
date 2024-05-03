import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import Slogan from "../CriptoWatchui/WatchUi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist } from "../../redux/watchlistSlice";
import { TrendingCoins } from "../../Api";
import Loader from "../Loaders/Loader";

function Slider() {
  const [arr, setarr] = useState();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const currency = useSelector((store) => store.currency.currency);

  const clicked = (val) => {
    navigate(`/coins/${val.id}`);
    dispatch(addToWatchlist(val));
  };

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const response = await fetch(TrendingCoins(currency));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setarr(data);
      } catch (error) {
        console.log("Error", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [currency]);

  const getclass = (val) => {
    const numericVal = Number(val);
    return numericVal < 0
      ? "text-red-600 text-xs ml-2"
      : "ml-2 text-green-600 text-xs";
  };

  return (
    <div className="py-4 w-full ">
      <Slogan />
      <div className="bg-[url(/bgImage.jpg)] h-[400px] flex items-center">
        <div className="w-[1280px] mx-auto">
          {loading ? (
            <Loader />
          ) : (
            <Marquee pauseOnHover="true" className="py-3 overflow-hidden">
              <div className="flex w-full">
                {arr?.map((curr) => (
                  <div
                    onClick={() => clicked(curr)}
                    className="flex flex-col justify-center items-center pt-1 text-white mr-52 cursor-pointer"
                    key={curr.id}
                  >
                    <img
                      className="h-[75px] bg-transparent"
                      src={curr.image}
                      alt=""
                    />
                    <p className="text-center pt-3 uppercase">
                      {curr.symbol}
                      <span
                        className={getclass(
                          curr.price_change_percentage_24h_in_currency
                        )}
                      >
                        {curr.price_change_percentage_24h_in_currency.toFixed(
                          2
                        )}{" "}
                        %
                      </span>
                    </p>
                    <p className="p-1">
                      {currency === "usd"
                        ? "$"
                        : currency === "euro"
                        ? "€"
                        : "£"}
                      {curr.current_price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </Marquee>
          )}
        </div>
      </div>
    </div>
  );
}

export default Slider;