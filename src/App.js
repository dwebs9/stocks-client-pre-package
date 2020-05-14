import React from "react";
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

function App() {
  // TODO
  // Auth handling here ?
  var loggedIn = false;
  if (auth.isAuthenticated()) {
    console.log("auth.isAuthenticated is true");
    console.log(auth.isAuthenticated);
    loggedIn = true;
  }

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
