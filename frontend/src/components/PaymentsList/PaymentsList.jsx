import React, { useState, useEffect } from "react";
import Payment from "../Payment/Payment";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const PaymentsList = ({ bill, payments }) => {
  const [user, token] = useAuth();

  return payments ? (
    payments.map((payment, index) => {
      return <Payment payment={payment} index={index} />;
    })
  ) : (
    <div>No payments to see</div>
  );
};

export default PaymentsList;
