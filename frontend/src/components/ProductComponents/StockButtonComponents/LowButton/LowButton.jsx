import React, { useState, useEffect } from "react";

import axios from "axios";

const LowButton = ({ product }) => {
  return (
    <div>
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="stock2"
        autocomplete="off"
      />
      <label className="btn btn-sm btn-outline-dark bg-light" for="stock2">
        Low
      </label>
    </div>
  );
};

export default LowButton;
