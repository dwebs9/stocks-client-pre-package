import "bootstrap/dist/css/bootstrap.min.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import React, { Component } from "react";
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { headerName: "Name", field: "name" },
        { headerName: "Symbol", field: "symbol" },
        {
          headerName: "Industry",
          field: "industry",
          filter: "agTextColumnFilter",
        },
      ],
      rowData: [],
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  componentDidMount = () => {
    console.log("componentDidMount() ");
    fetch(`http://131.181.190.87:3000/stocks/symbols`)
      .then((result) => result.json())
      .then((rowData) => {
        this.setState({ rowData });
      });
  };

  handleChange(event) {
    console.log("Input Changed: event");
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    fetch(
      `http://131.181.190.87:3000/stocks/symbols?industry=${this.state.value}`
    )
      .then((result) => result.json())
      .then((rowData) => {
        this.setState({ rowData });
      });
    event.preventDefault();
  }
  // handleSubmit(event) {

  // }

  // handleSubmit(event) {
  //   console.log("THE INDUSTRY");
  //   console.log(event);

  //   fetch(
  //     `http://131.181.190.87:3000/stocks/symbols?industry=${event.target.value}`
  //   )
  //     .then((result) => result.json())
  //     .then((rowData) => {
  //       this.setState({ rowData });
  //     });
  // }

  doesExternalFilterPass = (node) => {};
  externalFilterChange = (newValue) => {};

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "500px", width: "600px", align: "center" }}
      >
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <AgGridReact
          enableSorting={true}
          animateRows={true}
          enableFilter={true}
          onGridReady={this.onGridReady}
          pagination={true}
          ref="agGrid"
          rowSelection="single"
          onRowClicked={(row) =>
            this.props.history.push(`/stock/${row.data.symbol}`)
          }
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        ></AgGridReact>
      </div>
    );
  }
}

export default Home;
