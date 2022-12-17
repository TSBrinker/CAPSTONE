import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import InviteCode from "../InviteCode/InviteCode";

const InviteCodeList = ({ invites, getInvites, admin }) => {
  return (
    <div>
      <Row>
        {invites.map((invite, index) => {
          return (
            <InviteCode admin={admin} invite={invite} getInvites={getInvites} />
          );
        })}
      </Row>

      <div>
        <p className="lead text-muted">
          For security, each household can only generate 3 codes at at time, and
          each code can only be used once.
        </p>
      </div>
    </div>
  );
};

export default InviteCodeList;
