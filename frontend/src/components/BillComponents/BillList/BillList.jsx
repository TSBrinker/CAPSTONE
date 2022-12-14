import React, { useState, useEffect } from "react";
import Bill from "../Bill/Bill";
import useAuth from "../../../hooks/useAuth.js";

const BillList = ({ bills, getAllTheThings, residents }) => {
  const [user, token] = useAuth();
  const [unpaidBills, setUnpaidBills] = useState([]);

  function filterBills() {
    let filtered_bills = bills.filter((bill) => {
      if (!bill.is_paid) {
        return true;
      } else {
        return false;
      }
    });
    setUnpaidBills(filtered_bills);
  }

  useEffect(() => {
    filterBills();
  }, [bills]);

  return unpaidBills.length > 0 ? (
    unpaidBills.map((bill, index) => {
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
    <div>You've got no bills coming due!</div>
  );
};

export default BillList;
