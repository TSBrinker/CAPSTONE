import React, { useState, useEffect } from "react";
import ProductList from "../ProductList/ProductList";
import CreateProductModal from "../CreateProductModal/CreateProductModal";

const CategoryContainer = ({ category, getAllTheThings, isHousehold }) => {
  return (
    <div className="border border-rounded border-secondary mx-4 my-2 p-2">
      <div className="d-flex justify-content-between align-items-center">
        {/* <div className="d-flex justify-content-between align-items-center"> */}
        <h3>{category.name}</h3>
        {category.description ? (
          <p className="text-muted ml-5">{category.description}</p>
        ) : null}
        {/* </div> */}
        <CreateProductModal
          getAllTheThings={getAllTheThings}
          isHousehold={isHousehold}
          category={category}
        />
      </div>
      <ProductList category={category} />
    </div>
  );
};

export default CategoryContainer;
