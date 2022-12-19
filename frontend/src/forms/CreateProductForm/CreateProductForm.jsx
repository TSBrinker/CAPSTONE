import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SelectCategoryList from "../../components/ProductComponents/SelectCategoryList/SelectCategoryList";
import SplitWithResidentsList from "../../components/BillComponents/SplitWithResidentsList/SplitWithResidentsList";

const CreateProductForm = ({
  getAllTheThings,
  setShow,

  categories,
  isHousehold,
}) => {
  const [user, token] = useAuth();
  const [productUsers, setProductUsers] = useState([]);
  const [multipleUsers, setMultipleUsers] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productStockLevel, setProductStockLevel] = useState(3);
  const [productIsHousehold, setProductIsHousehold] = useState(isHousehold);

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
        console.log("Products!!!! Done fired.");
        await getAllTheThings();
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
        <div className="form-group">
          <label className="form-label mt-4">Product Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Milk, Eggs, Butter..."
            onChange={(event) => setProductName(event.target.value)}
            value={productName}
            maxLength="50"
          />
        </div>
        {/* //////////////////////////// */}
        <div className="form-group">
          <label className="form-label mt-4">Category</label>
          <select
            className="form-select"
            id={`$category`}
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
              maxLength="50"
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
            maxLength="200"
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
