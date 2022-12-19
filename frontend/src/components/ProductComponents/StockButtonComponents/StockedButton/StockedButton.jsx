import React, { useState, useEffect } from "react";
import axios from "axios";

const StockedButton = ({ product, setStockLevel }) => {
  const [activeStatus, setActiveStatus] = useState("btn-success");

  let stocked_level = 2;

  useEffect(() => {
    if (product.stock_level != stocked_level) {
      setActiveStatus("btn-outline-dark bg-light");
    } else {
      setActiveStatus("btn-success");
    }
  }, [product]);

  return (
    <div>
      <input
        type="button"
        className="btn-check"
        name="btn"
        id="stock1"
        autocomplete="off"
      />
      <label className={`btn btn-sm ${activeStatus}`} for="stock1">
        Stocked
      </label>
    </div>
  );
};

export default StockedButton;
