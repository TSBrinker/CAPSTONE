import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const HouseholdPage = ({}) => {
  //bring join requests here in their own div
  //create div for creating an invitation. a large box, create invites. 1, 2, 3/3

  return (
    <div>
      <div className="text-center">
        <Row>
          <Col>the requests box is gonna go here</Col>
          <Col>The invites box is gonna go here</Col>
        </Row>
      </div>
      <div>
        <ul className="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            See household members
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Generate Invite Code
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            See join requests
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            BACKLOG select a resident, pop up a modal, and either remove them or
            make them an admin
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HouseholdPage;
