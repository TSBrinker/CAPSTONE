import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import BillDetailsModal from "../BillDetailsModal/BillDetailsModal.jsx";

const Bill = ({ bill, residents, bills, getAllTheThings }) => {
  const [users, setUsers] = useState([]);
  const [user, token] = useAuth();
  const [payments, setPayments] = useState([]);
  const [portion, setPortion] = useState(parseFloat(bill.amount));
  //   const [myPayments, setMyPayments] = useState([]);

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

  function determineBalance() {
    let working_number = 0;
    let amount = bill.amount;
    if (bill.household) {
      let divisor = residents.length;
      working_number = amount / divisor;
      working_number = Math.round(working_number * 100) / 100;
      console.log(
        `After dividing my portion of ${bill.name} is ${working_number}`
      );
      amount = working_number;
    }
    let subtractor = 0;
    if (payments) {
      if (bill.household) {
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
    console.log(subtractor);
    let balance = parseFloat(amount) - parseFloat(subtractor);
    if (balance <= 0) {
      balance = 0;
    }
    console.log(balance);
    setPortion(balance);
  }
  console.log(portion);

  useEffect(() => {
    getPayments();
  }, [bill]);

  useEffect(() => {
    determineBalance();
  }, [bills, payments]);

  //   I need to get the amount that the active user still needs to pay
  //if is_split is true, I need to get MY payments, sum them up, and return the subtractor
  //else, if it ISN'T split, I need to get everyone's payments and subtract it from the total.
  // debugger;

  return bills.length > 0 ? (
    <div className={`card mb-3 border-secondary`} style={{ width: "30rem" }}>
      <div className="card-header mt-3">{bill.name}</div>
      <div className="card-body">
        <h4 className="card-title">{bill.payee}</h4>
        {!bill.is_paid ? (
          portion > 0 ? (
            <p className="card-text">
              ${portion.toFixed(2)}, due {bill.due_date}
            </p>
          ) : (
            <p className="card-text">Your portion is paid!</p>
          )
        ) : (
          <p className="card-text">All paid!</p>
        )}
        <div className="d-grid gap-2 w-200">
          <BillDetailsModal
            bill={bill}
            getAllTheThings={getAllTheThings}
            payments={payments}
            getPayments={getPayments}
            portion={portion}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>You ain't got no bills to pay!</div>
  );
};

export default Bill;
