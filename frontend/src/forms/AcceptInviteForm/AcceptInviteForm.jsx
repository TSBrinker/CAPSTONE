import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import AcceptInviteCard from "../../components/AcceptInviteCard/AcceptInviteCard";

const AcceptInviteForm = ({ setHouseholdID, getHousehold }) => {
  const [inviteNumber, setInviteNumber] = useState("");
  const [tempNumber, setTempNumber] = useState("");
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
  }

  function handleSearch(event) {
    event.preventDefault();
    setInviteNumber(tempNumber);
  }

  //   useEffect(() => {
  //     setShowInvite(true);
  //   }, [invite]);

  useEffect(() => {
    getInvite();
  }, [inviteNumber]);

  return (
    <div>
      <form onSubmit={handleSearch} className="d-flex">
        <input
          value={tempNumber}
          onChange={(event) => setTempNumber(event.target.value)}
          required
          className="form-control me-sm-2"
          type="search"
          placeholder="12345678"
        />
        <button
          onClick={handleSearch}
          className="btn btn-secondary my-2 my-sm-0"
          type="submit"
        >
          Find Invite
        </button>
      </form>
      {inviteNumber ? (
        <AcceptInviteCard
          inviteNumber={inviteNumber}
          setHouseholdID={setHouseholdID}
          getHousehold={getHousehold}
        />
      ) : null}
    </div>
  );
};

export default AcceptInviteForm;
