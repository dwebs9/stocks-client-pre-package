import "bootstrap/dist/css/bootstrap.min.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Text_field from "./textField";
import React, { useState, useEffect, Component } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  Form,
  Label,
  NavItem,
} from "react-bootstrap";

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
      // search: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  componentDidMount = (industry) => {
    console.log("industry", industry);
    console.log("componentDidMount() ");
    fetch(`http://131.181.190.87:3000/stocks/symbols`)
      .then((result) => result.json())
      .then((rowData) => {
        this.setState({ rowData });
      });
  };

  handleSubmit = (industry) => {
    console.log("handleSubmit =");

    fetch(`http://131.181.190.87:3000/stocks/symbols?industry=${this.industry}`)
      .then((result) => result.json())
      .then((rowData) => {
        this.setState({ rowData });
      });
  };

  validateForm() {
    console.log("validateForm()");
  }

  doesExternalFilterPass = (node) => {};
  externalFilterChanged = (newValue) => {};

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "500px", width: "600px", align: "center" }}
      >
        <Text_field onSearch={this.handleSubmit} />
        <AgGridReact
          enableSorting={true}
          // isExternalFilterPresent={this.isExternalFilterPresent}
          animateRows={true}
          enableFilter={true}
          onGridReady={this.onGridReady}
          pagination={true}
          ref="agGrid" // useful for accessing the component directly via ref
          rowSelection="single" // simple attributes, not bound to any state or prop
          onRowClicked={(row) =>
            this.props.history.push(`/stock/${row.data.symbol}`)
          }
          columnDefs={this.state.columnDefs}
          // This stays the same
          rowData={this.state.rowData}
        ></AgGridReact>
      </div>
    );
  }
}

export default Home;
