import React, { useState, useEffect } from "react";
import SelectCategory from "../SelectCategory/SelectCategory";

const SelectCategoryList = ({ categories }) => {
  return categories.map((category, index) => {
    return <SelectCategory key={index} category={category} index={index} />;
  });
};

export default SelectCategoryList;
