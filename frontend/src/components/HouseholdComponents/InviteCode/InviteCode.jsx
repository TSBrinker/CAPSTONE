import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import DeleteInviteCodeButton from "../DeleteInviteCodeButton/DeleteInviteCodeButton";

const InviteCode = ({ admin, invite, getInvites }) => {
  const [user, token] = useAuth();

  return (
    <Col>
      <div className="border rounded padding-1">
        <h3>{invite.invite_number}</h3>
        <DeleteInviteCodeButton
          admin={admin}
          invite={invite}
          getInvites={getInvites}
        />
      </div>
    </Col>
  );
};

export default InviteCode;
