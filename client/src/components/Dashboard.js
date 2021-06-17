import "../App.css";
import React from "react";
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpences from "./IncomeExpences";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";
import Footer from "./Footer";
import { TransContext } from "./context/TransContext";

const Dashboard = () => {
  const [trans] = React.useContext(TransContext);

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
    <a href="/login"><button type="button" className="btn">login</button></a>
    </>
  );
};

export default Dashboard;
