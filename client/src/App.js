import "./App.css";
import React from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { TransProvider } from "./components/context/GlobalContext";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {

  return (
    <TransProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </TransProvider>
  );
}

export default App;
