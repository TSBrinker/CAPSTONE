import React, { useState, useEffect } from "react";
import Bill from "../Bill/Bill";
import useAuth from "../../../hooks/useAuth.js";

const BillList = ({ bills, getBills }) => {
  const [user, token] = useAuth();

  return bills.length > 0 ? (
    bills.map((bill, i) => {
      return (
        <div className="m-5">
          <Bill bill={bill} i={i} bills={bills} getBills={getBills} />
        </div>
      );
    })
  ) : (
    <div>You've got no bills coming due!</div>
  );
};

export default BillList;
