import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CreateBillModal from "../../components/BillComponents/CreateBillModal/CreateBillModal";
import BillList from "../../components/BillComponents/BillList/BillList";
import PaidBillList from "../../components/BillComponents/PaidBillList/PaidBillList";

const BillsPage = ({ residents }) => {
  const [user, token] = useAuth();
  const [personalBills, setPersonalBills] = useState([]);
  const [householdBills, setHouseholdBills] = useState([]);
  const [displayBills, setDisplayBills] = useState(personalBills);
  const [displayingHousehold, setDisplayingHousehold] = useState(false);

  async function getPersonalBills() {
    let response = await axios.get("http://127.0.0.1:8000/api/bills/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(`I'm getPersonalBills and I fired in Bills Page`);
    setPersonalBills(response.data);
  }

  async function getHouseholdBills() {
    let response = await axios.get(
      "http://127.0.0.1:8000/api/bills/household/",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(`I'm getHouseholdBills and I fired in Bills Page`);
    setHouseholdBills(response.data);
  }

  function getAllTheThings() {
    getPersonalBills();
    getHouseholdBills();
  }

  useEffect(() => {
    getAllTheThings();
  }, []);

  console.log(personalBills);

  function handlePersonal(event) {
    // event.preventDefault();
    setDisplayBills(personalBills);
    setDisplayingHousehold(false);
    console.log("mine");
  }

  function handleEveryones(event) {
    // event.preventDefault();
    setDisplayBills(householdBills);
    setDisplayingHousehold(true);

    console.log("ours");
  }
  console.log(`I'm showing displayingHousehold as ${displayingHousehold}`);
  return (
    <div className="mb-3">
      <div
        className="d-flex mx-4 justify-content-between mt-1 btn-group"
        role="group"
      >
        <input
          type="radio"
          className="btn-check btn-secondary"
          name="btnradio"
          id="setPersonalBills"
          autoComplete="off"
          onClick={handlePersonal}
          defaultChecked
        />
        <label
          className="btn btn-lg btn-outline-primary"
          htmlFor="setPersonalBills"
        >
          Mine
        </label>
        <input
          type="radio"
          className="btn-check btn-secondary"
          name="btnradio"
          id="setHouseholdBills"
          autoComplete="off"
          onClick={handleEveryones}
        />
        <label
          className="btn btn-lg btn-outline-primary"
          htmlFor="setHouseholdBills"
        >
          Household
        </label>
      </div>
      <div className="container">
        <CreateBillModal
          getAllTheThings={getAllTheThings}
          isHousehold={displayingHousehold}
        />
      </div>
      {displayingHousehold ? (
        <>
          <div className="d-flex flex-row flex-wrap justify-content-around border-bottom border-light py-3">
            <BillList
              bills={householdBills}
              getAllTheThings={getAllTheThings}
              residents={residents}
            />{" "}
          </div>
          <div className="d-flex flex-row flex-wrap justify-content-around py-3">
            <PaidBillList bills={householdBills} residents={residents} />
          </div>
        </>
      ) : (
        <>
          <div className="d-flex flex-row flex-wrap justify-content-around border-bottom border-light py-3">
            <BillList
              bills={personalBills}
              getAllTheThings={getAllTheThings}
              residents={residents}
            />{" "}
          </div>
          <div className="d-flex flex-row flex-wrap justify-content-around py-3">
            <PaidBillList bills={personalBills} residents={residents} />
          </div>
        </>
      )}
    </div>
  );
};

export default BillsPage;
