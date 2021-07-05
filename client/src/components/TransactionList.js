import React, { useContext } from "react";
import Transaction from "./Transaction";
import { GlobalContext } from "./context/GlobalContext";
import axios from "axios";

const TransactionList = () => {
  const [trans, setTrans] = useContext(GlobalContext);

  const getTransactions = async () => {
    try {
      const user = localStorage.getItem("user");
      console.log(user);
      const res = await axios({
        url: `http://money-mate.herokuapp.com/api/${user}/transactions`,
        method: "GET",
        withCredentials: true,
      });
      const data = res.data.data;
      setTrans(data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `http://money-mate.herokuapp.com/api/${localStorage.getItem("user")}/transactions/${id}`,
        withCredentials: true,
      });
      await getTransactions();
    } catch (e) {
      console.log(e);
    }
  };

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
