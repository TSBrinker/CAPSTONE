import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const AcceptInviteButton = ({
  inviteNumber,
  setHouseholdID,
  getHousehold,
  household_id,
}) => {
  const [user, token] = useAuth();

  async function acceptInvitation() {
    let response = await axios.patch(
      `http://127.0.0.1:8000/api/join_invites/${inviteNumber}/`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if ((response.status = 202)) {
      await setHouseholdID(household_id);
      await getHousehold();
      console.log(response.data);
      // await getHousehold(response);
    }
  }

  function handleAcceptance(event) {
    event.preventDefault();
    acceptInvitation();
  }

  return (
    <div>
      <button className="btn btn-secondary" onClick={handleAcceptance}>
        Join
      </button>
    </div>
  );
};

export default AcceptInviteButton;
