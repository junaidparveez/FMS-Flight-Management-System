// src/features/flights/pages/FlightsPage.jsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Container,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

import FlightForm from "../components/FlightForm";
import FlightChart from "../components/FlightChart";
import { fetchFlights, deleteFlight, fetchAirports, fetchAirlines } from "../services/flightService";
import Sidebar from "../../../common/components/Sidebar";
import apiClient from "../../../common/services/apiClient";

const FlightsPage = () => {
  
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Fetch flights from backend
  const { data: flights = [], isLoading, isError } = useQuery({
    queryKey: ["flights"],
    queryFn: fetchFlights,
  });

  // Fetch airlines and airports for display names
  const { data: airlines = [] } = useQuery({
    queryKey: ["airlines"],
    queryFn: fetchAirlines,
  });


  // Fetch flight count using React Query
  const { data: flightCount, isLoading: isCountLoading, isError: isCountError } = useQuery({
    queryKey: ["flightCount"],
    queryFn: async () => {
      const response = await apiClient.get("/flights/count");
      return response.data;
    },
  });



  const { data: airports = [] } = useQuery({
    queryKey: ["airports"],
    queryFn: fetchAirports,
  });

  // ✅ deleteFlight mutation with object syntax
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteFlight(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flights"] });
    },
  });

  const handleDelete = (id) => {
    console.log("Deleting flight with ID:", id);
    deleteMutation.mutate(id);
  };

  const handleRowClick = (params) => {
    setSelectedFlight(params.row);
    setOpen(true);
  };
  const handleCreate = () => {
    setSelectedFlight(null);
    setOpen(true);
  };

  // Stats

  console.log("Sample flight row:", flights[0]);
  const avgSeats = flightCount
    ? (
        flights.reduce((sum, f) => sum + (f.availableSeats || 0), 0) /
        flightCount
      ).toFixed(1)
    : 0;
    const columns = [
  { field: "flightNumber", headerName: "Flight #", flex: 1 },
  { field: "originalAirportCode", headerName: "Origin", flex: 1 },
  { field: "destinationAirportCode", headerName: "Destination", flex: 1 },
  { field: "availableSeats", headerName: "Seats", type: "number", flex: 1 },
  {
    field: "airlineId",
    headerName: "Airline",
    flex: 1,
    valueFormatter: (params) => {
      const airlineId = String(params);
      const airline = airlines.find(a => String(a.airlineId) === airlineId);
      return airline ? airline.airlineName : airlineId;
    },
  },
  {
    field: "airportId",
    headerName: "Airport",
    flex: 1,
    valueFormatter: (params) => {
      const airportId = String(params);
      const airport = airports.find(a => String(a.airportCode) === airportId);
      return airport ? airport.airportName : airportId;
    },
  },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    renderCell: (params) => (
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          handleDelete(params.row.id || params.row.flightID || params.id);
        }}
        color="error"
      >
        <DeleteIcon />
      </IconButton>
    ),
  },
];

  // const columns = [
  //   { field: "flightNumber", headerName: "Flight #", width: 130 },
  //   { field: "originalAirportCode", headerName: "Origin", width: 100 },
  //   { field: "destinationAirportCode", headerName: "Destination", width: 100 },
  //   { field: "availableSeats", headerName: "Seats", type: "number", width: 80 },
  //   {
  //     field: "airlineId",
  //     headerName: "Airline",
  //     width: 120,
  //     valueFormatter: (params) => {
  //       const airlineId = String(params);
  //       const airline = airlines.find(a => String(a.airlineId) === airlineId);
  //       return airline ? airline.airlineName : airlineId;
  //     }
  //   },
  //   {
  //     field: "airportId",
  //     headerName: "Airport",
  //     width: 120,
  //     valueFormatter: (params) => {
  //       const airportId = String(params);
      
  //       const airport = airports.find(a => String(a.airportCode) === airportId);
  //       return airport ? airport.airportName : airportId;
  //     }
  //   },
  //   {
  //     field: "delete",
  //     headerName: "Delete",
  //     sortable: false,
  //     renderCell: (params) => (
  //       <IconButton
  //         onClick={(event) => {
  //           event.stopPropagation();
  //           handleDelete(params.row.id || params.row.flightID || params.id);
  //         }}
  //         color="error"
  //       >
  //         <DeleteIcon />
  //       </IconButton>
  //     ),
  //   },
  // ];
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #f9fafb 100%)',
      }}
    >
      {/* Sidebar (optional, can be uncommented if needed) */}
      {/* <Sidebar /> */}
      <Container
        maxWidth="xl"
        sx={{
          py: 4,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 1, sm: 3 },
            borderRadius: 4,
            mb: 3,
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)',
            background: '#fff',
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            flexWrap="wrap"
            gap={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <FlightTakeoffIcon color="primary" fontSize="large" />
              <Typography
                variant="h4"
                fontWeight={700}
                color="primary.main"
                sx={{
                  letterSpacing: 1,
                  textShadow: '0 2px 8px rgba(33,150,243,0.08)',
                }}
              >
                Flights Dashboard
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                px: 3,
                py: 1,
                boxShadow: '0 2px 8px 0 rgba(33,150,243,0.10)',
                background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(90deg, #1565c0 60%, #42a5f5 100%)',
                },
              }}
            >
              Create New Flight
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" gap={2} mb={2} flexWrap="wrap">
            <Card
              variant="outlined"
              sx={{
                flex: 1,
                minWidth: 200,
                bgcolor: '#e3f2fd',
                border: 0,
                boxShadow: '0 2px 8px 0 rgba(33,150,243,0.06)',
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Flights
                </Typography>
                <Typography
                  variant="h3"
                  color="primary.main"
                  fontWeight={700}
                  sx={{ letterSpacing: 1 }}
                >
                  {isCountLoading ? <CircularProgress size={28} /> : isCountError ? <span style={{color: 'red'}}>Error</span> : flightCount}
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              sx={{
                flex: 1,
                minWidth: 200,
                bgcolor: '#fff3e0',
                border: 0,
                boxShadow: '0 2px 8px 0 rgba(255,167,38,0.06)',
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Avg Available Seats
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ color: '#ff9800', fontWeight: 700, letterSpacing: 1 }}
                >
                  {avgSeats}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box my={2}>
            {/* Chart section */}
            <Paper
              elevation={1}
              sx={{
                p: { xs: 1, sm: 2 },
                borderRadius: 3,
                bgcolor: '#f9fafb',
                boxShadow: '0 1px 4px 0 rgba(33,150,243,0.04)',
              }}
            >
              <Typography
                variant="h6"
                mb={1}
                color="primary"
                sx={{ fontWeight: 600, letterSpacing: 0.5 }}
              >
                Flights Overview
              </Typography>
              {isLoading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight={200}
                >
                  <CircularProgress />
                </Box>
              ) : isError ? (
                <Typography color="error">Failed to load chart data.</Typography>
              ) : (
                <FlightChart flights={flights} />
              )}
            </Paper>
          </Box>
          <Box mt={3}>
            <Paper
              elevation={1}
              sx={{
                p: { xs: 1, sm: 2 },
                borderRadius: 3,
                boxShadow: '0 1px 4px 0 rgba(33,150,243,0.04)',
              }}
            >
              <Typography
                variant="h6"
                mb={2}
                color="primary"
                sx={{ fontWeight: 600, letterSpacing: 0.5 }}
              >
                Flights Table
              </Typography>
              {isLoading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight={300}
                >
                  <CircularProgress />
                </Box>
              ) : isError ? (
                <Typography color="error">Failed to load flights data.</Typography>
              ) : (
                <DataGrid
                  rows={flights}
                  columns={columns}
                  getRowId={(row) => row.id || row.flightID || row.flightNumber}
                  loading={isLoading}
                  pageSize={10}
                  rowsPerPageOptions={[5, 10, 20]}
                  onRowClick={handleRowClick}
                  components={{ Toolbar: GridToolbar }}
                  componentsProps={{
                    toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 300 },
                    },
                  }}
                  disableSelectionOnClick
                  autoHeight
                  columnBuffer={8}
                  columnThreshold={8}
                  sx={{
                    bgcolor: '#fafafa',
                    borderRadius: 2,
                    boxShadow: 0,
                    '& .MuiDataGrid-columnHeaders': {
                      bgcolor: '#e3f2fd',
                      fontWeight: 700,
                      fontSize: '1rem',
                      letterSpacing: 0.5,
                    },
                    '& .MuiDataGrid-row:hover': {
                      background: '#e3f2fd33',
                    },
                    '& .MuiDataGrid-cell': {
                      fontSize: '0.98rem',
                    },
                  }}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {},
                    },
                    pinnedColumns: {},
                  }}
                  columnVisibilityModel={{}}
                  disableColumnMenu={false}
                  disableColumnSelector={false}
                  disableColumnResize={false}
                  resizeable
                />
              )}
            </Paper>
          </Box>
        </Paper>
        <FlightForm
          open={open}
          onClose={() => setOpen(false)}
          initialFlight={selectedFlight}
        />
      </Container>
    </Box>
  );
}

export default FlightsPage;
