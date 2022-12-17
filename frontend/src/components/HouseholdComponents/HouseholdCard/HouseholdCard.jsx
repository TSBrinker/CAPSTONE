import React, { useState } from "react";
import JoinRequestButton from "../JoinRequestButton/JoinRequestButton";

const HouseholdCard = ({ household, index }) => {
  return (
    <div className="card bg-secondary mb-3">
      <div className="card-header">
        {household.address}, {household.zip}
      </div>
      <div className="card-body">
        <h4 className="card-title">{household.name}</h4>
        <JoinRequestButton household={household} />
      </div>
    </div>
  );
};

export default HouseholdCard;
