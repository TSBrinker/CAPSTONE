import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CreateCategoryModal from "../../components/ProductComponents/CreateCategoryModal/CreateCategoryModal";
import CreateProductModal from "../../components/ProductComponents/CreateProductModal/CreateProductModal";
import CategoryContainer from "../../components/ProductComponents/CategoryContainer/CategoryContainer";

const InventoryPage = ({ household }) => {
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
  console.log(`I'm showing displayingHousehold as ${displayingHousehold}`);
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
      <div className="btn-group d-flex justify-content-center mx-3">
        <CreateCategoryModal
          getAllTheThings={getAllTheThings}
          isHousehold={displayingHousehold}
        />
      </div>

      <div>
        {displayingHousehold ? (
          <div>
            {householdCategories.map((category, index) => {
              return (
                <CategoryContainer
                  key={index}
                  category={category}
                  isHousehold={displayingHousehold}
                  index={index}
                  getAllTheThings={getAllTheThings}
                />
              );
            })}{" "}
          </div>
        ) : (
          <div>
            {personalCategories.map((category, index) => {
              return (
                <CategoryContainer
                  isHousehold={displayingHousehold}
                  getAllTheThings={getAllTheThings}
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

export default InventoryPage;
