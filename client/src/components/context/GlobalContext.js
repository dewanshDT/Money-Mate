// import axios from "axios";
import React from "react";
import axios from "axios";

export const GlobalContext = React.createContext();

export const TransProvider = ({ children }) => {
  const [trans, setTrans] = React.useState([]);
  const [url, seturl] = React.useState(
    process.env.NODE_ENV == "development"
      ? "http://localhost:5000"
      : ""
  );

  const getTransactions = async () => {
    try {
      const user = localStorage.getItem("user");
      console.log(user);
      const res = await axios({
        url: `${url}/api/${user}/transactions`,
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

  return (
    <GlobalContext.Provider value={[trans, setTrans, getTransactions, url]}>
      {children}
    </GlobalContext.Provider>
  );
};
