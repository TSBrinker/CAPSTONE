import axios from "axios";
import React from "react";
import useAuth from "../../hooks/useAuth";

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
    <div>
      <div>
        {request.user.first_name} is requesting to join {request.household.name}
      </div>
      <div>
        <button onClick={handleApproval}>Approve</button>
        <button onClick={handleDenial}>Deny</button>
      </div>
    </div>
  );
};

export default JoinRequestCard;
