import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import AcceptInviteButton from "../AcceptInviteButton/AcceptInviteButton";

const AcceptInviteCard = ({ inviteNumber, setHouseholdID, getHousehold }) => {
  const [invite, setInvite] = useState({});
  const [showInvite, setShowInvite] = useState(false);
  const [user, token] = useAuth();

  async function getInvite() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/join_invites/${inviteNumber}/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response.data);
    setInvite(response.data);
    setShowInvite(true);
  }

  useEffect(() => {
    getInvite();
  }, []);

  console.log(invite.invite_number);

  return showInvite ? (
    <div>
      <div>Accept invitation from {invite.household.name}?</div>
      <div>
        <AcceptInviteButton
          inviteNumber={inviteNumber}
          setHouseholdID={setHouseholdID}
          getHousehold={getHousehold}
          household_id={invite.household.id}
        />{" "}
      </div>
    </div>
  ) : null;
};

export default AcceptInviteCard;
