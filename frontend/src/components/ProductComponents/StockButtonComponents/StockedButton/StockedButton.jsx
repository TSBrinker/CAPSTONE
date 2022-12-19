import React, { useState, useEffect } from "react";
import axios from "axios";

const StockedButton = ({ product }) => {
  return (
    <div>
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="stock1"
        autocomplete="off"
      />
      <label className="btn btn-sm btn-outline-dark bg-light" for="stock1">
        Stocked
      </label>
    </div>
  );
};

export default StockedButton;
