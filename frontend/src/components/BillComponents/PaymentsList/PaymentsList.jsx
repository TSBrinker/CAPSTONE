import React, { useState, useEffect } from "react";
import Payment from "../Payment/Payment";
import useAuth from "../../../hooks/useAuth.js";

const PaymentsList = ({ bill, payments }) => {
  const [user, token] = useAuth();

  return payments.length > 0 ? (
    <table className="table table-hover">
      <thead className="text-center">
        <tr>--Payments made toward this bill--</tr>
      </thead>
      <tbody>
        {payments.map((payment, index) => {
          return <Payment payment={payment} index={index} />;
        })}
      </tbody>
    </table>
  ) : (
    <div className="text-center">--No payments made yet--</div>
  );
};

export default PaymentsList;
