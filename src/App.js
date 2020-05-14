import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Stock from "./components/Stock";
//Import a component into the file
import Login from "./components/Login";
import Register from "./components/Register";
import React, { Component, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
// import Login from "./Login";
// Renames BrowserRouter as Router (to be called in the code as Router)
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import auth from "./components/auth";

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
