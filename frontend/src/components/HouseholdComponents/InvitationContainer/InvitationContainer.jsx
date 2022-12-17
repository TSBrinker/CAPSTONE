import React, { useState, useEffect } from "react";
import "./InvitationContainer.css";
import InviteCodeList from "../InviteCodeList/InviteCodeList";
import InviteGenerateButton from "../InviteGenerateButton/InviteGenerateButton";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const InvitationContainer = ({ admin, householdID }) => {
  const [user, token] = useAuth();
  const [invites, setInvites] = useState([]);

  async function getInvites() {
    if (admin) {
      console.log("I'm getting invites!");
      let response = await axios.get(
        `http://127.0.0.1:8000/api/households/${householdID}/join_invites/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if ((response.status = 200)) {
        setInvites(response.data);
      }
    }
  }

  useEffect(() => {
    getInvites();
  }, []);

  return (
    <div className="container border border-curved">
      <div>
        <h4 className="lead">{invites.length}/3 Invite Codes Generated</h4>
      </div>
      <InviteCodeList admin={admin} invites={invites} getInvites={getInvites} />
      <InviteGenerateButton
        getInvites={getInvites}
        admin={admin}
        householdID={householdID}
      />
    </div>
  );
};

export default InvitationContainer;
