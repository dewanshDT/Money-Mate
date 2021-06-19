// import React, { useState } from "react";
import Login from "./Login";

const Welcome = ({ setIsLoggedIn }) => {
  //   const [loginForm, setLoginForm] = useState(false);

  return <Login setIsLoggedIn={setIsLoggedIn} />;
};

export default Welcome;
