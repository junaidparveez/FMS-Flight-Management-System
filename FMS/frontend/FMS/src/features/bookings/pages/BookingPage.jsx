
import BookingChart from "../components/BookingChart";
import { fetchBookings } from "../services/bookingService";
import React, { useState, useEffect } from "react";

import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import BookingForm from "../components/BookingForm";
import apiClient from "../../../common/services/apiClient";
import FlightSearchForm from "./FlightSearchForm";

export default function BookingsPage() {
  // --- Existing Bookings State ---
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- New Search State ---
  const [payload, setPayload] = useState({
    sourceAirport: "",
    destinationAirport: "",
    bookingDate: "",
  });
  const [flights, setFlights] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Example: load existing bookings on mount
  
  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  
const handleSearch = async ({ sourceAirport, destinationAirport, bookingDate }) => {
  if (!sourceAirport || !destinationAirport || !bookingDate) {
    return alert("Please fill in all search fields");
  }
  setSearching(true);
  try {
    const res = await apiClient.post("/flights/search", {
      sourceAirport,
      destinationAirport,
      bookingDate,
    });
    setFlights(res.data);
  } catch (err) {
    console.error(err);
    alert("Error fetching flights");
  } finally {
    setSearching(false);
  }
};
  const handleFlightSelect = (params) => {
    setSelectedFlight(params.row);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedFlight(null);
  };

  const handleBookingComplete = () => {
    handleFormClose();
    loadBookings();
  };

  const handleCreate = () => {
    // e.g. clear form or open modal
    setSelectedFlight(null);
  };
const flightColumns = [
  { field: "flightID", headerName: "ID", width: 80 },
  { field: "flightNumber", headerName: "Flight No.", width: 120 },
  {
    field: "departureDateTime",
    headerName: "Departs",
    width: 180,
    valueFormatter: (params) => {
      const v = params?.value;
      return v ? new Date(v).toLocaleString() : "";
    },
  },
  {
    field: "arrivalDateTime",
    headerName: "Arrives",
    width: 180,
    valueFormatter: (params) => {
      const v = params?.value;
      return v ? new Date(v).toLocaleString() : "";
    },
  },
  { field: "originalAirportCode", headerName: "From", width: 100 },
  { field: "destinationAirportCode", headerName: "To", width: 100 },
  { field: "availableSeats", headerName: "Seats", width: 100 },
];

  // Replace these with your actual booking columns
  const bookingColumns = [
    { field: "bookingId", headerName: "Booking ID", width: 120 },
    { field: "flightNumber", headerName: "Flight No.", width: 120 },
    { field: "passengerName", headerName: "Passenger", width: 180 },
    { field: "bookingDate", headerName: "Booked On", width: 160 },
    // ...
  ];

  return (
    <Box p={3}>
      <FlightSearchForm onSearch={handleSearch} />
      {flights.length > 0 && (
        <Box mb={5}>
          <Typography variant="h5" gutterBottom>
            Select a Flight to Book
          </Typography>
          <DataGrid
            rows={flights}
            columns={flightColumns}
            getRowId={(row) => row.flightID}
            loading={searching}
            pageSize={5}
            autoHeight
            onRowClick={handleFlightSelect}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 300 } },
            }}
          />
        </Box>
      )}

      <Stack direction="row" spacing={2} mb={3}>
        <Card variant="outlined" sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h4">{bookings.length}</Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Avg Bookings</Typography>
            <Typography variant="h4">
              {(bookings.length / 10).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <BookingChart />
      <Box mt={3}>
        <DataGrid
          rows={bookings}
          columns={bookingColumns}
          getRowId={(row) => row.bookingId}
          loading={isLoading}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 300 } },
          }}
          disableSelectionOnClick
          autoHeight
        />
      </Box>

      {/* --- Booking Form --- */}
      <BookingForm  
        open={isFormOpen}
        selectedFlight={selectedFlight}
        onClose={handleFormClose}
        onComplete={handleBookingComplete} />
    </Box>
  );
}
