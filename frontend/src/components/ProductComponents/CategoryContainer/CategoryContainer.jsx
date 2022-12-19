import React, { useState, useEffect } from "react";
import ProductList from "../ProductList/ProductList";

const CategoryContainer = ({ category }) => {
  return (
    <div className="border border-rounded border-secondary mx-4 my-2 p-2">
      <h3>{category.name}</h3>
      {category.description ? (
        <p className="blockquote-footer mt-1">{category.description}</p>
      ) : null}
      <ProductList category={category} />
    </div>
  );
};

export default CategoryContainer;
