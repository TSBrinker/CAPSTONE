import React, { useState, useEffect } from "react";
import ProductList from "../ProductList/ProductList";

const CategoryContainer = ({ category, products }) => {
  return (
    <div className="border border-rounded border-secondary mx-4 my-2 p-2">
      <h3>
        {category.name} ({category.id})
      </h3>
      {category.description ? (
        <p className="blockquote-footer mt-1">{category.description}</p>
      ) : null}
      <ProductList category={category} products={products} />
    </div>
  );
};

export default CategoryContainer;
