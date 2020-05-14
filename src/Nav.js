import "./App.css";
import { Link } from "react-router-dom";
import patrick from "./static/patrick_edited.png";
import moss from "./static/moss_edited.png";
import auth from "./auth";
import React, { useState, useEffect, Component } from "react";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    // this.updateNav = this.updateNav.bind(this);
  }
  //This should be in a css file
  navStyle = {
    colour: "white",
  };

  // updateNav() {
  //   if (auth.isAuthenticated == true) {
  //     this.setLoggedIn = true;
  //   } else {
  //     this.setLoggedIn = false;
  //   }
  // }
  handleClick(e) {
    e.preventDefault();
    console.log("Logout was clicked");
    // Changes the state in auth.js
    auth.logout();
    // this.setState({ loggedIn: false });

    // Nav.setLoggedIn(false);
    // Auth to update here
    console.log("auth.isAuthenticated");
    console.log(auth.isAuthenticated());
  }

  // var loggedIn = setLoggedIn(auth.isAuthenticated());
  // if is authenticated, return this
  // console.log(props);
  render() {
    const navStyle = {
      colour: "white",
    };
    console.log("this.props in nav");
    console.log(this.props);
    if (this.props.loggedIn) {
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
              <button onClick={this.handleClick}>Logout</button>
            </Link>
            <img src={moss} alt="Logo" />
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
            <img src={moss} alt="Logo" />
          </ul>
        </nav>
      );
    }
  }
}

export default Nav;
