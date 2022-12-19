import React, { useState, useEffect } from "react";
import ProductList from "../ProductList/ProductList";

const CategoryContainer = ({ category }) => {
  return (
    <div className="border border-rounded border-secondary m-4 p-2">
      <h3>{category.name}</h3>
      {category.description ? (
        <p className="blockquote-footer">{category.description}</p>
      ) : null}
    </div>
  );
};

export default CategoryContainer;
