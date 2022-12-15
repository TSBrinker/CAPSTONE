import React, { useState, useEffect } from "react";

import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = ({ household, requests_amount, pendingRequests }) => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [badgeNumber, setBadgeNumber] = useState(0);
  const [displayBadge, setDisplayBadge] = useState("");

  useEffect(() => {
    if (requests_amount == 0) {
      setDisplayBadge("");
    } else if (requests_amount > 0) {
      setDisplayBadge("badge rounded-pill bg-info");
      setBadgeNumber(requests_amount);
    }
  }, [requests_amount]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/household" className="navbar-brand">
          {household ? <div>{household.name}</div> : <div>Household</div>}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${displayBadge}`}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bills" className="nav-link">
                Bills
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/inventory" className="nav-link" href="#">
                Inventory
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
          </ul>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      </div>
    </nav>
  );

  {
    /* // return household ? (
  //   <nav className="navBar navbar-expand-lg navbar-dark bg-dark">
  //     <div className="container-fluid">
  //       <Link
          to="/"
          className="navbar-brand"
          style={{ textDecoration: "none", color: "white" }}
        >
          <b>Household</b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                to="/household"
                className="nav-link active"
                style={{ textDecoration: "none", color: "white" }}
              >
                <b>{household.name}</b>
              </Link>
              <span className="visually-hidden">(current)</span>
            </li>
            <li className="nav-item">
              <Link
                to="/bills"
                style={{ textDecoration: "none", color: "white" }}
              >
                <b>Bills</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/inventory"
                style={{ textDecoration: "none", color: "white" }}
              >
                <b>Inventory</b>
              </Link>
            </li>
          </ul>
          <div>
            {user ? (
              <button onClick={logoutUser}>Logout</button>
            ) : (
              <button onClick={() => navigate("/login")}>Login</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <div className="navBar navbar-expand-lg navbar-dark bg-dark">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Household</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  ); */
  }
};

export default Navbar;
