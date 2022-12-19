import React, { useState, useEffect } from "react";
import LowButton from "../LowButton/LowButton";
import OutButton from "../OutButton/OutButton";
import StockedButton from "../StockedButton/StockedButton";

const StockButtonGroup = ({ product }) => {
  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <StockedButton product={product} />
      <LowButton product={product} />
      <OutButton product={product} />
    </div>
  );
};

export default StockButtonGroup;
