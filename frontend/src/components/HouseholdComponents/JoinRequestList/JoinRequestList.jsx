import React, { useState, useEffect } from "react";
import JoinRequestCard from "../JoinRequestCard/JoinRequestCard";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const JoinRequestList = ({
  pendingRequests,
  setPendingRequests,
  requests,
  setRequests,
  admin,
  householdID,
}) => {
  const [user, token] = useAuth();

  async function getRequests() {
    if (admin) {
      console.log("I'm getting requests!");
      let response = await axios.get(
        `http://127.0.0.1:8000/api/households/${householdID}/join_requests/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if ((response.status = 200)) {
        setRequests(response.data);
      }
    }
  }

  useEffect(() => {
    getRequests();
  }, []);

  useEffect(() => {
    if (requests.length > 0) {
      setPendingRequests(true);
    } else {
      setPendingRequests(false);
    }
  }, [requests]);

  if (requests) {
    console.log("we got requests!");
    console.log(requests);
  } else {
    console.log("no requests");
  }

  return pendingRequests ? (
    requests.map((request, index) => {
      return (
        <div className="margin-auto">
          <JoinRequestCard
            request={request}
            index={index}
            getRequests={getRequests}
          />
        </div>
      );
    })
  ) : (
    <div className="h-100">
      <h4>No pending invites</h4>
      <p className="lead text-muted">
        When a user requests to join your Household, their request will show up
        here.
      </p>
    </div>
  );
};

export default JoinRequestList;
