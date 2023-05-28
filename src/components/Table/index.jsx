import React, { useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const Table = ({ rows, column }) => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);

  const gridOptions = {
    alignedGrids: [],
    defaultColDef: {
      editable: false,
      sortable: false,
      resizable: false,
      filter: false,
      flex: 1,
      minWidth: 190,
      headerHeight: 150,
    },
    // enables pagination in the grid
    pagination: true,

    // sets 10 rows per page (default is 100)
    paginationPageSize: 10,
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-material">
        <AgGridReact
          gridOptions={gridOptions}
          rowData={rows}
          columnDefs={column}
          defaultColDef={defaultColDef}
          colResizeDefault={'shift'}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default Table;
