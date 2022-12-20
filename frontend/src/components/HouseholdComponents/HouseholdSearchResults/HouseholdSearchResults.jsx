import React, { useState } from "react";
import HouseholdCard from "../HouseholdCard/HouseholdCard";

const HouseholdSearchResults = ({ filteredHouseholds }) => {
  return !filteredHouseholds.length > 0 ? (
    <div>Sorry, we didn't find anything! Try again?</div>
  ) : (
    filteredHouseholds.map((household, index) => {
      return (
        <div className="margin-auto">
          <HouseholdCard household={household} />
        </div>
      );
    })
  );
};

export default HouseholdSearchResults;
