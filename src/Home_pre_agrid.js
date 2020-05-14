import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { render } from "@testing-library/react";

import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import { StatusPanelComponent } from "ag-grid-community/dist/lib/components/framework/componentTypes";

function Home() {
  // The curl braces says run this only
  // when the component mounts

  useEffect(() => {
    //only run this when the component mounts
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);
  // All the data from the database
  console.log("#####DEBUG: Home(): Items [items, setItems]");
  console.log(items);

  psudeoState = {
    columnDefs: [
      { headerName: "Make", field: "make" },
      { headerName: "Model", field: "model" },
      { headerName: "Price", field: "price" },
    ],
    rowData: [],
  };

  // this.state = {
  //   columnDefs: [
  //     { headerName: "Make", field: "make" },
  //     { headerName: "Model", field: "model" },
  //     { headerName: "Price", field: "price" },
  //   ],
  //   rowData: [
  //     { make: "Toyota", model: "Celica", price: 35000 },
  //     { make: "Ford", model: "Mondeo", price: 32000 },
  //     { make: "Porsche", model: "Boxter", price: 72000 },
  //   ],
  // };

  // fetchitems is = to a function
  // asynch because this will come
  // from a database
  const fetchItems = async () => {
    //   // Run the fetch call

    // Fetches the items  at the given url
    const data = await fetch("http://131.181.190.87:3000/stocks/symbols");
    // Casts the stored fetched items to json
    const items = await data.json();
    // Console log the json
    // console.log(items[0].name);
    // console.log(items[0].symbol);
    // console.log(items[0].industry);
    setItems(items);
    console.log(items);
  };

  return (
    <div className="ag-theme-balham-dark">
      <h1> Home page </h1>
      {items.map((item) => (
        <body key={item.id}>
          <Link to={`/stock/${item.symbol}`}>{item.name}</Link>
        </body>
      ))}
      <AgGridReact></AgGridReact>
    </div>
  );
}

export default Home;
