import React, { useState } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  Form,
  Label,
  NavItem,
} from "react-bootstrap";
import "./Login.css";
import { Link } from "react-router-dom";
import auth from "./auth";
import Nav from "./Nav";

const Login = (props) => {
  this._child = React.createRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    // console.log("Login pressed");
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    console.log("Login pressed: email");
    console.log(email);
    console.log("Login pressed: password");
    console.log(password);
    console.log("this._child.current.someMethod()");
    console.log(this._child.current.someMethod());
    // process the fetch and store the result in response
    const response = fetch("http://131.181.190.87:3000/user/login", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (!response.ok) {
        console.log("Unsuccessful login, try again");
        response.json();
      } else {
        console.log("logged in");
        auth.login();
        props.history.push("/");
        response = response.json();
        response.then(function (data) {
          console.log(data.token);
        });

        // Change the state in Nav so that it says logout
      }
    });

    event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <Form.Label>Email address</Form.Label>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
      Not a member?
      <Link to="/register">register here</Link>
      <div>
        <Nav ref={this._child} />
      </div>
    </div>
  );
};

export default Login;
