import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const ResidentsList = ({ residents }) => {
  let residentsString = "";
  for (let i = 0; i < residents.length; i++) {
    const resident = residents[i];
    if (residents.length == 1) {
      residentsString += `Just ${resident.nickname}.`;
    } else if (residents.length == 2) {
      if (i == 0) {
        residentsString += `${resident.nickname}`;
      } else if (i == residents.length - 1) {
        residentsString += `and ${resident.nickname}.`;
      }
    } else {
      if (i == 0) {
        residentsString += `${resident.nickname}, `;
      } else if (i == residents.length - 1) {
        residentsString += `and ${resident.nickname}.`;
      } else {
        residentsString += `${resident.nickname}, `;
      }
    }
  }

  return (
    <p className="lead">
      <i>{residentsString}</i>
    </p>
  );
};

export default ResidentsList;
