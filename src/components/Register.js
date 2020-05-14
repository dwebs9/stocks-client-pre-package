import React, { useState, Component } from "react";
import { Button, FormGroup, FormControl, Form, Label } from "react-bootstrap";
import "./Register.css";
import { Link } from "react-router-dom";
import auth from "./auth";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "your@email.com",
      password: "password",
      registrationErrors: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validateForm() {
    console.log("validateForm()");
  }

  handleEmailChange(event) {
    console.log("email: event.target.value");
    console.log(event.target);
    console.log(this.state.email);
    this.setState({ email: event.target.value });
    console.log("handleEmailChange(event)");
    console.log("Email");
    console.log(this.state.email);
  }

  // componentDidMount() {
  //   console.log("componentDidMount()");
  //   console.log(this.props);
  // }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    console.log("handlePasswordChange(event)");
    console.log("password:");

    console.log(this.state.password);
  }

  handleSubmit(event) {
    console.log("handleSubmit(event)");
    console.log("Login pressed: email");
    console.log(this.email);
    // setState({ email: event.target.value });
    console.log("Login pressed: password");
    console.log(this.password);
    // setState({ password: event.target.value });

    // console.log(this._child.current.someMethod());
    // process the fetch and store the result in response
    const response = fetch("http://131.181.190.87:3000/user/register", {
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
        console.log("Unsuccessful regi");
        response.json();
      } else {
        console.log("Registered");
        auth.login();
        console.log("auth.isAuthenticated");
        console.log(auth.isAuthenticated());

        this.props.history.push("/");
        response = response.json();

        //  email address of the user (email), the expiry date of the token
        // (exp), and the issued at time (iat)
        // The token will only be valid as long as the expiry date has not
        // passed.
        // store the token using localstorage : see here:
        //  https://www.w3schools.com/html/html5_webstorage.asp
        // In our
        // case, saving the token is as simple as storing it in
        // localstorage after the login request is successful.
        // use
        // To access the token from anywhere in your program, you can use the following command (assuming
        //   you have also used “token” as the key location):
        //      let token = localStorage.getItem("token");
        //         Authenticated Requests
        // Once we have the token, the next step is to use it. When making an authenticated request, you must
        // pass the Authorization header. An example template can be seen below and you may wish to
        // extend it to your assignment:
        // const url = `${APRI_URL}/route`
        // const token = localStorage.getItem("token");
        // const headers = {
        //   accept: "application/json",
        //   "Content-Type: "application/json",
        //   Authorization:  `Bearer ${token}`
        // },

        // return fetch(url, {headers})
        //   .then((res) => res.json())
        //   .then((res) => {
        //     console.log(res)
        //   })
        //       Redirecting the user to the login page, or indicating through an error message to
        // the user that they must login again is considered a best practice when it comes to web design. You
        // can either track the expiry date of the token using the exp timestamp stored in the decoded token,
        // or await an error from the API indicating the expiration has occurred.

        response.then(function (data) {
          console.log("response data");
          console.log(data);
        });

        // Change the state in Nav so that it says logout
      }
    });

    event.preventDefault();
  }

  render() {
    return (
      <div>
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
            Register
          </Button>
        </form>
      </div>
    );
  }
}

export default Register;
