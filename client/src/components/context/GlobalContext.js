import React, {useEffect, useState} from "react";
import axios from "axios";

export const GlobalContext = React.createContext();

export const TransProvider = ({ children }) => {
  const [trans, setTrans] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const mainURL = "";

  useEffect(() => {
    setUser(localStorage.getItem("user"))
  }, [localStorage.getItem("user")]);

  const login = async (username, password) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${mainURL}/auth/login`,
        data: {
          username: username,
          password: password,
        },
        withCredentials: true,
      });
      localStorage.setItem("user", res.data);
      console.log(res.data);
      setUser(true);
    } catch (err) {
      console.log(err);
    }
  };

  const registerUser = async (username, password) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${mainURL}/auth/register`,
        data: {
          username: username,
          password: password,
        },
        withCredentials: true,
      });
      localStorage.setItem("user", res.data);
      console.log(res.data.data);
      setUser(true);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      const res = await axios({url:`${mainURL}/auth/logout`, method: "POST", withCredentials: true});
      console.log(res.data);
      localStorage.clear();
      setTrans([]);
    } catch (e) {
      console.log(e);
    }
  };

  const getTransactions = async () => {
    try {
      const user = localStorage.getItem("user");
      console.log(user);
      const res = await axios({
        url: `${mainURL}/api/${user}/transactions`,
        method: "GET",
        withCredentials: true,
      });
      const data = res.data.data;
      console.log(data);
      setTrans(data);
    } catch (e) {
      console.log(e);
    }
  };

  const addTransaction = async (text, amount) => {
    const res = await axios({
      url: `${mainURL}/api/${localStorage.getItem("user")}/transactions`,
      method: "POST",
      withCredentials: true,
      data: {
        description: text,
        amount: amount
      }
    });
    console.log(res)
    getTransactions();
  };

  const deleteTransaction = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `${mainURL}/api/${localStorage.getItem("user")}/transactions/${id}`,
        withCredentials: true,
      });
      await getTransactions();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GlobalContext.Provider value={{trans, setTrans, getTransactions, login, registerUser, logout, user, setUser, deleteTransaction, addTransaction}}>
      {children}
    </GlobalContext.Provider>
  );
};
