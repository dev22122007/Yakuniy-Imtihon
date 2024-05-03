import React from "react";

function Loader() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}

export default Loader;