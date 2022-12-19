import React, { useState, useEffect } from "react";
import axios from "axios";

const StockedButton = ({ product, setStockLevel }) => {
  const [activeStatus, setActiveStatus] = useState("btn-outline-dark bg-light");

  useEffect(() => {
    if (product.stock_level != 3) {
      setActiveStatus("btn-outline-dark bg-light");
    } else {
      setActiveStatus("btn-success");
    }
  }, [product]);

  function handleClick() {
    setStockLevel(3);
  }

  return (
    <>
      <input
        type="button"
        className="btn-check"
        name="btn"
        id={`${product.id}stocked`}
        autocomplete="off"
        onClick={handleClick}
      />
      <label
        className={`btn btn-sm ${activeStatus}`}
        for={`${product.id}stocked`}
      >
        Stocked
      </label>
    </>
  );
};

export default StockedButton;
