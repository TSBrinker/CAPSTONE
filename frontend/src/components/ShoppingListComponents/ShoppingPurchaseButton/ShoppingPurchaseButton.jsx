import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const ShoppingPurchaseButton = ({
  product,
  getProducts,
  getProductsPurchases,
}) => {
  const [user, token] = useAuth();

  async function createPurchase() {
    console.log("I'm creating a purchase!");
    let response = await axios.post(
      `http://127.0.0.1:8000/api/products/${product.id}/purchases/`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if ((response.status = 200)) {
      await getProducts();
    }
  }

  function handleClick(event) {
    event.preventDefault();
    createPurchase();
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="btn btn-sm btn-outline-dark bg-light"
      >
        Buy!
      </button>
    </>
  );
};

export default ShoppingPurchaseButton;
