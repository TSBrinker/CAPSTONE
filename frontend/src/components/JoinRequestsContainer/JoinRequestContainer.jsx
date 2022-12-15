import React, { useState, useEffect } from "react";
import JoinRequestList from "../JoinRequestList/JoinRequestList";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const JoinRequestContainer = ({
  pendingRequests,
  setPendingRequests,
  requests,
  setRequests,
}) => {
  const [user, token] = useAuth();

  return (
    <div className="border">
      <JoinRequestList
        requests={requests}
        setRequests={setRequests}
        pendingRequests={pendingRequests}
        setPendingRequests={setPendingRequests}
      />
    </div>
  );
};

export default JoinRequestContainer;
