import { Link } from "react-router-dom";
import patrick from "../static/patrick_edited.png";
import moss from "../static/moss_edited.png";

import React, { Component, useContext } from "react";
import navStyle from "./Nav.css";
import { AuthContext } from "../App";
import Logout from "./LogoutButton";

const initialState = {
  songs: [],
  isFetching: false,
  hasError: false,
};

const liColour = {
  color: "white",
  size: "50%",
  padding: "5px",
};

const reducer = (state, action) => {};

export const LoginButton = () => {
  return (
    <React.Fragment>
      <Link to="/login">
        <li style={liColour}>Login</li>
      </Link>
      <Link to="/register">
        <li style={liColour}>Register</li>
      </Link>
    </React.Fragment>
  );
};
export default LoginButton;
