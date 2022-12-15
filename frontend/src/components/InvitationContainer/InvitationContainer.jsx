import React, { useState, useEffect } from "react";
import "./InvitationContainer.css";
import InviteCodeList from "../InviteCodeList/InviteCodeList";
import InviteGenerateButton from "../InviteGenerateButton/InviteGenerateButton";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const InvitationContainer = ({}) => {
  const [user, token] = useAuth();
  const [invites, setInvites] = useState([]);

  async function getInvites() {
    if (user.is_admin) {
      console.log("I'm getting invites!");
      let response = await axios.get(
        `http://127.0.0.1:8000/api/households/${user.household_id}/join_invites/`,
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

  //get the invites view

  //generate invite view

  //button function awaits getInvites

  return (
    <div className="container border border-curved">
      <div>
        <h4 className="lead">{invites.length}/3 Invite Codes Generated</h4>
      </div>
      <InviteCodeList invites={invites} getInvites={getInvites} />
      <InviteGenerateButton getInvites={getInvites} />
    </div>
  );
};

export default InvitationContainer;
