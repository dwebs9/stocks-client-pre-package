import { Link } from "react-router-dom";
import patrick from "../static/patrick_edited.png";
import moss from "../static/moss_edited.png";
import auth from "./auth";
import React, { Component, useContext, AuthContext } from "react";
import navStyle from "./Nav.css";
import useLoginStatus from "./LoginStatus";

// How to style in react
const imgStyle = {
  margin: 50,
  width: "25%",
};

function Nav() {
  const { loginStatus } = useContext(AuthContext);
  const { isLoggedIn, loggedInRender, LoggedOutRender } = useLoginStatus();
  return (
    <nav class="navbar navbar-expand bg-base-blue text-white py-2">
      <img src={patrick} alt="Logo" style={imgStyle} />
      <ul className="nav-links">
        <Link to="/" style={navStyle}>
          <li>Home</li>
        </Link>
        <Link to="/stock/A">
          <li>Stocks</li>
        </Link>
        {isLoggedIn ? loggedInRender() : LoggedOutRender()}
        {/* <Link to="/login">
          <li>Login</li>
        </Link>
        <Link to="/register">
          <li>Register</li>
        </Link> */}
      </ul>
      <img src={moss} alt="Logo" />
    </nav>
  );
}

export default Nav;
