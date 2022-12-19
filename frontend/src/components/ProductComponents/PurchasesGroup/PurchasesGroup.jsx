import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import PurchaseButton from "../PurchaseButton/PurchaseButton";
import PurchaseHistoryModal from "../PurchaseHistoryModal/PurchaseHistoryModal";

const PurchasesGroup = ({ product, getProducts }) => {
  const [user, token] = useAuth();

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
      <td>
        <PurchaseHistoryModal purchases={purchases} product={product} />
      </td>
    </>
  );
};

export default PurchasesGroup;
