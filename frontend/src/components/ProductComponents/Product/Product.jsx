import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import StockedButton from "../StockButtonComponents/StockedButton/StockedButton";
import LowButton from "../StockButtonComponents/LowButton/LowButton";
import StockButtonGroup from "../StockButtonComponents/StockButtonGroup/StockButtonGroup";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import PurchaseButton from "../PurchaseButton/PurchaseButton";

const Product = ({ product, index, getProducts }) => {
  const [user, token] = useAuth();
  const [highlight, setHighlight] = useState("primary");
  const [stockLevel, setStockLevel] = useState(product.stock_level);

  async function updateStockLevel() {
    console.log("This happened", product);
    let response = await axios.patch(
      `http://127.0.0.1:8000/api/products/${product.id}/update/${stockLevel}/`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if ((response.status = 202)) {
      await getProducts();
      console.log(response.data);
      // await getHousehold(response);
    }
  }

  useEffect(() => {
    if (stockLevel != product.stock_level) {
      updateStockLevel();
    }
  }, [stockLevel]);

  return (
    <tr className="table-primary">
      <th scope="row">
        {product.name}, {product.stock_level}
      </th>

      {product.brand ? <td>{product.brand}</td> : <td>NA</td>}
      {product.description ? <td>{product.description}</td> : <td>NA</td>}
      <td
        className=" rounded-0"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <StockButtonGroup product={product} getProducts={getProducts} />
      </td>
      <td>
        <PurchaseButton product={product} getProducts={getProducts} />
      </td>
    </tr>
  );
};

export default Product;
