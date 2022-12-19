import React, { useState, useEffect } from "react";
import axios from "axios";

const OutButton = ({ product, setStockLevel }) => {
  const [activeStatus, setActiveStatus] = useState("btn-outline-dark bg-light");

  useEffect(() => {
    if (product.stock_level != 1) {
      setActiveStatus("btn-outline-dark bg-light");
    } else {
      setActiveStatus("btn-danger");
    }
  }, [product]);

  function handleClick() {
    setStockLevel(1);
  }

  return (
    <>
      <input
        type="button"
        className="btn-check"
        name="btn"
        id={`${product.id}out`}
        autoComplete="off"
        onClick={handleClick}
      />
      <label
        className={`btn btn-sm ${activeStatus}`}
        htmlFor={`${product.id}out`}
      >
        Out
      </label>
    </>
  );
};

export default OutButton;
