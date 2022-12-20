import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import ShoppingPurchaseButton from "../ShoppingPurchaseButton/ShoppingPurchaseButton";
import PurchaseHistoryModal from "../../ProductComponents/PurchaseHistoryModal/PurchaseHistoryModal";

const ShoppingProduct = ({ product, index, getProducts }) => {
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
    if (product.stock_level == 2) {
      setHighlight("warning");
    } else {
      setHighlight("danger");
    }
  }, []);

  useEffect(() => {
    if (stockLevel != product.stock_level) {
      updateStockLevel();
    }
  }, [stockLevel]);

  return (
    <tr className={`table-${highlight}`}>
      <th scope="row">{product.name}</th>

      {product.brand ? <td>{product.brand}</td> : <td>NA</td>}
      {product.description ? <td>{product.description}</td> : <td>NA</td>}

      <td>
        <ShoppingPurchaseButton product={product} getProducts={getProducts} />
      </td>
      <td>
        <PurchaseHistoryModal product={product} />
      </td>
    </tr>
  );
};

export default ShoppingProduct;
