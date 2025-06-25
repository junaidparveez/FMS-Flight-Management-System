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
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import FlightForm from "../components/FlightForm";
import FlightChart from "../components/FlightChart";
import { fetchFlights, deleteFlight } from "../services/flightService";
import Sidebar from "../../../common/components/Sidebar";

const FlightsPage = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  // ✅ useQuery with object syntax
  const { data: flights = [], isLoading } = useQuery({
    queryKey: ["flights"],
    queryFn: fetchFlights,
  });

  // ✅ deleteFlight mutation with object syntax
  const deleteMutation = useMutation({
    mutationFn: deleteFlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flights"] });
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Delete this flight?")) {
      deleteMutation.mutate(id);
    }
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
  const totalFlights = flights.length;
  const avgSeats = totalFlights
    ? (
        flights.reduce((sum, f) => sum + (f.availableSeats || 0), 0) /
        totalFlights
      ).toFixed(1)
    : 0;

  const columns = [
    { field: "flightNumber", headerName: "Flight #", width: 130 },
    { field: "departureDateTime", headerName: "Departure", flex: 1 },
    { field: "arrivalDateTime", headerName: "Arrival", flex: 1 },
    { field: "originalAirportCode", headerName: "Origin", width: 100 },
    { field: "destinationAirportCode", headerName: "Destination", width: 100 },
    { field: "availableSeats", headerName: "Seats", type: "number", width: 80 },
    { field: "airlineId", headerName: "Airline", width: 120 },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.id)} color="error">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Container display="flex" height="100vh" width="100%">
      {/* 2) Sidebar with fixed width */}

      {/* 3) Main content area grows to fill remaining space */}
      <Box component="main" flexGrow={1} p={2} overflow="auto">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Flights</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            Create New Flight
          </Button>
        </Box>

        <Box my={2} display="flex" gap={2}>
          <Card variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Total Flights</Typography>
              <Typography variant="h4">{totalFlights}</Typography>
            </CardContent>
          </Card>
          <Card variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Avg Available Seats</Typography>
              <Typography variant="h4">{avgSeats}</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box my={2}>
          <FlightChart flights={flights} />
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={flights}
            columns={columns}
            getRowId={(row) => row.id || row.flightNumber}
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
          />
        </Box>

        <FlightForm
          open={open}
          onClose={() => setOpen(false)}
          initialFlight={selectedFlight}
        />
      </Box>
    </Container>
  );
};

export default FlightsPage;
