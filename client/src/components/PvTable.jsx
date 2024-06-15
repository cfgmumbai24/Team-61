import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useState } from "react";
import Header from "./Header";


const PvTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mockData, setMockData] = useState([
    { id: 1, name: "John Doe", phone: "123-456-7890", email: "john.doe@example.com", location: "New York", score: 85 },
    { id: 2, name: "Jane Smith", phone: "098-765-4321", email: "jane.smith@example.com", location: "Los Angeles", score: 92 },
    { id: 3, name: "Alice Johnson", phone: "555-123-4567", email: "alice.johnson@example.com", location: "Chicago", score: 78 },
    { id: 4, name: "Bob Brown", phone: "555-987-6543", email: "bob.brown@example.com", location: "Houston", score: 88 },
    { id: 5, name: "Charlie Davis", phone: "555-654-3210", email: "charlie.davis@example.com", location: "Phoenix", score: 95 }
  ]);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
        field: "location",
        headerName: "Location",
        headerAlign: "left",
        align: "left",
    },
    {
        field: "score",
        headerName: "Score",
        headerAlign: "left",
        align: "left",
    },
    
  ];

  return (
    <Box >
         <Header title="Paravets" subtitle="Paravet Info" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockData} columns={columns} />
      </Box>
    </Box>
  );
};

export default PvTable;