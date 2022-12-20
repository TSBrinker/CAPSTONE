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
      <div className="text-center mt-1"></div>
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
    </div>
  );
};

export default HouseholdPage;
