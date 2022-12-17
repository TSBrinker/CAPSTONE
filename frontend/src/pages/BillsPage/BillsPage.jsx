import React, { useState, useEffect } from "react";
import BillList from "../../components/BillComponents/BillList/BillList";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CreateBillModal from "../../components/BillComponents/CreateBillModal/CreateBillModal.jsx";

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
    <div className="margin-auto">
      <div className="container">
        <CreateBillModal getBills={getBills} residents={residents} />
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-around">
        <BillList bills={bills} getBills={getBills} />
      </div>
    </div>
  );
};

export default BillsPage;
