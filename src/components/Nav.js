import { Link } from "react-router-dom";
import patrick from "../static/patrick_edited.png";
import moss from "../static/moss_edited.png";
import auth from "./auth";
import React, { Component } from "react";
import navStyle from "./Nav.css";

class Nav extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handleClick(e) {
    e.preventDefault();
    auth.logout();
  }

  render() {
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
