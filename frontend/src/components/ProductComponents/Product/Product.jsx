import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import StockedButton from "../StockButtonComponents/StockedButton/StockedButton";
import LowButton from "../StockButtonComponents/LowButton/LowButton";
import StockButtonGroup from "../StockButtonComponents/StockButtonGroup/StockButtonGroup";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

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

  function handleStocked() {
    setStockLevel(2);
  }

  return (
    <tr className="table-primary">
      <th scope="row">
        {product.name}, {product.stock_level}
      </th>

      {product.brand ? <td>{product.brand}</td> : <td>NA</td>}
      {product.description ? <td>{product.description}</td> : <td>NA</td>}

      <StockButtonGroup product={product} getProducts={getProducts} />
    </tr>
  );
};

export default Product;
