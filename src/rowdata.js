use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: [ClientSideRowModelModule],
      columnDefs: [
        {
          field: 'athlete',
          minWidth: 180,
        },
        {
          field: 'age',
          filter: 'agNumberColumnFilter',
          maxWidth: 80,
        },
        { field: 'country' },
        {
          field: 'year',
          maxWidth: 90,
        },
        {
          field: 'date',
          filter: 'agDateColumnFilter',
          filterParams: {
            comparator: function(filterLocalDateAtMidnight, cellValue) {
              var cellDate = asDate(cellValue);
              if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
                return 0;
              }
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }
              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
            },
          },
        },
        {
          field: 'gold',
          filter: 'agNumberColumnFilter',
        },
        {
          field: 'silver',
          filter: 'agNumberColumnFilter',
        },
        {
          field: 'bronze',
          filter: 'agNumberColumnFilter',
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 120,
        filter: true,
      },
      rowData: [],
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      'GET',
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  externalFilterChanged = newValue => {
    ageType = newValue;
    this.gridApi.onFilterChanged();
  };

  isExternalFilterPresent = () => {
    return ageType != 'everyone';
  };

  doesExternalFilterPass = node => {
    switch (ageType) {
      case 'below25':
        return node.data.age < 25;
      case 'between25and50':
        return node.data.age >= 25 && node.data.age <= 50;
      case 'above50':
        return node.data.age > 50;
      case 'dateAfter2008':
        return asDate(node.data.date) > new Date(2008, 1, 1);
      default:
        return true;
    }
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="test-container">
          <div className="test-header">
            <label>
              <input
                type="radio"
                name="filter"
                id="everyone"
                checked=""
                onChange={() => this.externalFilterChanged('everyone')}
              />
              Everyone
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                id="below25"
                onChange={() => this.externalFilterChanged('below25')}
              />
              Below 25
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                id="between25and50"
                onChange={() => this.externalFilterChanged('between25and50')}
              />
              Between 25 and 50
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                id="above50"
                onChange={() => this.externalFilterChanged('above50')}
              />
              Above 50
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                id="dateAfter2008"
                onChange={() => this.externalFilterChanged('dateAfter2008')}
              />
              After 01/01/2008
            </label>
          </div>
          <div
            id="myGrid"
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              modules={this.state.modules}
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              animateRows={true}
              isExternalFilterPresent={this.isExternalFilterPresent}
              doesExternalFilterPass={this.doesExternalFilterPass}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

var ageType = 'everyone';
function asDate(dateAsString) {
  var splitFields = dateAsString.split('/');
  return new Date(splitFields[2], splitFields[1], splitFields[0]);
}

render(<GridExample></GridExample>, document.querySelector('#