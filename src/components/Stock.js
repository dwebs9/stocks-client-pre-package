import "bootstrap/dist/css/bootstrap.min.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const columns = [
  { headerName: "Close", field: "close" },
  { headerName: "High", field: "high" },
  { headerName: "Industry", field: "industry" },
  { headerName: "Low", field: "low" },
  { headerName: "Name", field: "name" },
  { headerName: "Open", field: "open" },
  { headerName: "Symbol", field: "symbol" },
  { headerName: "Timestamp", field: "timestamp" },
  { headerName: "Volumes", field: "volumes" },
];

export default function Stock({ match }) {
  console.log("!!!!Component loaded");
  const [rowData, setRowData] = useState([]);

  const [fromDate, setFromDate] = useState(
    new Date("2020-03-20T14:00:00.000Z")
  );
  const [toDate, setToDate] = useState(new Date("2020-03-24T14:00:00.000Z"));

  let symbol = match.params.id;
  let token = localStorage.getItem("token");

  if (token != null) {
    token = token.substring(1, token.length - 1);
  }

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  componentDidMount = () => {
    if (token != null) {
      fetch(
        `http://131.181.190.87:3000/stocks/authed/${symbol}?from=${fromDate}&to=${toDate}`,
        {
          headers,
        }
      ).then((response) => {
        console.log("successful");
        let jsonResponse = response.json();
        console.log(jsonResponse);
        jsonResponse.then(function (data) {
          // console.log("ROWDATA SET");
          // console.log(data);
          // setRowData(data);
        });
      });
    } else {
      console.log("Token is null");
      fetch(`http://131.181.190.87:3000/stocks/${symbol}`).then((response) => {
        console.log("successful");
        let jsonResponse = response.json();
        console.log(jsonResponse);
        jsonResponse.then(function (data) {
          setRowData(data);
          console.log("data is:");
          console.log(data);
        });
      });
    }
  };

  const handleFromChange = (date) => {
    setFromDate(date);
  };
  const handleToChange = (date) => {
    setToDate(date);
  };

  const handleSubmit = () => {
    fetch(
      `http://131.181.190.87:3000/stocks/authed/${symbol}?from=${fromDate}&to=${toDate}`,
      {
        headers,
      }
    ).then((response) => {
      let jsonResponse = response.json();
      jsonResponse.then(function (data) {
        setRowData(data);
      });
    });
  };

  return (
    <div
      className="ag-theme-balham"
      style={{ height: "500px", width: "600px", align: "center" }}
    >
      From
      <DatePicker
        selected={fromDate}
        onChange={handleFromChange}
        minDate={new Date("2019-11-06T14:00:00.000Z")}
        maxDate={new Date("2020-03-24T14:00:00.000Z")}
      />
      To{" "}
      <DatePicker
        selected={toDate}
        onChange={handleToChange}
        minDate={new Date("2019-11-06T14:00:00.000Z")}
        maxDate={new Date("2020-03-24T14:00:00.000Z")}
      />
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Submit" />
      </form>
      You are looking at the {symbol} stock
      {token != null ? (
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          onChange={handleFromChange}
        />
      ) : (
        <AgGridReact
          columnDefs={columns}
          rowData={[rowData]}
          onChange={handleToChange}
        />
      )}
    </div>
  );
}
