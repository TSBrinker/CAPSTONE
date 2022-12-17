import React, { useState, useEffect } from "react";
import JoinRequestList from "../JoinRequestList/JoinRequestList";
import useAuth from "../../../hooks/useAuth";

const JoinRequestContainer = ({
  pendingRequests,
  setPendingRequests,
  requests,
  setRequests,
  admin,
  householdID,
}) => {
  const [user, token] = useAuth();

  return (
    <div className="border">
      <JoinRequestList
        requests={requests}
        setRequests={setRequests}
        pendingRequests={pendingRequests}
        setPendingRequests={setPendingRequests}
        admin={admin}
        householdID={householdID}
      />
    </div>
  );
};

export default JoinRequestContainer;
