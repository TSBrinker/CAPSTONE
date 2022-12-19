import React, { useState, useEffect } from "react";
import Product from "../Product/Product";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const ProductList = ({ category, productRefresh }) => {
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
    setProducts(response.data);
  }

  useEffect(() => {
    getProducts();
  }, [productRefresh]);

  return products.length > 0 ? (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Brand</th>
            <th scope="col">Description</th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return <Product product={product} index={index} />;
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="text-muted">Add a product to this category!</div>
  );
};

export default ProductList;
