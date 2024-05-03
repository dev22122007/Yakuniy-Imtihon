import React from "react";
import Slider from "../Components/Slider/slider";
import Table from "../Components/Table/Table";
import Heading from "./../Components/Header/header";

const Home = () => {
  return (
    <div className="max-w-[1920px] mx-auto bg-[#14161A]">
      <div className="">
        <Slider />
        <Heading />
        <Table />
      </div>
    </div>
  );
};

export default Home;