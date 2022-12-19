import React, { useState, useEffect } from "react";
import axios from "axios";

const LowButton = ({ product, setStockLevel }) => {
  const [activeStatus, setActiveStatus] = useState("btn-outline-dark bg-light");

  let low_level = 2;

  useEffect(() => {
    if (product.stock_level != low_level) {
      setActiveStatus("btn-outline-dark bg-light");
    } else {
      setActiveStatus("btn-warning");
    }
  }, [product]);

  function handleClick() {
    setStockLevel(low_level);
  }

  return (
    <>
      <input
        type="button"
        className="btn-check"
        name="btn"
        id={`${product.id}low`}
        autocomplete="off"
        onClick={handleClick}
      />
      <label className={`btn btn-sm ${activeStatus}`} for={`${product.id}low`}>
        Low
      </label>
    </>
  );
};

export default LowButton;
