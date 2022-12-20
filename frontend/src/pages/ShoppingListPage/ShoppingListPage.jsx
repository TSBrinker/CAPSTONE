import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import ShoppingCategoryContainer from "../../components/ShoppingListComponents/ShoppingCategoryContainer/ShoppingCategoryContainer";

const ShoppingListPage = ({ household }) => {
  const [user, token] = useAuth();
  const [personalCategories, setPersonalCategories] = useState([]);
  const [householdCategories, setHouseholdCategories] = useState([]);
  const [displayCategories, setDisplayCategories] =
    useState(personalCategories);

  const [displayingHousehold, setDisplayingHousehold] = useState(false);

  async function getPersonalCategories() {
    let response = await axios.get("http://127.0.0.1:8000/api/categories/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(`I'm getPersonalCategories and I fired in Inventory Page`);
    setPersonalCategories(response.data);
  }

  async function getHouseholdCategories() {
    let response = await axios.get(
      "http://127.0.0.1:8000/api/categories/household/",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(`I'm getHouseholdCategories and I fired in Inventory Page`);
    setHouseholdCategories(response.data);
  }

  function getAllTheThings() {
    getHouseholdCategories();
    getPersonalCategories();
  }

  useEffect(() => {
    getAllTheThings();
  }, []);

  function handlePersonal(event) {
    // event.preventDefault();
    setDisplayCategories(personalCategories);
    setDisplayingHousehold(false);
    console.log("mine");
  }

  function handleEveryones(event) {
    // event.preventDefault();
    setDisplayCategories(householdCategories);
    setDisplayingHousehold(true);

    console.log("ours");
  }

  return (
    <div>
      <div
        className="d-flex mx-4 justify-content-between mt-1 btn-group"
        role="group"
      >
        <input
          type="radio"
          className="btn-check btn-secondary"
          name="btnradio"
          id="setPersonalCategories"
          autoComplete="off"
          onClick={handlePersonal}
          defaultChecked
        />
        <label
          className="btn btn-lg btn-outline-primary"
          htmlFor="setPersonalCategories"
        >
          Mine
        </label>
        <input
          type="radio"
          className="btn-check btn-secondary"
          name="btnradio"
          id="setHouseholdCategories"
          autoComplete="off"
          onClick={handleEveryones}
        />
        <label
          className="btn btn-lg btn-outline-primary"
          htmlFor="setHouseholdCategories"
        >
          Household
        </label>
      </div>
      <div>
        {displayingHousehold ? (
          <div>
            {householdCategories.map((category, index) => {
              return (
                <ShoppingCategoryContainer
                  key={index}
                  category={category}
                  index={index}
                />
              );
            })}{" "}
          </div>
        ) : (
          <div>
            {personalCategories.map((category, index) => {
              return (
                <ShoppingCategoryContainer
                  key={index}
                  category={category}
                  index={index}
                />
              );
            })}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingListPage;
