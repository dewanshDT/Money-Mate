import React from "react";
import { GlobalContext } from "./context/GlobalContext";

const Balance = () => {
  const {trans, user} = React.useContext(GlobalContext);

  let amounts = trans.map((item) => item.amount);

  const total = amounts.length ? amounts.reduce((acc, cvl) => acc += cvl) : 0;

  return (
    <div>
      <h4>Hello <span style={{textTransform: "capitalize"}}>{user}</span>, your balnce</h4>
      <h1 id="balance">&#8377;{total}</h1>
    </div>
  );
};

export default Balance;
