// General Imports
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./hooks/useAuth";

import "bootswatch/dist/slate/bootstrap.min.css";
// TODO: Note: Replace ^[theme]^ (examples: darkly, slate, cosmo, spacelab, and superhero. See https://bootswatch.com/ for current theme names.)

import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import BillsPage from "./pages/BillsPage/BillsPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import HouseholdPage from "./pages/HouseholdPage/HouseholdPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [user, token] = useAuth();
  const [household, setHousehold] = useState({});
  const [pendingRequests, setPendingRequests] = useState(false);
  const [householdID, setHouseholdID] = useState(0);
  const [requests, setRequests] = useState([]);

  async function getHousehold() {
    if (user.household_id) {
      console.log("I'm getting a household at App.36");
      let response = await axios.get("http://127.0.0.1:8000/api/households/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setHousehold(response.data);
      setHouseholdID(response.data.id);
    }
  }
  ///////////// Get the requests to join here so it can display a pill when there's a pending request
  useEffect(() => {
    getHousehold();
    if (!user) {
      setHousehold({});
    }
  }, []);
  return (
    <div>
      <Navbar
        household={household}
        requests_amount={requests.length}
        pendingRequests={pendingRequests}
      />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage
                household={household}
                getHousehold={getHousehold}
                setHouseholdID={setHouseholdID}
                householdID={householdID}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/bills"
          element={
            <PrivateRoute>
              <BillsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <InventoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/household"
          element={
            <PrivateRoute>
              <HouseholdPage
                requests={requests}
                setRequests={setRequests}
                pendingRequests={pendingRequests}
                setPendingRequests={setPendingRequests}
              />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
