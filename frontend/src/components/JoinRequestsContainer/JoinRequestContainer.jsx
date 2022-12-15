import React, { useState, useEffect } from "react";
import JoinRequestList from "../JoinRequestList/JoinRequestList";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const JoinRequestContainer = ({ requests, getRequests }) => {
  const [user, token] = useAuth();

  return <JoinRequestList requests={requests} getRequests={getRequests} />;
};

export default JoinRequestContainer;
