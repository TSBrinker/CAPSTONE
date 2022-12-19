import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import PurchaseButton from "../PurchaseButton/PurchaseButton";

const PurchasesGroup = ({ product, getProducts }) => {
  const [user, token] = useAuth();
  const [purchases, setPurchases] = useState([]);

  async function getProductsPurchases() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/products/${product.id}/purchases/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if ((response.status = 200)) {
      setPurchases[response.data];
    }
  }

  useEffect(() => {
    getProductsPurchases();
  }, [product]);

  //   useEffect(() => {
  //     getProducts();
  //   }, [purchases]);

  return (
    <>
      <td>
        <PurchaseButton
          product={product}
          getProducts={getProducts}
          getProductsPurchases={getProductsPurchases}
        />
      </td>
    </>
  );
};

export default PurchasesGroup;
