import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const Payment = ({ payment }) => {
  const [user, token] = useAuth();
  const [displayName, setDisplayName] = useState(payment.user.nickname);

  function getDisplayName() {
    if (payment.user.username == user.username) {
      setDisplayName("You");
    }
  }
  useEffect(() => {
    getDisplayName();
  }, []);

  console.dir(payment);
  return (
    <tr className="table-light">
      <td>
        {displayName} made a payment of ${`${payment.amount} `} on
        {payment.payment_date}.
      </td>
    </tr>
  );
};

export default Payment;
