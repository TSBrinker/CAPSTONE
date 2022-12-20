import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import CreateBillForm from "../../../forms/CreateBillForm/CreateBillForm";

const CreateBillModal = ({ getBills, residents }) => {
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
    <>
      <div className="d-grid gap-2 mt-5">
        <button
          className="btn btn-secondary mx-auto"
          onClick={handleShow}
          type="button"
        >
          <>Add Bill</>
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="top-label">Create Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBillForm
            getBills={getBills}
            setShow={setShow}
            residents={residents}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateBillModal;
