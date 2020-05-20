import { Link } from "react-router-dom";
import patrick from "../static/patrick_edited.png";
import moss from "../static/moss_edited.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from "reactstrap";
import React, { Component, useContext } from "react";
// import navStyle from "./Nav.css";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

// How to style in react
const imgStyle = {
  margin: 1,
  width: "25%",
  display: "flex",
};

const liColour = {
  color: "white",
};

function NavComp(props) {
  return (
    <Navbar className>
      <ul className="nav-links">
        <Link to="/">
          <li style={liColour}>Home</li>
        </Link>
        <Link to="/stock/A">
          <li style={liColour}>Quote</li>
        </Link>
        <div>
          {!props.isauth ? (
            <LoginButton style={liColour} />
          ) : (
            <LogoutButton props={props} />
          )}
        </div>
      </ul>
    </Navbar>
  );
}

export default NavComp;
