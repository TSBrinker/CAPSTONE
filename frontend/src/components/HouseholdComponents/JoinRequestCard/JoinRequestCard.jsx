import axios from "axios";
import React from "react";
import useAuth from "../../../hooks/useAuth";

const JoinRequestCard = ({ request, getRequests }) => {
  const [user, token] = useAuth();

  // async function approveRequest() {
  //   console.log("I'm trying to approve this request!");
  //   let response = await axios.patch(
  //     `http://127.0.0.1:8000/api/join_requests/${request.id}/`,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     }
  //   );
  //   console.log(response.status, response.statusText);
  //   await getRequests();
  // }
  async function approveRequest() {
    await axios.patch(
      `http://127.0.0.1:8000/api/join_requests/${request.id}/`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    await getRequests();
  }

  async function denyRequest() {
    await axios.delete(
      `http://127.0.0.1:8000/api/join_requests/${request.id}/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    await getRequests();
  }

  function handleApproval(event) {
    event.preventDefault();
    approveRequest();
    // getRequests();
  }

  function handleDenial(event) {
    event.preventDefault();
    denyRequest();
    // getRequests();
  }

  return (
    <div className="border rounded padding-1 my-3 mx-2 bg-dark">
      <div className="border-bottom">
        <h3 className="p-2">
          {request.user.first_name} is requesting to join{" "}
          {request.household.name}
        </h3>
      </div>
      <div className="btn-group my-3">
        <button className="btn btn-success" onClick={handleApproval}>
          Approve
        </button>
        <button className="btn btn-danger" onClick={handleDenial}>
          Deny
        </button>
      </div>
    </div>
  );
};

export default JoinRequestCard;
