import React, { useState } from "react";

const CreateHouseholdForm = ({ getHousehold }) => {
  const [householdName, setHouseholdName] = useState("");
  const [householdAddress, setHouseholdAddress] = useState("");
  const [householdZip, setHouseholdZip] = useState("");

  async function createHousehold() {
    let newHousehold = {
      name: householdName,
      address: householdAddress,
      zip: householdZip,
    };
    let response = await axios.post(
      `http://127.0.0.1:8000/api/households/`,
      newHousehold
    );
    if ((response.status = 201)) {
      await getHousehold();
    }
  }

  return <form></form>;
};

export default CreateHouseholdForm;
