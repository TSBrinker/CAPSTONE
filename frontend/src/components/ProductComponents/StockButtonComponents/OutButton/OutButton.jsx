import React, { useState, useEffect } from "react";
import axios from "axios";

const OutButton = ({ product, setStockLevel }) => {
  const [activeStatus, setActiveStatus] = useState("inactive");
  let out_level = 0;

  useEffect(() => {
    if (product.stocked_level != out_level) {
      setActiveStatus("inactive");
    } else {
      setActiveStatus("active");
    }
  }, [product]);

  return (
    <div>
      <input
        type="button"
        className="btn-check"
        name="btn"
        id="stock3"
        autocomplete="off"
      />
      <label className="btn btn-sm btn-outline-dark bg-light" for="stock3">
        Out
      </label>
    </div>
  );
};

export default OutButton;
