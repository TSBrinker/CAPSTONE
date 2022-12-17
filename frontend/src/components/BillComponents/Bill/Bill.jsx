import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import BillDetailsModal from "../BillDetailsModal/BillDetailsModal.jsx";

const Bill = ({ bill, i, bills, getBills }) => {
  const [users, setUsers] = useState([]);
  const [user, token] = useAuth();
  const [payments, setPayments] = useState([]);
  //   const [myPayments, setMyPayments] = useState([]);

  // debugger;
  let portion = parseFloat(bill.amount);
  // let portion = bill.amount;

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
  }, []);

  let subtractor = 0;

  //   I need to get the amount that the active user still needs to pay
  //if is_split is true, I need to get MY payments, sum them up, and return the subtractor
  //else, if it ISN'T split, I need to get everyone's payments and subtract it from the total.
  // debugger;
  if (payments) {
    if (bill.is_split) {
      payments.map((payment) => {
        if (payment.user.id == user.id) {
          subtractor += parseFloat(payment.amount);
        }
      });
    } else {
      payments.map((payment) => {
        subtractor += parseFloat(payment.amount);
      });
    }
  }

  //   console.log(
  //     `${user.username}'s total payments toward ${bill.payee}: ${myPaymentTotal}`
  //   );

  let balance = parseFloat(portion) - parseFloat(subtractor);
  if (balance < 0) {
    balance = 0;
  }

  return bills.length > 0 ? (
    <div className={`card mb-3 border-secondary`} style={{ width: "20rem" }}>
      <div className="card-header mt-3">{bill.name}</div>
      <div className="card-body">
        <h4 className="card-title">{bill.payee}</h4>
        {balance ? (
          <p className="card-text">
            ${balance.toFixed(2)}, due {bill.due_date}
          </p>
        ) : (
          <p className="card-text">Your portion is paid!</p>
        )}
        <div className="d-grid gap-2 w-200">
          <BillDetailsModal
            bill={bill}
            getBills={getBills}
            payments={payments}
            getPayments={getPayments}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>You ain't got no bills to pay!</div>
  );
};

export default Bill;
