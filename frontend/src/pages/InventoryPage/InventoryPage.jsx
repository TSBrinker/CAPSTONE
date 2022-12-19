import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CreateCategoryModal from "../../components/ProductComponents/CreateCategoryModal/CreateCategoryModal";
import CreateProductModal from "../../components/ProductComponents/CreateProductModal/CreateProductModal";
import CategoryContainer from "../../components/ProductComponents/CategoryContainer/CategoryContainer";
import ProductList from "../../components/ProductComponents/ProductList/ProductList";
import Product from "../../components/ProductComponents/Product/Product";

const InventoryPage = ({ residents, household }) => {
  const [user, token] = useAuth();
  const [productRefresh, setProductRefresh] = useState(0);
  const [personalCategories, setPersonalCategories] = useState([]);
  const [householdCategories, setHouseholdCategories] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);

  const [displayingHousehold, setDisplayingHousehold] = useState(false);

  async function getPersonalCategories() {
    let response = await axios.get("http://127.0.0.1:8000/api/categories/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
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
    setHouseholdCategories(response.data);
  }

  useEffect(() => {
    getPersonalCategories();
    getHouseholdCategories();
  }, []);

  function refreshProducts() {
    setProductRefresh(productRefresh + 1);
  }

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
      <div>
        <CreateProductModal
          refreshProducts={refreshProducts}
          categories={displayCategories}
          residents={residents}
          isHousehold={displayingHousehold}
        />
        <CreateCategoryModal
          household={household}
          getPersonalCategories={getPersonalCategories}
          getHouseholdCategories={getHouseholdCategories}
          isHousehold={displayingHousehold}
        />
      </div>
      <div className="btn-group margin-auto" role="group">
        <input
          type="radio"
          className="btn-check btn-secondary"
          name="btnradio"
          id="setPersonalCategories"
          autocomplete="off"
          onClick={handlePersonal}
          checked
        />
        <label className="btn btn-outline-primary" for="setPersonalCategories">
          Mine
        </label>
        <input
          type="radio"
          className="btn-check btn-secondary"
          name="btnradio"
          id="setHouseholdCategories"
          autocomplete="off"
          onClick={handleEveryones}
        />
        <label className="btn btn-outline-primary" for="setHouseholdCategories">
          Household
        </label>
      </div>
      <div>
        {displayCategories.length > 0 ? (
          <div>
            <div>
              {displayCategories.map((category, index) => {
                return <CategoryContainer category={category} index={index} />;
              })}
            </div>
            <div className="border border-rounded border-secondary mx-4 my-1 p-2">
              <h3>Misc:</h3>
              <p>
                <ProductList productRefresh={productRefresh} />{" "}
              </p>
            </div>
          </div>
        ) : (
          <div className="border border-rounded border-secondary mx-4 my-1 p-2">
            <h3>Misc:</h3>
            <p>
              <ProductList productRefresh={productRefresh} />{" "}
            </p>
          </div>
        )}
      </div>
      <div>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            All or by category?
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Get the categories so that when you're making a product you can see
            the list
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Display all products- add buttons on each card for *Low* *Out* and
            *Stocked*
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Separate category for mine and shared with me?
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            BACKLOG none yet
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InventoryPage;
