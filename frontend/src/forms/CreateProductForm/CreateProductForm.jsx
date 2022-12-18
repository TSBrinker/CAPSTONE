import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SplitWithResidentsList from "../../components/ProductComponents/SplitWithResidentsList/SplitWithResidentsList";

const CreateProductForm = ({ getProducts, setShow, residents, categories }) => {
  const [productUsers, setProductUsers] = useState([]);
  const [multipleUsers, setMultipleUsers] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState(0.0);
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [user, token] = useAuth();

  const handleClose = (event) => {
    // event.preventDefault();
    setShow(false);
  };

  async function addProduct() {
    let newProduct = {
      name: productName,
      category: productCategory,
      amount: productBrand,
      quantity: productQuantity,
      description: productDescription,
      users: productUsers,
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

  function handleSplit() {
    setProductIsSplit(!productIsSplit);
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
    setProductQuantity("");
    setProductIsSplit(false);
  };

  return (
    <form>
      <fieldset>
        <div className="form-group">
          <label for="inputProductName" className="form-label mt-4">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Internet, Utilities, Phone Bill..."
            onChange={(event) => setProductName(event.target.value)}
            value={productName}
          />
        </div>
        {/* //////////////////////////// */}
        <div className="form-group">
          <label for="inputProductCategory" className="form-label mt-4">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Comcast, Verizon, Progressive..."
            onChange={(event) => setProductCategory(event.target.value)}
            value={productCategory}
          />
        </div>
        {/* //////////////////////////// */}
        <div className="form-group">
          <label for="inputProductDescription" className="form-label mt-4">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            // style={(resize = "none")}
            rows="3"
            placeholder="Here's where you can enter any account number or producting addresses, or anything else you want to keep track of or share."
            onChange={(event) => setProductDescription(event.target.value)}
            value={productDescription}
          />
        </div>
        {/* //////////////////////////// */}
        {/* //////////////////////////// */}
        <div className="form-group">
          <label className="form-label mt-4">Brand</label>
          <div className="form-group">
            <div className="input-group mb-1">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                aria-label="Brand (to the nearest dollar)"
                onChange={(event) => setProductBrand(event.target.value)}
                value={productBrand}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label for="inputProductQuantity" className="form-label mt-4">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            onChange={(event) => setProductQuantity(event.target.value)}
            value={productQuantity}
          />
        </div>
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
              productUsers={productUsers}
              setProductUsers={setProductUsers}
            />
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkProductIsSplit"
                onChange={() => handleSplit()}
                value={productIsSplit}
              />
              <label className="form-check-label" for="flexCheckDefault">
                Split Product?
              </label>
              <p className="text-muted blockquote-footer mt-2">
                Splitting a product will divide the total between yourself and
                selected users, and any payments a user logs will only apply to
                that user's portion.
              </p>
            </div>{" "}
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
