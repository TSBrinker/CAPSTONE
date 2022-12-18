import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const CreateCategoryForm = ({ getCategories, setShow, household }) => {
  const [user, token] = useAuth();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryIsHousehold, setCategoryIsHousehold] = useState(false);
  const [categoryHousehold, setCategoryHousehold] = useState({});
  // const [listHousemates, setListHousemates] = useState(false);

  const handleClose = (event) => {
    // event.preventDefault();
    setShow(false);
  };

  function handleMine(event) {
    // event.preventDefault();
    setCategoryIsHousehold(false);
    setCategoryHousehold({});
    console.log(household);
    console.log("mine");
  }

  function handleHousehold(event) {
    // event.preventDefault();
    setCategoryIsHousehold(true);
    setCategoryHousehold(household);
    console.log(household);
    console.log("ours");
  }

  async function addCategory() {
    let newCategory = {
      name: categoryName,
      description: categoryDescription,
      is_household: categoryIsHousehold,
    };

    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/categories/`,
        newCategory,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        await getCategories();
      }
    } catch (error) {}
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addCategory();
    handleClose();
    setCategoryDescription("");
    setCategoryName("");
  };

  return (
    <form>
      <fieldset>
        <div className="btn-group" role="group">
          <input
            type="radio"
            className="btn-check btn-secondary"
            name="btnradio"
            id="btnradio1"
            autocomplete="off"
            onClick={handleMine}
            // checked=""
          />
          <label className="btn btn-outline-primary" for="btnradio1">
            Mine
          </label>
          <input
            type="radio"
            className="btn-check btn-secondary"
            name="btnradio"
            id="btnradio2"
            autocomplete="off"
            onClick={handleHousehold}
            // checked=""
          />
          <label className="btn btn-outline-primary" for="btnradio2">
            Household
          </label>
        </div>
        <div className="form-group">
          <label className="form-label mt-4">Category Name</label>
          <input
            required
            type="text"
            className="form-control"
            placeholder="A short name, like Kitchen, Bathroom, Cleaning Supplies..."
            onChange={(event) => setCategoryName(event.target.value)}
            value={categoryName}
          />
        </div>
        {/* //////////////////////////// */}
        <div className="form-group">
          <label className="form-label mt-4">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="(Optional)Add a little more detail to clarify what you're sorting here."
            onChange={(event) => setCategoryDescription(event.target.value)}
            value={categoryDescription}
          />
        </div>
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

export default CreateCategoryForm;
