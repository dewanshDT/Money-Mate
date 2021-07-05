import "../App.css";
import React, { useEffect, useContext } from "react";
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpences from "./IncomeExpences";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";
import Footer from "./Footer";
import { GlobalContext } from "./context/GlobalContext";
import axios from "axios";

const Dashboard = ({ setIsLoggedIn }) => {
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
      console.log(res.data);
      setTrans(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("🌋Mounted");
    getTransactions();
  }, []);

  return trans ? (
    <>
      <Header setIsLoggedIn={setIsLoggedIn} />
      <div className="container">
        <Balance />
        <IncomeExpences />
        <AddTransaction />
        <TransactionList />
      </div>
      <Footer />
    </>
  ) : (
    <>
      <h1 className="login-message">
        something went wrong, please login again 😅
      </h1>
      <button
        type="button"
        className="btn"
        onClick={() => {
          setIsLoggedIn(false);
        }}
      >
        login
      </button>
    </>
  );
};

export default Dashboard;
