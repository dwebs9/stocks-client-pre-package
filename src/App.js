import "./App.css";
import Nav from "./Nav";
import Home from "./Home";
import Stock from "./Stock";
//Import a component into the file
import Login from "./Login";
import Register from "./Register";
import React, { Component, useState } from "react";
import "./App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
// import Login from "./Login";
// Renames BrowserRouter as Router (to be called in the code as Router)
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import auth from "./auth";

function App() {
  var loggedIn = false;

  if (auth.isAuthenticated()) {
    console.log("auth.isAuthenticated is true");
    console.log(auth.isAuthenticated);
    loggedIn = true;
  }
  // The <Nav> tag renders the navigation bar
  // The router tag... does something
  // Each route will render the appropriate component
  return (
    <Router>
      <div className="App">
        <Nav loggedIn={loggedIn} />
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
