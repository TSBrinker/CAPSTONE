import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SplitWithResidentsList from "../../components/BillComponents/SplitWithResidentsList/SplitWithResidentsList";

const CreateBillForm = ({ getBills, setShow, residents }) => {
  const [billName, setBillName] = useState("");
  const [billPayee, setBillPayee] = useState("");
  const [billAmount, setBillAmount] = useState(0.0);
  const [billDueDate, setBillDueDate] = useState(new Date());
  const [billDescription, setBillDescription] = useState("");
  const [billIsSplit, setBillIsSplit] = useState(false);
  const [multipleUsers, setMultipleUsers] = useState(false);
  const [billUsers, setBillUsers] = useState([]);
  const [user, token] = useAuth();

  const handleClose = (event) => {
    // event.preventDefault();
    setShow(false);
  };

  async function addBill() {
    let newBill = {
      name: billName,
      payee: billPayee,
      amount: billAmount,
      due_date: billDueDate,
      description: billDescription,
      is_split: billIsSplit,
      users: billUsers,
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

  function handleSplit() {
    setBillIsSplit(!billIsSplit);
  }

  function handleMultipleUsers() {
    setMultipleUsers(!multipleUsers);
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
    <form>
      <fieldset>
        <div className="form-group">
          <label htmlFor="inputBillName" className="form-label mt-4">
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
          <label htmlFor="inputBillPayee" className="form-label mt-4">
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
          <label htmlFor="inputBillDescription" className="form-label mt-4">
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
          <label htmlFor="inputBillDueDate" className="form-label mt-4">
            Due Date
          </label>
          <input
            type="date"
            className="form-control"
            onChange={(event) => setBillDueDate(event.target.value)}
            value={billDueDate}
          />
        </div>
        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkMultipleUsers"
            onChange={() => handleMultipleUsers()}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Add Housemates to this bill?
          </label>
        </div>{" "}
        {multipleUsers ? (
          <div className="card border-info p-2">
            <SplitWithResidentsList
              residents={residents}
              users={billUsers}
              setUsers={setBillUsers}
            />
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkBillIsSplit"
                onChange={() => handleSplit()}
                value={billIsSplit}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Split Bill?
              </label>
              <p className="text-muted blockquote-footer mt-2">
                Splitting a bill will divide the total between yourself and
                selected users, and any payments a user logs will only apply to
                that user's portion.
              </p>
            </div>{" "}
          </div>
        ) : null}
        {/* //////////////////////////// */}
        <div className="form-row">
          <button
            className="btn btn-secondary mt-3"
            type="submit"
            onClick={handleSubmit}
          >
            Create
          </button>
          <button
            className="btn btn-danger mt-3"
            type="reset"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default CreateBillForm;
