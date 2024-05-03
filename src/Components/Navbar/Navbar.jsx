import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrency } from "../../redux/CriptoCurrencySlice";
import WatchList from "../Watchlist/Watchlist";
import logo from "../../../public/logo.svg";

function Navbar() {
  const options = [
    { value: "usd", label: "USD" },
    { value: "euro", label: "EURO" },
    { value: "gbp", label: "GBP" },
  ];

  const dispatch = useDispatch();
  const handleCurrencyChange = (event) => {
    dispatch(setCurrency(event.target.value));
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-[1280px] mx-auto flex justify-between py-3 mb-16">
      {isOpen && <WatchList />}
      <img src={logo} alt="" />
      <div>
        <select onChange={handleCurrencyChange} className="my-select">
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-black"
            >
              {option.label}
            </option>
          ))}
        </select>
        <button onClick={handleOpen} className="button z-20 relative">
          WATCH LIST
        </button>
      </div>
    </nav>
  );
}

export default Navbar;