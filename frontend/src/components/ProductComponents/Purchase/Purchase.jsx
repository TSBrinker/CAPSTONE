import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const Payment = ({ purchase }) => {
  const [user, token] = useAuth();
  const [displayName, setDisplayName] = useState(purchase.user.nickname);

  function getDisplayName() {
    if (purchase.user.username == user.username) {
      setDisplayName("You");
    }
  }
  useEffect(() => {
    getDisplayName();
  }, []);

  console.dir(purchase);
  return (
    <tr className="table-primary">
      <td>
        {displayName} purchased on {purchase.date}.
      </td>
    </tr>
  );
};

export default Payment;
