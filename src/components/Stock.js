import "bootstrap/dist/css/bootstrap.min.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import React, { useState, useEffect } from "react";

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
  const [rowData, setRowData] = useState([]);

  let symbol = match.params.id;
  console.log("#####DEBUG: The value of {symbol}");
  let token = localStorage.getItem("token");

  if (token != null) {
    token = token.substring(1, token.length - 1);
  }

  const url = `http://131.181.190.87:3000/`;
  console.log("#####DEBUG: printing token");
  console.log(token);

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const from = "2020-03-15T00:00:00.000Z";
  const to = "2020-03-20T00:00:00.000Z";

  useEffect(() => {
    /// / What should we call here to get the appropiate fetch url ??
    // !!! WARING !!! React Hook useEffect has a missing dependency: 'symbol'
    if (token != null) {
      console.log("#####DEBUG: printing token");
      console.log(token);

      fetch(
        `http://131.181.190.87:3000/stocks/authed/${symbol}?from=${from}&to=${to}`,
        {
          headers,
        }
      ).then((response) => {
        console.log("successful");
        let jsonResponse = response.json();
        console.log(jsonResponse);
        jsonResponse.then(function (data) {
          console.log("data is:");
          console.log(data);
          setRowData(data);
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
  }, []);

  const numRows = rowData.length;
  console.log("numRows");
  console.log(numRows);

  return (
    <div
      className="ag-theme-balham"
      style={{ height: "500px", width: "600px", align: "center" }}
    >
      You are looking at the {symbol} stock
      {token != null ? (
        <AgGridReact columnDefs={columns} rowData={rowData} />
      ) : (
        <AgGridReact columnDefs={columns} rowData={[rowData]} />
      )}
    </div>
  );
}

// {!props.isauth ? <LoginButton /> : <LogoutButton props={props}
