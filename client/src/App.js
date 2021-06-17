import "./App.css";
import React from "react";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TransProvider } from "./components/context/TransContext";

function App() {
  const [user] = React.useState(localStorage.getItem("user"));

  return (
    <TransProvider>
    <Router>
      <Switch>
      <Route exact path="/">{user ? <Dashboard /> : <Login user={user} />}</Route>
        <Route exact path="/login">
          <Login user={user} />
        </Route>
        <Route path="/register" exact component={Register} />
        {user && <Route path="/dashboard" exact component={Dashboard} />}
      </Switch>
    </Router>
    </TransProvider>
  );
}

export default App;
