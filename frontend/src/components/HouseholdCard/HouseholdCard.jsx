import React, { useState } from "react";
import JoinRequestButton from "../JoinRequestButton/JoinRequestButton";

const HouseholdCard = ({ household, index }) => {
  return (
    <div class="card bg-secondary mb-3">
      <div class="card-header">
        {household.address}, {household.zip}
      </div>
      <div class="card-body">
        <h4 class="card-title">{household.name}</h4>
        <JoinRequestButton household={household} />
      </div>
    </div>
  );
};

export default HouseholdCard;
