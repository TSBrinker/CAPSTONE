import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Container } from "react-bootstrap";
import EditBillForm from "../../forms/EditBillForm/EditBillForm";
import axios from "axios";
import BillDetailsModal from "../BillDetailsModal/BillDetailsModal";

const Bill = ({ bill, i, bills, getBills }) => {
  const [users, setUsers] = useState([]);
  const [user, token] = useAuth();
  const [payments, setPayments] = useState([]);
  //   const [myPayments, setMyPayments] = useState([]);

  //   let portion = parseFloat(bill.amount);
  let portion = bill.amount;

  if (bill.is_split) {
    let divisor = bill.users.length + 1;
    portion = portion / divisor;
    portion = Math.round(portion * 100) / 100;
  }

  async function getPayments() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/bills/${bill.id}/payments/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setPayments(response.data);
  }

  useEffect(() => {
    getPayments();
  }, [token]);

  let subtractor = 0;

  //   I need to get the amount that the active user still needs to pay
  //if is_split is true, I need to get MY payments, sum them up, and return the subtractor
  //else, if it ISN'T split, I need to get everyone's payments and subtract it from the total.

  if (payments) {
    if (bill.is_split) {
      payments.map((payment) => {
        if (payment.user.id == user.id) {
          subtractor += payment.amount;
        }
      });
    } else {
      payments.map((payment) => {
        subtractor += payment.amount;
      });
    }
  }

  //   console.log(
  //     `${user.username}'s total payments toward ${bill.payee}: ${myPaymentTotal}`
  //   );

  let balance = portion - subtractor;
  if (balance < 0) {
    balance = 0;
  }

  return bills.length > 0 ? (
    <div className={`card mb-3 border-primary`} style={{ maxWidth: "20rem" }}>
      <div className="card-header mt-3">{bill.name}</div>
      <div className="card-body">
        <h4 className="card-title">{bill.payee}</h4>
        <p className="card-text">
          ${balance.toFixed(2)}, due {bill.due_date}
        </p>{" "}
        <BillDetailsModal bill={bill} getBills={getBills} />
      </div>
    </div>
  ) : (
    <div>You ain't got no bills to pay!</div>
  );
};

export default Bill;
