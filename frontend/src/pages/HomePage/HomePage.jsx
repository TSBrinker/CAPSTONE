import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import BillList from "../../components/BillList/BillList";
import axios from "axios";
import { Container } from "react-bootstrap";

const HomePage = ({ getHousehold }) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();

  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setCars(response.data);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };
  //   fetchCars();
  // }, [token]);

  return user.household_id ? (
    <div>
      <h1>Home Page for {user.username}!</h1>
      <BillList />
    </div>
  ) : (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <Container>
        <div>Create Household</div>
        <div>Join Household</div>
      </Container>
    </div>
  );
};

export default HomePage;
