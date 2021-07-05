// import axios from "axios";
import React from "react";
import axios from "axios";

export const GlobalContext = React.createContext();

export const TransProvider = ({ children }) => {
  const [trans, setTrans] = React.useState([]);

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
      console.log(data)
      setTrans(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GlobalContext.Provider value={[trans, setTrans, getTransactions]}>
      {children}
    </GlobalContext.Provider>
  );
};
