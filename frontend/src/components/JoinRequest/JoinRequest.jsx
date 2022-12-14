import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const JoinRequest = ({ household }) => {
  const [user, token] = useAuth();
  const [requested, setRequested] = useState(false);
  const [requests, setRequests] = useState([]);

  async function getRequests() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/households/${household.id}/join_requests/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if ((response.status = 201)) {
      setRequests(response.data);
    }
  }

  useEffect(() => {
    getRequests();
  }, []);

  console.dir(requests);

  async function createRequest() {
    let newRequest = {
      user: user,
      household: household,
    };
    let response = await axios.post(
      `http://127.0.0.1:8000/api/households/${household.id}/join_requests/`,
      newRequest,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if ((response.status = 201)) {
      await getRequests();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    createRequest();
    determineAlreadyRequested();
  }

  useEffect(() => {
    determineAlreadyRequested();
  }, [requests]);

  function determineAlreadyRequested() {
    requests.map((request) => {
      if (request.household.id == household.id) {
        setRequested(true);
      }
    });
  }
  console.log(`requested: ${requested}`);

  return requested ? (
    <div>
      <p>Request Submitted!</p>
    </div>
  ) : (
    <div>
      <button onClick={handleSubmit}>Request to Join</button>
    </div>
  );
};

export default JoinRequest;
