import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Form } from "react-bootstrap";

const CreateHouseholdForm = ({ getHousehold, setHouseholdID }) => {
  const [householdName, setHouseholdName] = useState("");
  const [householdAddress, setHouseholdAddress] = useState("");
  const [householdZip, setHouseholdZip] = useState("");
  const [user, token] = useAuth();

  async function createHousehold() {
    let newHousehold = {
      name: householdName,
      address: householdAddress,
      zip: householdZip,
    };
    let response = await axios.post(
      `http://127.0.0.1:8000/api/households/`,
      newHousehold,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if ((response.status = 201)) {
      let response2 = await axios.patch(
        `http://127.0.0.1:8000/api/households/${response.data.id}/first_user/`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if ((response2.status = 202)) {
        setHouseholdID(response.data.id);
        await getHousehold();
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    createHousehold();
  }

  return (
    <form>
      <fieldset>
        <div className="form-group">
          <label for="inputHouseholdName" className="form-label mt-4">
            Household Name
          </label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="My Apartment, or The Girls' Place"
            value={householdName}
            onChange={(event) => setHouseholdName(event.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label for="inputHouseholdAddress" className="form-label mt-4">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="123 Washington St"
            value={householdAddress}
            onChange={(event) => setHouseholdAddress(event.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label for="inputHouseholdZip" className="form-label mt-4">
            ZIP Code
          </label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="12345"
            value={householdZip}
            onChange={(event) => setHouseholdZip(event.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit{" "}
        </button>
      </fieldset>
    </form>
  );
};

export default CreateHouseholdForm;
