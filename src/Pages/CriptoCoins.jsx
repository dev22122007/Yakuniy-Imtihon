import React from "react";
import Chart from "../Components/ReactChart/ReactChart";
import CoinDetails from "../Components/CoinDetails/CoinDetails";

function Coin() {
  return (
    <div className="flex p-6 max-w-[1920px] mx-auto">
      <CoinDetails />
      <Chart />
    </div>
  );
}

export default Coin;