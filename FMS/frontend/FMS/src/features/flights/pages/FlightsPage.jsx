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
import { fetchFlights, deleteFlight } from "../services/flightService";
import Sidebar from "../../../common/components/Sidebar";

const FlightsPage = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Fetch flights from backend
  const { data: flights = [], isLoading, isError } = useQuery({
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
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f4f6f8' }}>
      {/* Sidebar (optional, can be uncommented if needed) */}
      {/* <Sidebar /> */}
      <Container maxWidth="xl" sx={{ py: 4, flexGrow: 1 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <FlightTakeoffIcon color="primary" fontSize="large" />
              <Typography variant="h4" fontWeight={700} color="primary.main">
                Flights Dashboard
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              Create New Flight
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" gap={2} mb={2}>
            <Card variant="outlined" sx={{ flex: 1, bgcolor: '#e3f2fd', border: 0 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Total Flights</Typography>
                <Typography variant="h3" color="primary.main" fontWeight={700}>{totalFlights}</Typography>
              </CardContent>
            </Card>
            <Card variant="outlined" sx={{ flex: 1, bgcolor: '#fff3e0', border: 0 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Avg Available Seats</Typography>
                <Typography variant="h3" color="orange" fontWeight={700}>{avgSeats}</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box my={2}>
            {/* Chart section */}
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: '#f9fafb' }}>
              <Typography variant="h6" mb={1} color="primary">Flights Overview</Typography>
              {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
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
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6" mb={2} color="primary">Flights Table</Typography>
              {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
                  <CircularProgress />
                </Box>
              ) : isError ? (
                <Typography color="error">Failed to load flights data.</Typography>
              ) : (
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
                  sx={{
                    bgcolor: '#fafafa',
                    borderRadius: 2,
                    boxShadow: 0,
                    '& .MuiDataGrid-columnHeaders': { bgcolor: '#e3f2fd' },
                  }}
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
