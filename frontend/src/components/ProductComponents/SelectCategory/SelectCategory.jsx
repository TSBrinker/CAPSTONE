import React, { useState, useEffect } from "react";

const SelectCategory = ({ category, index }) => {
  let value = category.id;
  return <option value={value}>{category.name}</option>;
};

export default SelectCategory;
