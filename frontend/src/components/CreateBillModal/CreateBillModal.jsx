import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import CreateBillForm from "../../forms/CreateBillForm/CreateBillForm";

const CreateBillModal = ({ getBills, residents }) => {
  const [show, setShow] = useState(false);

  function handleShow() {
    // event.preventDefault();
    setShow(true);
  }
  const handleClose = (event) => {
    event.preventDefault();
    setShow(false);
  };

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

      <div id="myModal" class="modal">
        {/* <!-- Modal content --> */}
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>

      {/* <Modal show={show} onHide={(event) => handleClose(event)}>
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
      </Modal> */}
    </>
  );
};

export default CreateBillModal;
