import React, { useState, useEffect } from "react";
import Product from "../Product/Product";

const ProductList = ({ products }) => {
  return products.length > 0 ? (
    <div>
      <Product />
    </div>
  ) : (
    <div>gotta start buying stuff!</div>
  );
};

export default ProductList;
