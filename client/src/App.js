import "./App.css"
import React from "react"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import { TransProvider } from "./components/context/GlobalContext"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <TransProvider>
      <Router>
        {/* <Switch> */}
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        {/* </Switch> */}
      </Router>
    </TransProvider>
  )
}

export default App
