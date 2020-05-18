import React, { Component } from "react";
import { Button, FormGroup, FormControl, Form, Modal } from "react-bootstrap";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "your@email.com",
      password: "password",
      registrationErrors: "",
      errorMessage: null,
      show: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }
  validateForm() {
    console.log("validateForm()");
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
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

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    console.log("handlePasswordChange(event)");
    console.log("password:");
    console.log(this.state.password);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit(event)");
    console.log("Login pressed: email");
    console.log(this.email);
    console.log("Login pressed: password");
    console.log(this.password);

    // process the fetch and store the result in response

    fetch("http://131.181.190.87:3000/user/register", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Unsuccessful regi");
          this.setState({ show: true });
          throw response.json();
        } else {
          console.log("Registered");

          this.props.history.push("/login");
          response = response.json();

          response.then(function (data) {
            console.log("response data");
            console.log(data);
          });
        }
      })
      // Change the state in Nav so that it says logout
      .catch((error) => {
        this.setState({ show: true });
        this.setState({
          errorMessage: error.message || error.statusText,
        });
      });
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
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Whoops...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Username or password is invalid. Error: {this.state.errorMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Register;
