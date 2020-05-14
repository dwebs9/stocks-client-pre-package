import "./App.css";
import { Link } from "react-router-dom";
import patrick from "./static/patrick_edited.png";
import auth from "./auth";
import React, { useState, useEffect, Component } from "react";

function updateNav() {
  if (auth.isAuthenticated == true) {
    setLoggedIn = true;
  } else {
    setLoggedIn = false;
  }
}
function Nav() {
  // This should be in a css file
  const navStyle = {
    colour: "white",
  };

  function handleClick(e) {
    e.preventDefault();
    console.log("Logout was clicked");
    // Changes the state in auth.js
    auth.logout();
    setLoggedIn(false);
    // Nav.setLoggedIn(false);
    // Auth to update here
    console.log("auth.isAuthenticated");
    console.log(auth.isAuthenticated());
  }

  const [loggedIn, setLoggedIn] = useState("true");

  // var loggedIn = setLoggedIn(auth.isAuthenticated());
  // if is authenticated, return this
  // console.log(props);
  if (loggedIn) {
    return (
      <nav>
        <ul className="nav-links">
          <img src={patrick} alt="Logo" />
          <Link to="/" style={navStyle}>
            <li>Home</li>
          </Link>
          <Link to="/stock/A" style={navStyle}>
            <li>Stocks</li>
          </Link>
          <Link to="/" style={navStyle}>
            <button onClick={handleClick}>Logout</button>
          </Link>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul className="nav-links">
          <img src={patrick} alt="Logo" />
          <Link to="/" style={navStyle}>
            <li>Home</li>
          </Link>
          <Link to="/stock/A" style={navStyle}>
            <li>Stocks</li>
          </Link>
          <Link to="/login" style={navStyle}>
            <li>Login</li>
          </Link>
          <Link to="/register" style={navStyle}>
            <li>Register</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;
