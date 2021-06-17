// import axios from "axios";
import React from "react";
import axios from "axios";

export const TransContext = React.createContext();

export const TransProvider = ({ children }) => {
  const [trans, setTrans] = React.useState([]);

  const getTransactions = async () => {
    try {
      const user = localStorage.getItem("user");
      console.log(user);
      const res = await axios({
        url: `/api/${user}/transactions`,
        method: "GET",
        withCredentials: true,
      });
      const data = res.data.data;
      setTrans(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TransContext.Provider value={[trans, setTrans, getTransactions]}>
      {children}
    </TransContext.Provider>
  );
};
