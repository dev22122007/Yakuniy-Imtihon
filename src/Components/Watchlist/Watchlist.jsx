import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWatchlist } from "../../redux/watchlistSlice";

function WatchList() {
  const currency = useSelector((store) => store.currency.currency);

  const watchlistIds = useSelector((store) => store.watchlist.watchlistIds);
  const dispatch = useDispatch();

  const handleRemove = (val) => {
    dispatch(removeFromWatchlist(val));
  };

  return (
    <div className="absolute h-full top-0 right-0 w-[425px] bg-[#515151] text-white z-10">
      <h2 className="text-3xl text-center py-8 uppercase font-medium">
        Watchlist
      </h2>
      {watchlistIds.watchlistIds.length > 0 ? (
        <ul className="flex gap-10 flex-wrap justify-center">
          {watchlistIds.watchlistIds.map((item) => (
            <li key={item.id}>
              <div className="flex flex-col items-center bg-[#14161A] p-6 rounded-xl">
                <Link to={`/coins/${item.id}`}>
                  <img className="w-[80px] h-[80px]" src={item.image} alt="" />
                  <p className="mb-2">
                    {currency === "usd" ? "$" : currency === "euro" ? "€" : "£"}
                    {item.current_price.toLocaleString()}
                  </p>
                </Link>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-[#FF0000] py-0.5 px-6"
                >
                  Remove
                </button>
              </div>{" "}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-400 text-center text-lg p-8">
          You haven't added any coins to your watchlist yet.
        </p>
      )}
    </div>
  );
}

export default WatchList;