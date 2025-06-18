import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";

function Main() {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen">
      <Navbar />
      <Home />
    </div>
  );
}

export default Main;
