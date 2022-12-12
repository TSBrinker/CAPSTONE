import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Bill from "../Bill/Bill";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const BillList = ({}) => {
  const [user, token] = useAuth();
  const [bills, setBills] = useState([]);

  async function getBills() {
    let response = await axios.get("http://127.0.0.1:8000/api/bills/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setBills(response.data);
  }

  useEffect(() => {
    getBills();
  }, [token]);

  console.log(`There are ${bills.length} bills on the list`);

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
