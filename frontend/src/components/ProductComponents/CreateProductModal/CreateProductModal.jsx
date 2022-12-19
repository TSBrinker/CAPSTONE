import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateProductForm from "../../../forms/CreateProductForm/CreateProductForm";
import { Modal } from "react-bootstrap";

const CreateProductModal = ({ getAllTheThings, categories, isHousehold }) => {
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
          <p className="lead mb-0">Add Product</p>
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="top-label">Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateProductForm
            categories={categories}
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
