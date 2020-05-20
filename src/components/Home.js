import "bootstrap/dist/css/bootstrap.min.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import React, { Component } from "react";

import {
  Button,
  Modal,
  Form,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Col,
  Row,
} from "reactstrap";
import "./Home.css";

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
      errorMessage: null,
      show: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.select = this.select.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  componentDidMount = () => {
    fetch(`http://131.181.190.87:3000/stocks/symbols`)
      .then((result) => {
        if (result.ok) {
          return result.json();
        }

        throw result.json();
      })
      .then((rowData) => {
        this.setState({ rowData });
      })
      .catch((error) => {
        this.setState({ show: true });
        this.setState({
          errorMessage: error.message || error.statusText,
        });
      });
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value === "") {
      fetch(`http://131.181.190.87:3000/stocks/symbols`)
        .then((result) => {
          if (result.ok) {
            return result.json();
          }

          throw result.json();
        })
        .then((rowData) => {
          this.setState({ rowData });
        })
        .catch((error) => {
          this.setState({ show: true });
          this.setState({
            errorMessage: error.message || error.statusText,
          });
        });
    } else {
      fetch(
        `http://131.181.190.87:3000/stocks/symbols?industry=${this.state.value}`
      )
        .then((result) => {
          if (result.ok) {
            return result.json();
          } else {
            this.setState({ rowData: [] });
          }
        })
        .then((rowData) => {
          this.setState({ rowData });
        });
    }
  }

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      dropdownValue: event.target.value,
    });
    if (event.target.value === "All Industries") {
      fetch(`http://131.181.190.87:3000/stocks/symbols`)
        .then((result) => {
          if (result.ok) {
            return result.json();
          } else {
            this.setState({ rowData: [] });
          }
        })
        .then((rowData) => {
          console.log("Row data set: length");

          this.setState({ rowData });
        });
    } else {
      fetch(
        `http://131.181.190.87:3000/stocks/symbols?industry=${event.target.value}`
      )
        .then((result) => {
          if (result.ok) {
            return result.json();
          } else {
            this.setState({ rowData: [] });
          }
        })
        .then((rowData) => {
          console.log("Row data set: length");
          console.log(this.state.rowData.length);
          this.setState({ rowData });
        });
    }
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "500px", width: "600px", align: "center" }}
      >
        <Container>
          <Row xs="2">
            <Col xs="5">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret color="warning" size="sm">
                  {this.state.dropdownValue}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem value="All Industries" onClick={this.select}>
                    All Industries
                  </DropdownItem>
                  <DropdownItem
                    value="Consumer Discretionary"
                    onClick={this.select}
                  >
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
                  <DropdownItem
                    value="Information Technology"
                    onClick={this.select}
                  >
                    Information Technology
                  </DropdownItem>
                  <DropdownItem value="Material" onClick={this.select}>
                    Material
                  </DropdownItem>
                  <DropdownItem value="Real Estate" onClick={this.select}>
                    Real Estate
                  </DropdownItem>
                  <DropdownItem
                    value="Telecommunication Services"
                    onClick={this.select}
                  >
                    Telecommunication Services
                  </DropdownItem>
                  <DropdownItem value="Utilities" onClick={this.select}>
                    Utilites
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
        <Container>
          <Col xs="auto">
            <Form onSubmit={this.handleSubmit}>
              <Label>
                <Input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </Label>

              <Button color="warning" type="submit" size="sm" value="Search">
                Search
              </Button>
            </Form>
          </Col>
        </Container>

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
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Whoops...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            There was a problem connecting with the server. Error:{" "}
            {this.state.errorMessage}
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

export default Home;
