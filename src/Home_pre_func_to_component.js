import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { render } from "@testing-library/react";

import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
function Home() {
  // The curl braces says run this only
  // when the component mounts

  useEffect(() => {
    //only run this when the component mounts
    fetchStocks();
  }, []);

  const [stocks, setStocks] = useState([]);
  this.state = {
    columnDefs: [
      { headerName: "Make", field: "make" },
      { headerName: "Model", field: "model" },
      { headerName: "Price", field: "price" },
    ],
    rowData: [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
    ],
  };
  // All the data from the database
  console.log("#####DEBUG: Home(): stocks [stocks, setstocks]");
  // console;
  console.log(stocks);
  // fetchstocks is = to a function
  // asynch because this will come
  // from a database
  const fetchStocks = async () => {
    //   // Run the fetch call

    // Fetches the stocks  at the given url
    const data = await fetch("http://131.181.190.87:3000/stocks/symbols");
    // Casts the stored fetched stocks to json
    const stocks = await data.json();
    // Console log the json
    // console.log(stocks[0].name);
    // console.log(stocks[0].symbol);
    // console.log(stocks[0].industry);
    setStocks(stocks);
    console.log(stocks);
  };

  return (
    <div className="ag-theme-balham-dark">
      <h1> Home page </h1>
      <body key={stock.id}>
        <Link to={`/stock/${stock.symbol}`}>{stock.name}</Link>
      </body>
      ))}
      <AgGridReact></AgGridReact>
    </div>
  );
}

export default Home;
