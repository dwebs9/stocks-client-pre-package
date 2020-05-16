import React, { Component } from "react";
import jwt from "jsonwebtoken";
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import "./Login.css";
import { Link } from "react-router-dom";
import auth from "./auth";
import { data } from "./Cb.js";
import { AuthContext } from "../App";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "enter@email.com",
      password: "password",
      rememberMe: false,
      token: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    console.log("validateForm()");
  }

  componentDidMount() {
    console.log("componentDidMount()");
    console.log(this.props);
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const user = rememberMe ? localStorage.getItem("user") : "";
    let authToken = localStorage.getItem("token");
    this.setState({ user, rememberMe });
    this.setState({ token: authToken });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
    console.log("handleEmailChange(event)");
    console.log("Email");
    console.log(this.state.email);
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    console.log("handlePasswordChange(event)");
    console.log("password:");

    console.log(this.state.password);
  }

  handleSubmit(event) {
    fetch("http://131.181.190.87:3000/user/login", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then((response) => {
      if (!response.ok) {
        console.log("Unsuccessful login, try again");
        response.json();
      } else {
        console.log("logged in");

        // Destructuring assignment
        const user = this.state.email;
        const rememberMe = this.state.rememberMe;

        localStorage.setItem("rememberMe", rememberMe);
        localStorage.setItem("user", rememberMe ? user : "");

        response = response.json();
        response.then((data) => {
          console.log(data.token);
          console.log("Token Processed");
          localStorage.setItem("token", data.token);
        });

        this.props.history.push(`/`);
      }
    });

    event.preventDefault();
  }
  handleChange = (event) => {
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;

    this.setState({ [input.name]: value });
  };
  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <Form.Label>Email address</Form.Label>
            <FormControl
              autoFocus
              type="email"
              value={this.email}
              onChange={this.handleEmailChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <Form.Label>Password</Form.Label>
            <FormControl
              value={this.password}
              onChange={this.handlePasswordChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          <label>
            <input
              name="rememberMe"
              checked={this.state.rememberMe}
              onChange={this.handleChange}
              type="checkbox"
            />{" "}
            Remember me
          </label>
        </form>
        Not a member?
        <Link to="/register">register here</Link>
      </div>
    );
  }
}

export default Login;
