import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateProductForm from "../../../forms/CreateProductForm/CreateProductForm";
import { Modal } from "react-bootstrap";

const CreateProductModal = ({ getAllTheThings, category, isHousehold }) => {
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
      <div className="d-grid gap-2">
        <button
          className="btn btn-secondary mx-auto"
          onClick={handleShow}
          type="button"
        >
          New
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="top-label">Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateProductForm
            category={category}
            getAllTheThings={getAllTheThings}
            setShow={setShow}
            isHousehold={isHousehold}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateProductModal;
