import "bootstrap/dist/css/bootstrap.min.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import React, { useState, useEffect, Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let token = localStorage.getItem("token");

if (token != null) {
  token = token.substring(1, token.length - 1);
}
const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// ({ match })
class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { headerName: "Close", field: "close" },
        { headerName: "High", field: "high" },
        { headerName: "Industry", field: "industry" },
        { headerName: "Low", field: "low" },
        { headerName: "Name", field: "name" },
        { headerName: "Open", field: "open" },
        { headerName: "Symbol", field: "symbol" },
        { headerName: "Timestamp", field: "timestamp" },
        { headerName: "Volumes", field: "volumes" },
      ],
      rowData: [],
      fromDate: new Date("2020-03-20T14:00:00.000Z"),
      toDate: new Date("2020-03-24T14:00:00.000Z"),
      symbol: props.match.params.id,
    };
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    console.log("componentDidMount");
    console.log(this.state.fromDate);
    console.log(this.state.toDate);
    fetch(
      `http://131.181.190.87:3000/stocks/authed/${this.state.symbol}?from=${this.state.fromDate}&to=${this.state.toDate}`,
      {
        headers,
      }
    )
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        this.setState({ rowData: data });
      });
  };

  handleFromChange = (date) => {
    console.log("from data changedd");
    this.setState({ fromDate: date });
  };
  handleToChange = (date) => {
    this.setState({ toDate: date });
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log("HANDLE SUBMIT");
    fetch(
      `http://131.181.190.87:3000/stocks/authed/${this.state.symbol}?from=${this.state.fromDate}&to=${this.state.toDate}`,
      {
        headers,
      }
    )
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        this.setState({ rowData: data });
      });
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "500px", width: "600px", align: "center" }}
      >
        From
        <DatePicker
          selected={this.state.fromDate}
          onChange={this.handleFromChange}
          minDate={new Date("2019-11-06T14:00:00.000Z")}
          maxDate={new Date("2020-03-24T14:00:00.000Z")}
        />
        To{" "}
        <DatePicker
          selected={this.state.toDate}
          onChange={this.handleToChange}
          minDate={new Date("2019-11-06T14:00:00.000Z")}
          maxDate={new Date("2020-03-24T14:00:00.000Z")}
        />
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Submit" />
        </form>
        You are looking at the {this.state.symbol} stock
        {token != null ? (
          <AgGridReact
            columnDefs={this.state.columns}
            rowData={this.state.rowData}
            onChange={this.handleFromChange}
          />
        ) : (
          <AgGridReact
            columnDefs={this.state.columns}
            rowData={[this.state.rowData]}
            onChange={this.handleToChange}
          />
        )}
      </div>
    );
  }
}

export default Stock;
