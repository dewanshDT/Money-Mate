import React, { useEffect, useContext } from "react";
import Transaction from "./Transaction";
import { TransContext } from "./context/TransContext";
import axios from "axios";

const TransactionList = () => {
  const [trans, setTrans] = useContext(TransContext);

  const getTransactions = async () => {
    try {
      const user = localStorage.getItem("user");
      console.log(user);
      const res = await axios({
        url: `http://localhost:5000/api/${user}/transactions`,
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
        url: `http://localhost:5000/api/${localStorage.getItem(
          "user"
        )}/transactions/${id}`,
        withCredentials: true,
      });
      await getTransactions();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {trans ? trans.map((item) => (
          <Transaction
            trans={item}
            transactions={trans}
            setTrans={setTrans}
            deleteTransaction={deleteTransaction}
            key={item._id}
          />
        )): <li style={{color: "red", textAlign: "center", width: "100%", display: "block"}}>login again</li>}
      </ul>
    </>
  );
};

export default TransactionList;