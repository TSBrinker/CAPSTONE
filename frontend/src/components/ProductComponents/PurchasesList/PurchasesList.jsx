import React, { useState, useEffect } from "react";
import Purchase from "../Purchase/Purchase";
import useAuth from "../../../hooks/useAuth.js";

const PurchasesList = ({ bill, purchases }) => {
  const [user, token] = useAuth();

  return purchases.length > 0 ? (
    <table className="table table-hover">
      <thead className="text-center">
        <tr>--Purchases history of this product--</tr>
      </thead>
      <tbody>
        {purchases.map((purchase, index) => {
          return <Purchase purchase={purchase} key={index} />;
        })}
      </tbody>
    </table>
  ) : (
    <div className="text-center">--No purchases made yet--</div>
  );
};

export default PurchasesList;
