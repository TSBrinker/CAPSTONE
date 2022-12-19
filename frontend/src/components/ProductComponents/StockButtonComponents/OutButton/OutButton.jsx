import React, { useState, useEffect } from "react";
import axios from "axios";

const OutButton = ({ product }) => {
  return (
    <div>
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="stock3"
        autocomplete="off"
      />
      <label className="btn btn-sm btn-outline-dark bg-light" for="stock3">
        Out
      </label>
    </div>
  );
};

export default OutButton;
