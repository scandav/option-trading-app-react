import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import clsx from "clsx";
import SnP500_seasonality from "../data/SnP500_seasonality.json";

const columns = [
  { field: "id", headerName: "Year", width: 100 },
  {
    field: "1",
    headerName: "January",
    editable: false,
    sortable: false,
    cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value < 0,
        positive: params.value > 0,
      }),
  },
  {
    field: "2",
    headerName: "February",
    editable: false,
    sortable: false,
    cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value < 0,
        positive: params.value > 0,
      }),
  },
  {
    field: "3",
    headerName: "March",
    editable: false,
    sortable: false,
    cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value < 0,
        positive: params.value > 0,
      }),
  },
  {
    field: "4",
    headerName: "April",
    editable: false,
    sortable: false,
    cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value < 0,
        positive: params.value > 0,
      }),
  },
  {
    field: "5",
    headerName: "May",
    editable: false,
    sortable: false,
    cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value < 0,
        positive: params.value > 0,
      }),
  },
  {
    field: "6",
    headerName: "June",
    editable: false,
    sortable: false,
    cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value < 0,
        positive: params.value > 0,
      }),
  },
  {
    field: "7",
    headerName: "July",
    editable: false,
    sortable: false,
    cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value < 0,
        positive: params.value > 0,
      }),
  },
  {
    field: "8",
    headerName: "August",
    editable: false,
    sortable: false,
    cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value < 0,
        positive: params.value > 0,
      }),
  },
  {
    field: "9",
    headerName: "September",
    editable: false,
    sortable: false,
    cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value < 0,
        positive: params.value > 0,
      }),
  },
  {
    field: "10",
    headerName: "October",
    editable: false,
    sortable: false,
    cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value < 0,
        positive: params.value > 0,
      }),
  },
  {
    field: "11",
    headerName: "November",
    editable: false,
    sortable: false,
    cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value < 0,
        positive: params.value > 0,
      }),
  },
  {
    field: "12",
    headerName: "December",
    editable: false,
    sortable: false,
    cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value < 0,
        positive: params.value > 0,
      }),
  },
];

function SeasonalityGrid() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <Box
            sx={{
              height: "60vh",
              "& .super-app.positive": {
                backgroundColor: "#81c784",
                // color: "#1a3e72",
                // fontWeight: "600",
              },
              "& .super-app.negative": {
                backgroundColor: "#e57373",
                // color: "#1a3e72",
                // fontWeight: "600",
              },
            }}
          >
            <DataGrid
              rows={SnP500_seasonality}
              columns={columns}
              disableSelectionOnClick
              rowHeight={30}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default SeasonalityGrid;
