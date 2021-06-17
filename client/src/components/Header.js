import axios from "axios";
import React from "react";

const Header = () => {
  const logout = async () => {
    try {
      const res = await axios({url:"http://localhost:5000/auth/logout", method: "POST", withCredentials: true});
      console.log(res.data);
      localStorage.clear();
      window.location.href = "/login"
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="header">
      <h2>💸 Money Mate</h2>
      <button type="button" className="btn logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
