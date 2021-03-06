import React from "react";
import { GlobalContext } from "./context/GlobalContext";

const AddTransaction = () => {
  const [text, setText] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const {addTransaction} = React.useContext(GlobalContext);

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        addTransaction(text, amount);
        setText("");
        setAmount("");
        }}>
        <h3>Add new transaction</h3>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="enter text"
            required
          />
        </div>
        
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="enter amount"
            required
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
