import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const ResidentsList = ({}) => {
  const [residents, setResidents] = useState([]);
  const [user, token] = useAuth();

  async function getResidents() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/households/housemates/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if ((response.status = 200)) {
      setResidents(response.data);
    }
  }

  let residentsString = "";
  for (let i = 0; i < residents.length; i++) {
    const resident = residents[i];
    if (i == residents.length - 1) {
      residentsString += `and ${resident.username}.`;
    } else {
      residentsString += `${resident.username}, `;
    }
  }

  useEffect(() => {
    getResidents();
  }, []);

  return (
    <p className="lead">
      <i>{residentsString}</i>
    </p>
  );
};

export default ResidentsList;
