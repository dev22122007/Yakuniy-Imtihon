import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loaders/Loader";
import { addToWatchlist } from "../../redux/watchlistSlice";

function Table() {
  const currency = useSelector((store) => store.currency.currency);

  const [arr, setarr] = useState([]);
  const [page, setpage] = useState(1);
  const [searchquery, setsearchquery] = useState("");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const clicked = (val) => {
    navigate(`/coins/${val.id}`);
    dispatch(addToWatchlist(val));
  };
  const getclass = (val) => {
    const numericVal = Number(val);
    return numericVal < 0 ? "text-red-600 text-xs " : "text-green-600 text-xs ";
  };
  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const response = await fetch(CoinList(currency));
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
  const setthispage = (val) => {
    if (val <= 10 && val >= 1 && val !== page) {
      setpage(val);
    }
  };
  const len =
    arr.length > 0
      ? Math.ceil(
          arr?.filter(
            (coin) =>
              coin.name.toLowerCase().includes(searchquery) ||
              coin.symbol.toLowerCase().includes(searchquery)
          ).length / 10
        )
      : 0;

  return (
    <div className="w-[1280px] mx-auto mb-2">
      <input
        type="text"
        className="search text-white"
        placeholder="Search For a Crypto Currency..."
        onChange={(e) => setsearchquery(e.target.value)}
      />

      <div className="w-full flex justify-between px-4 py-5 bg-[#87CEEB] rounded-t-md">
        <div className="flex items-center gap-4 w-1/2">
          <h3 className="table-heading">Coin</h3>
        </div>

        <div className="text-white flex justify-between w-1/2 text-right">
          <p className="table-heading w-52">Price</p>
          <p className="table-heading w-52">24h Change</p>
          <p className="table-heading w-52">Market Cap</p>
        </div>
      </div>
      <div>
        {loading ? (
          <div className="h-[800px]">
            <Loader />
          </div>
        ) : (
          <div>
            {arr
              ?.filter(
                (coin) =>
                  coin.name.toLowerCase().includes(searchquery) ||
                  coin.symbol.toLowerCase().includes(searchquery)
              )
              .slice(page * 10 - 10, page * 10)
              .map((coin) => (
                <div
                  className="border border-slate-500 w-full flex justify-between items-center px-4 pt-4 pb-6 hover:bg-cyan-800 cursor-pointer"
                  onClick={() => clicked(coin)}
                  key={coin.id}
                >
                  <div className="flex items-center gap-4 w-1/2">
                    <img
                      className="w-[50px] h-[50px]"
                      src={coin.image}
                      alt={coin.name}
                    />
                    <div>
                      <h3 className="text-2xl text-white uppercase">
                        {coin.symbol}
                      </h3>
                      <p className="text-sm text-[#A9A9A9]">{coin.name}</p>
                    </div>
                  </div>

                  <div className="text-white flex w-1/2">
                    <p className="w-52 text-right">
                      {currency === "usd"
                        ? "$"
                        : currency === "euro"
                        ? "€"
                        : "£"}
                      {coin.current_price.toLocaleString()}
                    </p>
                    <div className="flex gap-4 w-52 justify-end items-center">
                      <img
                        src="/eyeWhite.svg"
                        className="w-[26px] h-[26px]"
                        alt=""
                      />
                      <span
                        className={`${getclass(
                          coin.price_change_percentage_24h
                        )}`}
                      >
                        {coin.price_change_percentage_24h.toFixed(2)} %
                      </span>
                    </div>
                    <p className="w-52 text-end">
                      {currency === "usd"
                        ? "$"
                        : currency === "euro"
                        ? "€"
                        : "£"}
                      {(coin.market_cap / 1000000).toFixed(0).toLocaleString()}{" "}
                      M
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <div
        id="pagination"
        className="flex justify-center items-center py-2 gap-1"
      >
        <span
          onClick={() => setthispage(page - 1)}
          className={
            page > 1 ? "cursor-pointer flex items-center" : "opacity-0"
          }
        >
          <img src="/left.svg" alt="arrow left" />
        </span>
        {len > 0 &&
          [...Array(len)].map((_, i) => {
            return (
              <span
                key={i}
                className={`${
                  page === i + 1 ? "bg-[#87CEEB] text-black" : "text-[#FAF0E6]"
                } cursor-pointer h-8 w-8 hover:bg-[#87CEEB] hover:text-black  rounded-full flex justify-center items-center`}
                onClick={() => setthispage(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
        <span
          onClick={() => setthispage(page + 1)}
          className={
            page < len ? "cursor-pointer flex items-center" : "opacity-0"
          }
        >
          <img src="/right.svg" alt="arrow right" />
        </span>
      </div>
    </div>
  );
}

export default Table;