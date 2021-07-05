import axios from "axios";
import React from "react";
import { GlobalContext } from "./context/GlobalContext";

const Header = ({setIsLoggedIn}) => {
  const [url] = React.useContext(GlobalContext);
  const logout = async () => {
    try {
      const res = await axios({url:`${url}/auth/logout`, method: "POST", withCredentials: true});
      console.log(res.data);
      setIsLoggedIn(false);
      localStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="header">
      <h2><img src="/favicon_io/favicon-32x32.png" alt="money mate" /> <span>Money Mate</span></h2>
      <button type="button" className="btn logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
