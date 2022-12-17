import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const InviteGenerateButton = ({ getInvites, admin, householdID }) => {
  const [user, token] = useAuth();

  async function createInvite() {
    if (admin) {
      console.log("I'm creating an invite!");
      let response = await axios.post(
        `http://127.0.0.1:8000/api/households/${householdID}/join_invites/`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if ((response.status = 200)) {
        await getInvites();
      }
    }
  }

  function handleClick(event) {
    event.preventDefault();
    createInvite();
  }

  return (
    <div>
      <button onClick={handleClick} className="btn btn-primary btn-small">
        Generate
      </button>
    </div>
  );
};

export default InviteGenerateButton;
