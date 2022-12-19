import React, { useState, useEffect } from "react";
import axios from "axios";

const LowButton = ({ product, setStockLevel }) => {
  const [activeStatus, setActiveStatus] = useState("btn-outline-dark bg-light");

  useEffect(() => {
    if (product.stock_level != 2) {
      setActiveStatus("btn-outline-dark bg-light");
    } else {
      setActiveStatus("btn-warning");
    }
  }, [product]);

  function handleClick() {
    setStockLevel(2);
  }

  return (
    <>
      <input
        type="button"
        className="btn-check"
        name="btn"
        id={`${product.id}low`}
        autoComplete="off"
        onClick={handleClick}
      />
      <label
        className={`btn btn-sm ${activeStatus}`}
        htmlFor={`${product.id}low`}
      >
        Low
      </label>
    </>
  );
};

export default LowButton;
