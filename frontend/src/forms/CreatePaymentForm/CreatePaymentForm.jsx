import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const CreatePaymentForm = ({ bill, getPayments, getAllTheThings, portion }) => {
  const [user, token] = useAuth();
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentConfirmation, setPaymentConfirmation] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [show, setShow] = useState(false);

  function handleShow(event) {
    // event.preventDefault();
    setShow(true);
  }
  function handleClose(event) {
    // event.preventDefault();
    setShow(false);
  }

  async function addPayment() {
    let newPayment = {
      amount: paymentAmount,
      confirmation: paymentConfirmation,
      notes: paymentNotes,
      payment_date: paymentDate,
    };

    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/bills/${bill.id}/payments/`,
        newPayment,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        await getPayments();
        await getAllTheThings();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addPayment();
    handleClose();
    setPaymentNotes("");
    setPaymentConfirmation("");
    setPaymentAmount(0.0);
    setPaymentDate("");
  };

  return (
    <div className="d-grid gap-2">
      <button
        className="btn btn-secondary"
        style={{ width: "100%" }}
        onClick={handleShow}
      >
        Make a payment
      </button>
      {show ? (
        <>
          <p className="mb-0">${portion} due.</p>
          <form>
            <fieldset>
              <div className="form-group">
                <label className="form-label mt-2">Amount</label>
                <div className="form-group">
                  <div className="input-group mb-1">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      aria-label="Amount (to the nearest dollar)"
                      onChange={(event) => setPaymentAmount(event.target.value)}
                      value={paymentAmount}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputBillDueDate" className="form-label mt-4">
                  Payment Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(event) => setPaymentDate(event.target.value)}
                  value={paymentDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputBillPayee" className="form-label mt-4">
                  Confirmation
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(Optional) Payment confirmation number, check number, etc."
                  onChange={(event) =>
                    setPaymentConfirmation(event.target.value)
                  }
                  value={paymentConfirmation}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="inputBillDescription"
                  className="form-label mt-4"
                >
                  Notes
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  style={{ resize: "none" }}
                  rows="3"
                  placeholder="Anything else you want to say about it."
                  onChange={(event) => setPaymentNotes(event.target.value)}
                  value={paymentNotes}
                />
              </div>
              <div className="form-row">
                <button
                  className="btn btn-secondary mt-3"
                  type="submit"
                  onClick={(event) => handleSubmit(event)}
                >
                  Create
                </button>
                <button
                  className="btn btn-danger mt-3"
                  onClick={(event) => handleClose(event)}
                >
                  Cancel
                </button>
              </div>
            </fieldset>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default CreatePaymentForm;
