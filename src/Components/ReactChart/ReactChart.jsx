import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HistoricalChart } from "../../Api";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import Loader from "../Loaders/Loader";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const ReactChart = () => {
  const currency = useSelector((store) => store.currency.currency);
  const [arr, setarr] = useState();
  const [days, setdays] = useState(1);
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      // console.log(36, HistoricalChart(id, days, currency));
      setLoading(true);
      try {
        const response = await fetch(HistoricalChart(id, days, currency));
        // console.log(39, HistoricalChart(id, days, currency));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setarr(data.prices);
      } catch (error) {
        console.log("Error", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [days, currency]);
  return (
    <div className="border-l-2 border-slate-600 h-[600px] pl-4">
      <span className="flex justify-center items-center text-[#87CEEB] gap-2 font-semibold">
        <span className="block h-6 w-20 border-4 border-[#87CEEB]"></span>
        Price ( Past {days} days ) in{" "}
        <span className="uppercase">{currency}</span>
      </span>
      <div className="w-[1000px] flex flex-col gap-[2vh] p-3 text-[#FAF0E6]">
        {loading ? (
          <div className="w-[950px] h-[550px]">
            <Loader />
          </div>
        ) : (
          <Line
            data={{
              labels: arr?.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: arr?.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${
                    currency === "usd" ? "$" : currency === "euro" ? "€" : "£"
                  }`,
                  borderColor: "skyblue",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}

        <div className="flex gap-[4vw] justify-evenly text-black text-xs">
          <button
            className={`chart-btn ${
              days === 1 ? "bg-[#87CEEB] text-black" : "text-white"
            }`}
            onClick={days !== 1 ? () => setdays(1) : null}
          >
            24 Hours
          </button>
          <button
            className={`chart-btn ${
              days === 30 ? "bg-[#87CEEB] text-black" : "text-white"
            }`}
            onClick={days !== 30 ? () => setdays(30) : null}
          >
            30 Days
          </button>
          <button
            className={`chart-btn ${
              days === 90 ? "bg-[#87CEEB] text-black" : "text-white"
            }`}
            onClick={days !== 90 ? () => setdays(90) : null}
          >
            3 Months
          </button>
          <button
            className={`chart-btn ${
              days === 365 ? "bg-[#87CEEB] text-black" : "text-white"
            }`}
            onClick={days !== 365 ? () => setdays(365) : null}
          >
            1 Year
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactChart;