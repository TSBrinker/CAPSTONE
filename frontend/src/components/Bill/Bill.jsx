import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Container } from "react-bootstrap";
import EditBillForm from "../EditBillForm/EditBillForm";
import axios from "axios";

const Bill = ({ bill, i, bills }) => {
  const [users, setUsers] = useState([]);
  const [user, token] = useAuth();
  const [payments, setPayments] = useState([]);
  //   const [myPayments, setMyPayments] = useState([]);

  //   let portion = parseFloat(bill.amount);
  let portion = bill.amount;

  if (bill.is_split) {
    let divisor = bill.users.length + 1;
    portion = (portion / divisor + 0.01).toFixed(2);
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

  console.log(`
  Let's break down the total due for ${bill.payee}\n
  The amount due is ${bill.amount}
  `);

  return (
    <div className={`card mb-3 border-primary`}>
      <div className="card-header">
        {bill.payee}({bill.id})
      </div>
      <div className="card-body">
        <h4 className="card-title">{bill.description}</h4>
        <p className="card-text">
          ${balance}, due {bill.due_date}
        </p>
      </div>
    </div>
  );
};

export default Bill;
