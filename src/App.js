import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Logout from "./components/LogoutButton";
import LoginButton from "./components/LoginButton";
import Stock from "./components/Stock";
import Login from "./components/Login";
import Register from "./components/Register";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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

var initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("Localstorage set");
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGOUT":
      console.log("Localstorage cleared");
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
///// Attempted the login/loggout implementation via freeCodeCamp
// Also see slack thread
function App() {
  if (token != null) {
    console.log("token != null");
    initialState = {
      isAuthenticated: true,
      user: localStorage.getItem("user"),
      token: token,
    };
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Router>
        <div className="App">
          <Nav isauth={state.isAuthenticated} dispatch={dispatch} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/stock/:id/" component={Stock} />

            <Route path="/stock/auth/id: " exact component={Stock} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
