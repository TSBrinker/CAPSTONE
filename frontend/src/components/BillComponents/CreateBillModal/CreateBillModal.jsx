import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import CreateBillForm from "../../../forms/CreateBillForm/CreateBillForm";

const CreateBillModal = ({ getAllTheThings, isHousehold }) => {
  const [show, setShow] = useState(false);

  function handleShow() {
    // event.preventDefault();
    setShow(true);
  }
  const handleClose = (event) => {
    // event.preventDefault();
    setShow(false);
  };

  return (
    <div>
      <div>
        <button
          className="btn btn-secondary btn my-1"
          onClick={handleShow}
          type="button"
        >
          Add Bill
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="top-label">Create Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBillForm
            getAllTheThings={getAllTheThings}
            setShow={setShow}
            isHousehold={isHousehold}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateBillModal;
