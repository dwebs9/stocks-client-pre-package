"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: [ClientSideRowModelModule],
      columnDefs: [
        {
          field: "athlete",
          minWidth: 150,
        },
        {
          field: "age",
          maxWidth: 90,
        },
        {
          field: "country",
          minWidth: 150,
        },
        {
          field: "year",
          maxWidth: 90,
        },
        {
          field: "date",
          minWidth: 150,
        },
        {
          field: "sport",
          minWidth: 150,
        },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
      },
      rowSelection: "multiple",
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  onRowSelected = (event) => {
    window.alert(
      "row " + event.node.data.athlete + " selected = " + event.node.selected
    );
  };

  onSelectionChanged = (event) => {
    var rowCount = event.api.getSelectedNodes().length;
    window.alert("selection changed, " + rowCount + " rows selected");
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "100%",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowSelection={this.state.rowSelection}
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
            onRowSelected={this.onRowSelected.bind(this)}
            onSelectionChanged={this.onSelectionChanged.bind(this)}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
