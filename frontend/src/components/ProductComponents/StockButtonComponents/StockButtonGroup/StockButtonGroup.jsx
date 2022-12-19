import React, { useState, useEffect } from "react";
import LowButton from "../LowButton/LowButton";
import OutButton from "../OutButton/OutButton";
import StockedButton from "../StockedButton/StockedButton";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";

const StockButtonGroup = ({ product, getProducts }) => {
  const [user, token] = useAuth();
  const [stockLevel, setStockLevel] = useState(product.stock_level);

  async function updateStockLevel() {
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
    }
  }

  useEffect(() => {
    if (stockLevel != product.stock_level) {
      updateStockLevel();
    }
  }, [stockLevel]);

  return (
    <td
      className="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <StockedButton product={product} setStockLevel={setStockLevel} />
      <LowButton product={product} setStockLevel={setStockLevel} />
      <OutButton product={product} setStockLevel={setStockLevel} />
    </td>
  );
};

export default StockButtonGroup;
