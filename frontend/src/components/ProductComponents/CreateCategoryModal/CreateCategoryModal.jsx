import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateCategoryForm from "../../../forms/CreateCategoryForm/CreateCategoryForm";
import { Modal } from "react-bootstrap";

const CreateCategoryModal = ({ getAllTheThings, isHousehold }) => {
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
          className="btn btn-secondary btn-sm mt-1"
          onClick={handleShow}
          type="button"
        >
          Create Category
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="top-label">Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateCategoryForm
            isHousehold={isHousehold}
            getAllTheThings={getAllTheThings}
            setShow={setShow}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateCategoryModal;
