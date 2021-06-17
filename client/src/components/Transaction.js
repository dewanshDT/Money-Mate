import React from "react";

const Transaction = ({ trans, transactions, setTrans, deleteTransaction }) => {
  const sign = trans.amount > 0 ? "+" : "-";

  return (
    <li className={trans.amount > 0 ? "plus" : "minus"}>
      {trans.description}{" "}
      <span>
        {sign}&#8377;{Math.abs(trans.amount)}
      </span>
      <button className="delete-btn" onClick={() => {deleteTransaction(trans._id)}}>
        &times;
      </button>
    </li>
  );
};

export default Transaction;
