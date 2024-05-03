import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Coin from "./Pages/CriptoCoins";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  return (
    <div className="">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/coins/:id" element={<Coin />}></Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;