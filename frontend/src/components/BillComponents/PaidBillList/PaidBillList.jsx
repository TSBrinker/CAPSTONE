import React, { useState, useEffect } from "react";
import Bill from "../Bill/Bill";
import useAuth from "../../../hooks/useAuth.js";

const PaidBillList = ({ bills, getAllTheThings, residents }) => {
  const [user, token] = useAuth();
  const [paidBills, setPaidBills] = useState([]);

  function filterBills() {
    let filtered_bills = bills.filter((bill) => {
      if (bill.is_paid) {
        return true;
      } else {
        return false;
      }
    });
    setPaidBills(filtered_bills);
  }

  useEffect(() => {
    filterBills();
  }, [bills]);

  return paidBills.length > 0 ? (
    paidBills.map((bill, index) => {
      return (
        <div className="m-3">
          <Bill
            bill={bill}
            key={index}
            bills={bills}
            getAllTheThings={getAllTheThings}
            residents={residents}
          />
        </div>
      );
    })
  ) : (
    <div>No paid bills to show here yet!</div>
  );
};

export default PaidBillList;
