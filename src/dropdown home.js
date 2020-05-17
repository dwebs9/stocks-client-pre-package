import "bootstrap/dist/css/bootstrap.min.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

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
      dropdownOpen: false,
      dropdownValue: "All Industries",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.select = this.select.bind(this);
    this.toggle = this.toggle.bind(this);
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
    console.log("This.state.value");
    console.log(this.state.value);
    fetch(
      `http://131.181.190.87:3000/stocks/symbols?industry=${this.state.value}`
    )
      .then((result) => {
        if (result.ok) {
          console.log("Search ok");
          result.json();
        } else {
          console.log("Search not ok");
          this.setState({ rowData: [] });
        }
      })
      .then((rowData) => {
        console.log("Rowdataseti");
        console.log(this.state.rowData);

        this.setState({ rowData });
        console.log(this.state.rowData);
      });
    event.preventDefault();
  }

  toggle(event) {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }
  select(event) {
    // console.log("select fired: event");
    // console.log(event.target.value);
    // this.setState({
    //   dropdownOpen: !this.state.dropdownOpen,
    //   dropdownValue: event.target.value,
    // });
    // console.log("this.state.dropdownValue");
    // console.log(this.state.dropdownValue);
    // fetch(
    //   `http://131.181.190.87:3000/stocks/symbols?industry=${this.state.dropdownValue}`
    // )
    //   .then((result) => {
    //     if (result.ok) {
    //       console.log("Search ok");
    //       result.json();
    //     } else {
    //       console.log("Search not ok");
    //       this.setState({ rowData: [] });
    //     }
    //   })
    //   .then((rowData) => {
    //     console.log("Row data set: length");
    //     console.log(this.state.rowData.length);
    //     this.setState({ rowData });
    //   });
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "500px", width: "600px", align: "center" }}
      >
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle>{this.dropdownValue}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem value="All Industries" onClick={this.select}>
              All Industries
            </DropdownItem>
            <DropdownItem value="Consumer Discretionary" onClick={this.select}>
              Consumer Discretionary
            </DropdownItem>
            <DropdownItem value="Consumer Staples" onClick={this.select}>
              Consumer Staples
            </DropdownItem>
            <DropdownItem value="Energy" onClick={this.select}>
              Energy
            </DropdownItem>
            <DropdownItem value="Financials" onClick={this.select}>
              Financials
            </DropdownItem>
            <DropdownItem value="Health Care" onClick={this.select}>
              Health Care
            </DropdownItem>
            <DropdownItem value="Industrials" onClick={this.select}>
              Industrials
            </DropdownItem>
            <DropdownItem value="Information Technology" onClick={this.select}>
              Information Technology
            </DropdownItem>
            <DropdownItem value="Material" onClick={this.select}>
              Material
            </DropdownItem>
            <DropdownItem value="Realestate" onClick={this.select}>
              Realestate
            </DropdownItem>
            <DropdownItem
              value="Telecommunication Services"
              onClick={this.select}
            >
              Telecommunication Services
            </DropdownItem>
            <DropdownItem value="Utilites">Utilites</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
