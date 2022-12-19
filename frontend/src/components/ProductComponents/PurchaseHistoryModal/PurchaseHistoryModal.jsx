import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Modal, Row, Col } from "react-bootstrap";
import PurchasesList from "../PurchasesList/PurchasesList";

const PurchaseHistoryModal = ({ product }) => {
  const [user, token] = useAuth();
  const [show, setShow] = useState(false);
  const [purchases, setPurchases] = useState([]);

  async function getProductsPurchases() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/products/${product.id}/purchases/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if ((response.status = 200)) {
      setPurchases(response.data);
    }
  }

  useEffect(() => {
    getProductsPurchases();
  }, [product]);

  function handleShow() {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <button
        className="btn btn-outline-dark bg-light btn-sm"
        style={{ width: "100%" }}
        onClick={handleShow}
        type="button"
      >
        History
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="top-label">Purchase History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PurchasesList purchases={purchases} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PurchaseHistoryModal;
