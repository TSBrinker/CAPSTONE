import React, { useState, useEffect } from "react";
import SplitWithResident from "../SplitWithResident/SplitWithResident";
import useAuth from "../../hooks/useAuth";

const SplitWithResidentsList = ({ residents, billUsers, setBillUsers }) => {
  const [user, token] = useAuth();

  function handleCheck(event) {
    // event.preventDefault();
    let updatedList = [...billUsers];
    if (event.target.checked) {
      updatedList = [...billUsers, event.target.value];
    } else {
      updatedList.splice(billUsers.indexOf(event.target.value), 1);
    }
    setBillUsers(updatedList);
  }

  let housemates = residents.filter((resident) => {
    if (resident.username == user.username) {
      console.log(`I'm skipping ${resident.nickname}`);
      return false;
    } else {
      console.log(`Gimme ${resident.nickname}`);
      return true;
    }
  });

  console.log(user);
  console.log(housemates);

  return housemates.map((resident, index) => {
    return (
      <SplitWithResident
        handleCheck={handleCheck}
        resident={resident}
        index={index}
      />
    );
  });
};

export default SplitWithResidentsList;
