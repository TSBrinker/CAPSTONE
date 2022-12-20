import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SplitWithResidentsList from "../../components/BillComponents/SplitWithResidentsList/SplitWithResidentsList";

const CreateBillForm = ({ getAllTheThings, setShow, isHousehold }) => {
  const [billName, setBillName] = useState("");
  const [billPayee, setBillPayee] = useState("");
  const [billAmount, setBillAmount] = useState(0.0);
  const [billDueDate, setBillDueDate] = useState(new Date());
  const [billDescription, setBillDescription] = useState("");

  const [billIsHousehold, setBillIsHousehold] = useState(isHousehold);
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
      // is_split: billIsSplit,
      // users: billUsers,
      is_household: billIsHousehold,
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
        await getAllTheThings();
      }
    } catch (error) {
      console.log(error.response.data);
    }
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
        <div>
          <input hidden readOnly value={isHousehold} />
        </div>
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
