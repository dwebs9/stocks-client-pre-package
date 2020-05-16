import { Link } from "react-router-dom";
import patrick from "../static/patrick_edited.png";
import moss from "../static/moss_edited.png";

import React, { Component, useContext } from "react";
import navStyle from "./Nav.css";
import { AuthContext } from "../App";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

// How to style in react
const imgStyle = {
  margin: 50,
  width: "25%",
};

function Nav(props) {
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
        <div>
          {!props.isauth ? <LoginButton /> : <LogoutButton props={props} />}
        </div>
      </ul>
      <img src={moss} alt="Logo" />
    </nav>
  );
}

export default Nav;
