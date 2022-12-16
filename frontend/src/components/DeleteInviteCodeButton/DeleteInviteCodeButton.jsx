import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const DeleteInviteCodeButton = ({ admin, invite, getInvites }) => {
  const [user, token] = useAuth();

  async function deleteInviteCode() {
    if (admin) {
      console.log("I'm deleting an invite!");
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/join_invites/${invite.invite_number}/`,
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
    deleteInviteCode();
  }

  return (
    <div>
      <button onClick={handleClick} className="btn btn-primary btn-sm">
        Delete
      </button>
    </div>
  );
};

export default DeleteInviteCodeButton;
