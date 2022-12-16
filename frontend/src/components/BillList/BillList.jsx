import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Bill from "../Bill/Bill";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const BillList = ({ bills }) => {
  const [user, token] = useAuth();

  if (bills) {
    return bills.map((bill, i) => {
      return (
        <div>
          <Bill bill={bill} i={i} bills={bills} />
        </div>
      );
    });
  }
};

export default BillList;
