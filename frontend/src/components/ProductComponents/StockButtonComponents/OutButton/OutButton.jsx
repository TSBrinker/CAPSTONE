import React, { useState, useEffect } from "react";
import axios from "axios";

const OutButton = ({ product, setStockLevel }) => {
  const [activeStatus, setActiveStatus] = useState("btn-outline-dark bg-light");
  let out_level = 1;

  useEffect(() => {
    if (product.stock_level != out_level) {
      setActiveStatus("btn-outline-dark bg-light");
    } else {
      setActiveStatus("btn-danger");
    }
  }, [product]);

  function handleClick() {
    setStockLevel(out_level);
  }

  return (
    <div>
      <input
        type="button"
        className="btn-check"
        name="btn"
        id={`${product.id}out`}
        autocomplete="off"
        onClick={handleClick}
      />
      <label
        className={`btn btn-sm ${activeStatus}`}
        htmlFor={`${product.id}out`}
      >
        Out
      </label>
    </div>
  );
};

export default OutButton;
