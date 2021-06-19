import "./App.css";
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { TransProvider } from "./components/context/GlobalContext";

function App() {
  const [user] = useState(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);

  return (
    <TransProvider>
      {isLoggedIn ? (
        <Dashboard setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login user={user} setIsLoggedIn={setIsLoggedIn} />
      )}
    </TransProvider>
  );
}

export default App;
