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

function NavComp(props) {
  return (
    <Navbar>
      <NavbarBrand href="/">
        {/* <img src={patrick} alt="Logo" style={imgStyle} /> */}
      </NavbarBrand>
      {/* <Nav className="mr-auto" navbar></Nav> */}

      <ul className="nav-links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/stock/A">
          <li>Quote</li>
        </Link>
        <div>
          {!props.isauth ? <LoginButton /> : <LogoutButton props={props} />}
        </div>
      </ul>
    </Navbar>
  );
}

export default NavComp;
{
  /* <nav class="navbar navbar-expand bg-base-blue text-white py-2">
      <img src={patrick} alt="Logo" style={imgStyle} />
      <ul className="nav-links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/stock/A">
          <li>Quote</li>
        </Link>
        <div>
          {!props.isauth ? <LoginButton /> : <LogoutButton props={props} />}
        </div>
      </ul>
      <img src={moss} alt="Logo" />
    </nav> */
}
