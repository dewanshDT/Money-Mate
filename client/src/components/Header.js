import React from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";

const Header = () => {
  const {logout} = React.useContext(GlobalContext);
  const history = useHistory();

  return (
    <div className="header">
      <h2><img src="/favicon_io/favicon-32x32.png" alt="money mate" /> <span>Money Mate</span></h2>
      <button 
        type="button" 
        className="btn logout" 
        onClick={() => {
          logout();
          history.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
