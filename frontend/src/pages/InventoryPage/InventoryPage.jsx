import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CreateCategoryModal from "../../components/ProductComponents/CreateCategoryModal/CreateCategoryModal";
import CreateProductModal from "../../components/ProductComponents/CreateProductModal/CreateProductModal";

const InventoryPage = ({}) => {
  const [user, token] = useAuth();
  const [categories, setCategories] = useState();

  async function getCategories() {
    let response = await axios.get("http://127.0.0.1:8000/api/categories/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setCategories(response.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  //start with create category modal

  return (
    <div>
      <div>
        <CreateCategoryModal categories={categories} />
      </div>
      <div>all the stuff you keep in the house!</div>
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
