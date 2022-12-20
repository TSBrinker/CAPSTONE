import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import CreatePaymentForm from "../../../forms/CreatePaymentForm/CreatePaymentForm";
import PaymentsList from "../PaymentsList/PaymentsList";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const BillDetailsModal = ({ bill, getBills, payments, getPayments }) => {
  const [user, token] = useAuth();
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <div className="w-100">
        <button
          className="btn btn-primary btn btn-block"
          style={{ width: "100%" }}
          onClick={handleShow}
          type="button"
        >
          Payments
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="top-label">Payments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{bill.description}</h4>

          <CreatePaymentForm
            bill={bill}
            getPayments={getPayments}
            getBills={getBills}
          />

          <PaymentsList bill={bill} payments={payments} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BillDetailsModal;
