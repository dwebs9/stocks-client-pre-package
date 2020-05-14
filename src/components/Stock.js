import "bootstrap/dist/css/bootstrap.min.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import React, { setState, useState, useEffect, Component } from "react";

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

const rowData = [];

export default function Stock({ match }) {
  const [rowData, setRowData] = useState([]);
  let symbol = match.params.id;
  console.log("#####DEBUG: The value of {symbol}");

  useEffect(() => {
    /// / What should we call here to get the appropiate fetch url ??
    fetch(`http://131.181.190.87:3000/stocks/${symbol}`).then((response) => {
      console.log("successful");
      let jsonResponse = response.json();
      console.log(jsonResponse);
      jsonResponse.then(function (data) {
        setRowData(data);
      });
    });
  }, []);

  return (
    <div
      className="ag-theme-balham"
      style={{ height: "500px", width: "600px", align: "center" }}
    >
      You are looking at the {symbol} stock
      <AgGridReact columnDefs={columns} rowData={[rowData]} />
    </div>
  );
}

// useEffect(() => {
//   /// / What should we call here to get the appropiate fetch url ??
//   fetch(`http://131.181.190.87:3000/stocks/${symbol}`)
//     .then((res) => res.json())
//     .then((data) => data.works)
//     .then((works) =>
//       works.ma((stock) => {
//         return {
//           close: stock.close,
//           high: stock.high,
//           industry: stock.industry,
//           low: stock.low,
//           name: stock.name,
//           open: stock.open,
//           symbol: stock.symbol,
//           timestamp: stock.timestamp,
//           volumes: stock.volumes,
//         };
//       })
//     )
//     .then((stock) => this.setState({ rowData: stock }));
// }, []);
