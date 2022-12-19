import React, { useState, useEffect } from "react";
import LowButton from "../LowButton/LowButton";
import OutButton from "../OutButton/OutButton";
import StockedButton from "../StockedButton/StockedButton";

const StockButtonGroup = ({ product }) => {
  const [stockLevel, setStockLevel] = useState(product.stock_level);

  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <StockedButton product={product} setStockLevel={setStockLevel} />
      <LowButton product={product} setStockLevel={setStockLevel} />
      <OutButton product={product} setStockLevel={setStockLevel} />
    </div>
  );
};

export default StockButtonGroup;
