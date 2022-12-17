import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import JoinRequestContainer from "../../components/HouseholdComponents/JoinRequestsContainer/JoinRequestContainer";
import InvitationContainer from "../../components/HouseholdComponents/InvitationContainer/InvitationContainer";

const HouseholdPage = ({
  pendingRequests,
  setPendingRequests,
  requests,
  setRequests,
  admin,
  householdID,
}) => {
  const [user, token] = useAuth();
  //bring join requests here in their own div
  //create div for creating an invitation. a large box, create invites. 1, 2, 3/3

  return (
    <div>
      <div className="text-center"></div>
      {admin ? (
        <Row>
          <Col>
            <JoinRequestContainer
              requests={requests}
              pendingRequests={pendingRequests}
              setPendingRequests={setPendingRequests}
              setRequests={setRequests}
              admin={admin}
              householdID={householdID}
            />
          </Col>
          <Col>
            <InvitationContainer householdID={householdID} admin={admin} />
          </Col>
        </Row>
      ) : null}
      <div>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            See household members
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            BACKLOG select a resident, pop up a modal, and either remove them or
            make them an admin
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HouseholdPage;
