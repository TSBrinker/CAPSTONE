import React, { useState, useEffect } from "react";
import axios from "axios";

const LowButton = ({ product, setStockLevel }) => {
  const [activeStatus, setActiveStatus] = useState("btn-outline-dark bg-light");

  let low_level = 1;

  useEffect(() => {
    if (product.stock_level != low_level) {
      setActiveStatus("btn-outline-dark bg-light");
    } else {
      setActiveStatus("btn-warning");
    }
  }, [product]);

  return (
    <div>
      <input
        type="button"
        className="btn-check"
        name="btn"
        id="stock2"
        autocomplete="off"
      />
      <label className={`btn btn-sm ${activeStatus}`} for="stock2">
        Low
      </label>
    </div>
  );
};

export default LowButton;
