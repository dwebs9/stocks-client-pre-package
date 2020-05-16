import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Stock from "./components/Stock";
import Login from "./components/Login";
import Register from "./components/Register";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import auth from "./components/auth";
import { PropertyKeys } from "ag-grid-community";

const url = `http://131.181.190.87:3000/`;
const token = localStorage.getItem("token");
console.log("token");
console.log(token);
const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const AuthContext = React.createContext();

///// Attempted the login/loggout implementation via freeCodeCamp
// Also see slack thread
function App() {
  // const [authed, setAuthed] = useState(false);
  // // TODO
  // // Auth handling here ?
  // useEffect(() => {
  //   if (token != null) {
  //     setAuthed(true);
  //   }
  // });

  console.log("pre-fetch");

  return (
    <Router>
      <div className="App">
        <Nav authed={authed} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/stock/:id/" component={Stock} />
          <Route path="/stock/ " exact component={Stock} />
          <Route path="/stock/auth/id: " exact component={Stock} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
