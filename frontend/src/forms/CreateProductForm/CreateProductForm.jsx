import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SelectCategoryList from "../../components/ProductComponents/SelectCategoryList/SelectCategoryList";
import SplitWithResidentsList from "../../components/BillComponents/SplitWithResidentsList/SplitWithResidentsList";

const CreateProductForm = ({ getProducts, setShow, residents, categories }) => {
  const [user, token] = useAuth();
  const [productUsers, setProductUsers] = useState([]);
  const [multipleUsers, setMultipleUsers] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productStockLevel, setProductStockedStatus] = useState(2);
  const [productIsHousehold, setProductIsHousehold] = useState(false);
  const [productHousehold, setProductHousehold] = useState("");

  const handleClose = (event) => {
    // event.preventDefault();
    setShow(false);
  };

  async function addProduct() {
    let newProduct = {
      owner: user.id,
      name: productName,
      category: productCategory,
      brand: productBrand,
      description: productDescription,
      users: productUsers,
      stock_level: productStockLevel,
      is_household: productIsHousehold,
      household: productHousehold,
    };

    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/products/`,
        newProduct,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        await getProducts();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  function handleMultipleUsers() {
    setMultipleUsers(!multipleUsers);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct();
    handleClose();
    setProductName("");
    setProductCategory("");
    setProductDescription("");
    setProductBrand(0.0);
  };

  return (
    <form>
      <fieldset>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check btn-secondary"
            name="btnradio"
            id="btnradio1"
            autocomplete="off"
            // checked=""
          />
          <label className="btn btn-outline-primary" for="btnradio1">
            Mine
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            autocomplete="off"
            // checked=""
          />
          <label className="btn btn-outline-primary" for="btnradio2">
            Shared
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio3"
            autocomplete="off"
            // checked=""
          />
          <label className="btn btn-outline-primary" for="btnradio3">
            Household
          </label>
        </div>
        <div className="form-group">
          <label className="form-label mt-4">Product Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Milk, Eggs, Butter..."
            onChange={(event) => setProductName(event.target.value)}
            value={productName}
          />
        </div>
        {/* //////////////////////////// */}
        <div className="form-group">
          <label className="form-label mt-4">Category</label>
          <select
            className="form-select"
            id="exampleSelect2"
            onChange={(event) => setProductCategory(event.target.value)}
          >
            <option value="0">None</option>
            <SelectCategoryList categories={categories} />
          </select>
        </div>
        {/* //////////////////////////// */}
        <div className="form-group">
          <label className="form-label mt-4">Brand (Optional)</label>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Your favorite brand for this product "
              aria-label="Brand"
              onChange={(event) => setProductBrand(event.target.value)}
              value={productBrand}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label mt-4">Description</label>
          <textarea
            type="text"
            className="form-control"
            // style={(resize = "none")}
            rows="3"
            placeholder="Any other details you want to keep track of, or variety of items you like (like *DoubleStuf* Oreos, or *Distilled* water)."
            onChange={(event) => setProductDescription(event.target.value)}
            value={productDescription}
          />
        </div>
        {/* //////////////////////////// */}
        {/* //////////////////////////// */}
        {/* <div className="form-group">
          <label className="form-label mt-4">Quantity</label>
          <input
            type="number"
            className="form-control"
            onChange={(event) => setProductQuantity(event.target.value)}
            value={productQuantity}
          />
        </div> */}
        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkMultipleUsers"
            onChange={() => handleMultipleUsers()}
          />
          <label className="form-check-label" for="flexCheckDefault">
            Add Housemates to this product?
          </label>
        </div>{" "}
        {multipleUsers ? (
          <div className="card border-info p-2">
            <SplitWithResidentsList
              residents={residents}
              users={productUsers}
              setUsers={setProductUsers}
            />
          </div>
        ) : null}
        {/* //////////////////////////// */}
        <div className="form-row">
          <button
            className="btn btn-secondary mt-3"
            type="submit"
            onClick={handleSubmit}
          >
            Create
          </button>
          <button
            className="btn btn-danger mt-3"
            type="reset"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default CreateProductForm;
