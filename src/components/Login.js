import React, { Component, useState } from "react";
import jwt from "jsonwebtoken";
import { Button, FormGroup, FormControl, Form, Modal } from "react-bootstrap";
import "./Login.css";
import { Link } from "react-router-dom";

import { data } from "./Cb.js";
import { AuthContext } from "../App";

export const Login = (props) => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [errorMessage, setErrorMessage] = useState(null);
  const [show, setShow] = useState(false);

  const [data, setData] = React.useState(initialState);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleInputChange = (event) => {
    console.log("input changed");
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    console.log("email :");
    console.log(data.email);
    console.log(data.password);

    fetch("http://131.181.190.87:3000/user/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => {
        console.log("email :");
        console.log(data.email);
        console.log(data.password);

        if (res.ok) {
          console.log("response is ok");
          return res.json();
        }
        console.log("response is  not ok");
        setShow(true);
        throw res.json();
      })
      .then((resJson) => {
        console.log("dispatch LOGIN");
        console.log("response");
        dispatch({
          type: "LOGIN",
          payload: resJson,
        });
        props.history.push(`/`);
      })
      .catch((error) => {
        setShow(true);
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <h1>Login</h1>

            <label htmlFor="email">
              Email Address
              <input
                type="text"
                value={data.email}
                onChange={handleInputChange}
                name="email"
                id="email"
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>

            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}

            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? "Loading" : "Login"}
            </button>
          </form>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Whoops...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Username or password incorrect.
          {errorMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
