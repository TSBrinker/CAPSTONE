import React from "react";
import JoinRequestCard from "../JoinRequestCard/JoinRequestCard";

const JoinRequestList = ({ requests, getRequests }) => {
  return requests.map((request, index) => {
    return (
      <div className="margin-auto">
        <JoinRequestCard
          request={request}
          index={index}
          getRequests={getRequests}
        />
      </div>
    );
  });
};

export default JoinRequestList;
