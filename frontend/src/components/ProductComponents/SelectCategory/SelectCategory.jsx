import React, { useState, useEffect } from "react";

const SelectCategory = ({ category, index }) => {
  const [value, setValue] = useState(category.id);

  return (
    <option value={value}>
      {category.name} ({category.id})
    </option>
  );
};

export default SelectCategory;
