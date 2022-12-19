import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import StockedButton from "../StockButtonComponents/StockedButton/StockedButton";
import LowButton from "../StockButtonComponents/LowButton/LowButton";
import StockButtonGroup from "../StockButtonComponents/StockButtonGroup/StockButtonGroup";

const Product = ({ product, index }) => {
  const [highlight, setHighlight] = useState("primary");
  return (
    <tr className="table-primary">
      <th scope="row">
        {product.name}, {product.stock_level}
      </th>

      {product.brand ? <td>{product.brand}</td> : <td>NA</td>}
      {product.description ? <td>{product.description}</td> : <td>NA</td>}
      <td>
        <StockButtonGroup product={product} />
      </td>
    </tr>
  );
};

export default Product;
