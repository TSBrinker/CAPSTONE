import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import DeleteInviteCodeButton from "../DeleteInviteCodeButton/DeleteInviteCodeButton";

const InviteCode = ({ invite, getInvites }) => {
  const [user, token] = useAuth();

  return (
    <Col>
      <div className="border radius-1 padding-1">
        <h3>{invite.invite_number}</h3>
        <DeleteInviteCodeButton invite={invite} getInvites={getInvites} />
      </div>
    </Col>
  );
};

export default InviteCode;
