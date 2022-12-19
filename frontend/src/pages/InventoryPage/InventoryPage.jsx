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
  const [allCategories, setAllCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [personalCategories, setPersonalCategories] = useState([]);
  const [householdCategories, setHouseholdCategories] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);
  const [miscellaneousProducts, setMiscellaneousProducts] = useState();
  const [displayingHousehold, setDisplayingHousehold] = useState(false);

  async function getCategories() {
    let response = await axios.get("http://127.0.0.1:8000/api/categories/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setAllCategories(response.data);
  }
  async function getProducts() {
    let response = await axios.get("http://127.0.0.1:8000/api/products/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setProducts(response.data);
  }

  function getUncategorizedProducts() {
    let filtered_products = products.filter((product) => {
      if (!product.category) {
        return true;
      } else {
        return false;
      }
    });
    setMiscellaneousProducts(filtered_products);
  }

  function getPersonalCategories() {
    let filteredCategories = allCategories.filter((category) => {
      if (!category.household) {
        return true;
      } else {
        return false;
      }
    });
    setPersonalCategories(filteredCategories);
  }

  function getHouseholdCategories() {
    let filteredCategories = allCategories.filter((category) => {
      if (category.household) {
        return true;
      } else {
        return false;
      }
    });
    setHouseholdCategories(filteredCategories);
  }

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    getUncategorizedProducts();
  }, [products]);

  useEffect(() => {
    getPersonalCategories();
    getHouseholdCategories();
  }, [allCategories]);

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

  //start with create category modal

  return (
    <div>
      <div>
        <CreateProductModal
          getProducts={getProducts}
          categories={displayCategories}
          residents={residents}
        />
        <CreateCategoryModal
          household={household}
          getCategories={getCategories}
          isHousehold={displayingHousehold}
        />
      </div>
      <div>all the stuff you keep in the house!</div>
      <div className="btn-group" role="group">
        <input
          type="radio"
          className="btn-check btn-secondary"
          name="btnradio"
          id="setPersonalCategories"
          autocomplete="off"
          onClick={handlePersonal}
          // checked=""
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
          // checked=""
        />
        <label className="btn btn-outline-primary" for="setHouseholdCategories">
          Household
        </label>
      </div>
      <div>
        {displayCategories.length > 0 ? (
          <div>
            {displayCategories.map((category, index) => {
              return <CategoryContainer category={category} index={index} />;
            })}
            <ProductList products={miscellaneousProducts} />
          </div>
        ) : (
          <p>
            <ProductList products={products} />{" "}
          </p>
        )}
      </div>
      <div>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            At the top- add product OR add category
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Make categories a drop down?
          </li>
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
