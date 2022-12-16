import React, { useState, useEffect } from "react";
import BillList from "../../components/BillList/BillList";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CreateBillForm from "../../forms/CreateBillForm/CreateBillForm";
import CreateBillModal from "../../components/CreateBillModal/CreateBillModal";

const BillsPage = ({ residents }) => {
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
  }, []);

  return (
    <div>
      <CreateBillModal getBills={getBills} residents={residents} />
      <BillList bills={bills} getBills={getBills} />
      <div>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            "No bills showing, create a bill?"
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            display list of bills
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Make payment button on each bill
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Pop out to show payments
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            BillsPage &gt; Bill Container &gt; BillList &gt; Bill &gt; See
            Payments and/or Make Payment
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BillsPage;
