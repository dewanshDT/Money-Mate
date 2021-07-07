import React, { useContext } from "react";
import Transaction from "./Transaction";
import { GlobalContext } from "./context/GlobalContext";

const TransactionList = () => {
  const {trans, setTrans, deleteTransaction} = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {trans ? (
          trans.map((item) => (
            <Transaction
              trans={item}
              transactions={trans}
              setTrans={setTrans}
              deleteTransaction={deleteTransaction}
              key={item._id}
            />
          ))
        ) : (
          <li
            style={{
              color: "red",
              textAlign: "center",
              width: "100%",
              display: "block",
            }}
          >
            login again
          </li>
        )}
      </ul>
    </>
  );
};

export default TransactionList;
