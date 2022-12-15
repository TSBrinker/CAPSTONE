import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import BillList from "../../components/BillList/BillList";
import axios from "axios";
import { Container, Modal } from "react-bootstrap";
import CreateHouseholdForm from "../../forms/CreateHouseholdForm/CreateHouseholdForm";
import FindHouseholdForm from "../../forms/FindHouseholdForm/FindHouseholdForm";
import JoinRequestList from "../../components/JoinRequestList/JoinRequestList";
import AcceptInviteForm from "../../forms/AcceptInviteForm/AcceptInviteForm";

const HomePage = ({ getHousehold }) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [householdID, setHouseholdID] = useState(user.household_id);
  const [pendingRequests, setPendingRequests] = useState(true);
  const [requests, setRequests] = useState([]);

  async function getRequests() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/households/${householdID}/join_requests/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if ((response.status = 201)) {
      setRequests(response.data);
    }
  }

  useEffect(() => {
    getRequests();
  }, []);

  useEffect(() => {
    if (requests.length > 0) {
      setPendingRequests(true);
      console.log("We got requests!");
    } else {
      setPendingRequests(false);
      console.log("We got nothin");
    }
  }, [requests]);

  return householdID ? (
    <div>
      <h1>Home Page for {user.username}!</h1>
      {pendingRequests ? (
        <div>
          <JoinRequestList requests={requests} getRequests={getRequests} />
        </div>
      ) : null}
      <BillList />
    </div>
  ) : (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <Container>
        <div className="border border-3 rounded border-primary p-3">
          <p>Enter an Invite Number</p>
          <AcceptInviteForm
            setHouseholdID={setHouseholdID}
            getHousehold={getHousehold}
          />
        </div>
        <p>------ or ------</p>
        <div className="border border-3 rounded border-primary p-3">
          <p>Find a Household to Join</p>
          <FindHouseholdForm />
        </div>
        <p>------ or ------</p>
        <div className="border border-3 rounded border-primary p-3">
          <p>Get started with a brand new Household</p>
          <CreateHouseholdForm
            setHouseholdID={setHouseholdID}
            getHousehold={getHousehold}
          />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;

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
// console.log(
//   `user: ${user.id}, ${user.username}, ${user.first_name} ${user.email}`
// );
// console.log(`household.name: ${household.name}, id: ${household.id}`);
// console.log(`user.username: ${user.username}`);
