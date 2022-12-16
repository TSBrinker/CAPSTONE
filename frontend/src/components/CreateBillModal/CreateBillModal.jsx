import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import CreateBillForm from "../../forms/CreateBillForm/CreateBillForm";

const CreateBillModal = ({ getBills }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-grid gap-2">
        <button
          className="btn btn-secondary btn-large"
          onClick={handleShow}
          type="button"
        >
          <b>Add Bill</b>
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="top-label">Create Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBillForm getBills={getBills} handleClose={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateBillModal;
