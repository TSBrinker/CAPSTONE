import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const CreateBillForm = ({ getBills, handleClose }) => {
  const [billName, setBillName] = useState("");
  const [billPayee, setBillPayee] = useState("");
  const [billAmount, setBillAmount] = useState(0.0);
  const [billDueDate, setBillDueDate] = useState("");
  const [billDescription, setBillDescription] = useState("");
  const [billIsSplit, setBillIsSplit] = useState(false);
  const [user, token] = useAuth();

  ///I need to figure out how to add users in the manytomany field :(
  async function addBill() {
    let newBill = {
      name: billName,
      payee: billPayee,
      amount: billAmount,
      due_date: billDueDate,
      description: billDescription,
      is_split: billIsSplit,
    };

    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/bills/`,
        newBill,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        await getBills();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  function handleCheck() {
    setBillIsSplit(!billIsSplit);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addBill();
    handleClose();
    setBillName("");
    setBillPayee("");
    setBillDescription("");
    setBillAmount(0.0);
    setBillDueDate("");
    setBillIsSplit(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="form-group">
          <label for="inputBillName" className="form-label mt-4">
            Bill Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Internet, Utilities, Phone Bill..."
            onChange={(event) => setBillName(event.target.value)}
            value={billName}
          />
        </div>
        {/* //////////////////////////// */}
        <div className="form-group">
          <label for="inputBillPayee" className="form-label mt-4">
            Payee
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Comcast, Verizon, Progressive..."
            onChange={(event) => setBillPayee(event.target.value)}
            value={billPayee}
          />
        </div>
        {/* //////////////////////////// */}
        <div className="form-group">
          <label for="inputBillDescription" className="form-label mt-4">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            // style={(resize = "none")}
            rows="3"
            placeholder="Here's where you can enter any account number or billing addresses, or anything else you want to keep track of or share."
            onChange={(event) => setBillDescription(event.target.value)}
            value={billDescription}
          />
        </div>
        {/* //////////////////////////// */}

        {/* //////////////////////////// */}
        <div className="form-group">
          <label className="form-label mt-4">Amount</label>
          <div className="form-group">
            <div className="input-group mb-1">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
                onChange={(event) => setBillAmount(event.target.value)}
                value={billAmount}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label for="inputBillDueDate" className="form-label mt-4">
            Due Date
          </label>
          <input
            type="date"
            className="form-control"
            onChange={(event) => setBillDueDate(event.target.value)}
            value={billDueDate}
          />
        </div>
        <div class="form-check mt-3">
          <input
            class="form-check-input"
            type="checkbox"
            id="checkBillIsSplit"
            onChange={() => handleCheck()}
            value={billIsSplit}
          />
          <label class="form-check-label" for="flexCheckDefault">
            Split Bill?
          </label>
        </div>
        {billIsSplit ? (
          <div class="form-group">
            i gotta figure out how to return a list of housemates here, and then
            make each div clickable, and when the div gets clicked add that
            housemate's id to a list
          </div>
        ) : null}
        {/* //////////////////////////// */}
        <button className="btn btn-secondary mt-3" type="submit">
          Create
        </button>
      </fieldset>
    </form>
  );
};

export default CreateBillForm;
