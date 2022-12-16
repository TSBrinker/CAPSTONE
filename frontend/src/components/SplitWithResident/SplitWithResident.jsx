import React, { useState, useEffect } from "react";

const SplitWithResident = ({ resident, handleCheck }) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={resident.id}
        onChange={handleCheck}
      />
      <label className="form-check-label">{resident.nickname}</label>
    </div>
  );
};

export default SplitWithResident;
