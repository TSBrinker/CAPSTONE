import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateCategoryForm from "../../../forms/CreateCategoryForm/CreateCategoryForm";
import { Modal } from "react-bootstrap";

const CreateCategoryModal = ({ getCategories, isHousehold }) => {
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
          className="btn btn-secondary btn-large mx-auto"
          onClick={handleShow}
          type="button"
        >
          <p className="lead mb-0">Create Category</p>
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="top-label">Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateCategoryForm
            isHousehold={isHousehold}
            getCategories={getCategories}
            setShow={setShow}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateCategoryModal;
