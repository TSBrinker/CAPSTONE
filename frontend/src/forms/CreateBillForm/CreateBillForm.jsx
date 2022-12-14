import React, { useState } from "react";

const CreateBillForm = ({}) => {
  const [BillPayee, setBillPayee] = useState("");
  const [amount, setAmount] = useState(0);
  const [descripton, setDescripton] = useState("");
  const [billName, setBillName] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [isSplit, setIsSplit] = useState(false);
  const [creationDate, setCreationDate] = useState(new Date());

  return (
    <form>
      <input placeholder="Bill Payee" />
    </form>
  );
};

export default CreateBillForm;
