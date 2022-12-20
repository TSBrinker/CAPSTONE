import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import HouseholdSearchResults from "../../components/HouseholdComponents/HouseholdSearchResults/HouseholdSearchResults";
import useAuth from "../../hooks/useAuth";

const FindHouseholdForm = ({}) => {
  const [allHouseholds, setAllHouseholds] = useState([]);
  const [addressQuery, setAddressQuery] = useState("");
  const [zipQuery, setZipQuery] = useState("");
  const [filteredHouseholds, setFilteredHouseholds] = useState([]);
  const [user, token] = useAuth();
  let query = addressQuery + zipQuery;

  async function getAllHouseholds() {
    let response = await axios.get(
      "http://127.0.0.1:8000/api/households/all/",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setAllHouseholds(response.data);
  }

  useEffect(() => {
    getAllHouseholds();
  }, [user]);

  function filterHouseholds() {
    let queriedHouseholds;
    queriedHouseholds = allHouseholds.filter((household) => {
      if (
        household.address.toLowerCase().includes(addressQuery.toLowerCase()) &&
        household.zip.toLowerCase() === zipQuery.toLowerCase()
      ) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredHouseholds(queriedHouseholds);
  }

  function handleSearch(event) {
    event.preventDefault();
    filterHouseholds();
  }

  // console.dir(filteredHouseholds);

  // if query is anything, return search results
  //if query is anything and results.length = 0, "sorry, nothing found!"
  //else map over results, make a card, listing the name, the address

  return (
    <div>
      <form onSubmit={handleSearch} className="d-flex">
        <input
          value={addressQuery}
          onChange={(event) => setAddressQuery(event.target.value)}
          required
          className="form-control me-sm-2"
          type="search"
          placeholder="Address"
        />
        <input
          value={zipQuery}
          onChange={(event) => setZipQuery(event.target.value)}
          required
          className="form-control me-sm-2"
          type="search"
          placeholder="ZIP Code"
        />
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      <HouseholdSearchResults filteredHouseholds={filteredHouseholds} />
    </div>
  );
};

export default FindHouseholdForm;
