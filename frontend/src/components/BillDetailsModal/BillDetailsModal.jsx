import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import CreatePaymentForm from "../../forms/CreatePaymentForm/CreatePaymentForm";
import PaymentsList from "../PaymentsList/PaymentsList";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const BillDetailsModal = ({ bill, getBills }) => {
  const [user, token] = useAuth();
  const [show, setShow] = useState(false);
  const [payments, setPayments] = useState([]);

  async function getPayments() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/bills/${bill.id}/payments/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setPayments(response.data);
  }

  useEffect(() => {
    getPayments();
  }, []);

  function handleShow() {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <div className="d-grid gap-2">
        <button
          className="btn btn-secondary"
          onClick={handleShow}
          type="button"
        >
          <p className="lead">See Details</p>
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="top-label">Bill Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Testing</div>
          <CreatePaymentForm bill={bill} getPayments={getPayments} />
          <PaymentsList bill={bill} payments={payments} getBills={getBills} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BillDetailsModal;
