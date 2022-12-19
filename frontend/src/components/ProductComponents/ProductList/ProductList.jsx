import React, { useState, useEffect } from "react";
import Product from "../Product/Product";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const ProductList = ({ category, getAllTheThings }) => {
  const [user, token] = useAuth();
  const [products, setProducts] = useState([]);

  async function getProducts() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/categories/${category.id}/products/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(
      `getProducts in ProductList for ${category.name} is doing the thing!`
    );
    setProducts(response.data);
  }

  useEffect(() => {
    if (category) {
      getProducts();
    }
  }, [getAllTheThings, category]);

  return products.length > 0 ? (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Brand</th>
            <th scope="col">Description</th>
            <th scope="col">Level</th>
            <th scope="col">Purchases</th>
            {/* <th scope="col">History</th> */}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <Product
                key={index}
                product={product}
                index={index}
                getProducts={getProducts}
              />
            );
          })}
        </tbody>
      </table>
    </>
  ) : (
    <div className="text-muted">Add a product to this category!</div>
  );
};

export default ProductList;
