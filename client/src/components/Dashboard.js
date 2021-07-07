import "../App.css";
import React, { useEffect, useContext } from "react";
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpences from "./IncomeExpences";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";
import Footer from "./Footer";
import { GlobalContext } from "./context/GlobalContext";
import { useHistory } from "react-router";

const Dashboard = () => {
  const {trans, getTransactions, user} = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    console.log("🌋Mounted");
    getTransactions();
  }, [user]);

  return trans ? (
    <>
      <Header />
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
          localStorage.clear();
          history.push("/login");
        }}
      >
        login
      </button>
    </>
  );
};

export default Dashboard;
