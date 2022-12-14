import React, { useState } from "react";

const HouseholdCard = ({ household, index }) => {
  return (
    <div class="card bg-secondary mb-3">
      <div class="card-header">{household.name}</div>
      <div class="card-body">
        <h4 class="card-title">
          {household.address}, {household.zip}
        </h4>
        <p class="card-text">Is this the droid you're looking for?</p>
      </div>
    </div>
  );
};

export default HouseholdCard;
