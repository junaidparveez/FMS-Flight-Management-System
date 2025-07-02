// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Stack,
// } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import AddIcon from "@mui/icons-material/Add";
// import BookingChart from "../components/BookingChart";
// import { fetchBookings } from "../services/bookingService";
// import BookingForm from "../components/BookingForm";

// const columns = [
//   { field: 'bookingId', headerName: 'Booking ID', width: 130 },
//   { field: 'flightId', headerName: 'Flight ID', width: 130 },
//   { field: 'passengerId', headerName: 'Passenger ID', width: 150 },
//   { field: 'paymentStatus', headerName: 'Payment Status', width: 160 },
// ];

// const BookingPage = () => {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState(null);

//   const { data: bookings = [], isLoading } = useQuery({
//     queryKey: ["bookings"],
//     queryFn: fetchBookings,
//   });

//   const handleCreate = () => {
//     setSelected(null);
//     setOpen(true);
//   };

//   const handleRowClick = (params) => {
//     setSelected(params.row);
//     setOpen(true);
//   };

//   return (
//     <Box p={3}>
//       <Stack direction="row" justifyContent="space-between" mb={3}>
//         <Typography variant="h4">Bookings</Typography>




//         <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
//         Book A Flight
//         </Button>
//       </Stack>

//       <Stack direction="row" spacing={2} mb={3}>
//         <Card variant="outlined" sx={{ flex: 1 }}>
//           <CardContent>
//             <Typography variant="h6">Total Bookings</Typography>
//             <Typography variant="h4">{bookings.length}</Typography>
//           </CardContent>
//         </Card>
//         <Card variant="outlined" sx={{ flex: 1 }}>
//           <CardContent>
//             <Typography variant="h6">Avg Bookings</Typography>
//             <Typography variant="h4">{(bookings.length / 10).toFixed(2)}</Typography>
//           </CardContent>
//         </Card>
//       </Stack>

//       <BookingChart />

//       <Box mt={3}>
//         <DataGrid
//           rows={bookings}
//           columns={columns}
//           getRowId={(row) => row.bookingId}
//           loading={isLoading}
//           pageSize={10}
//           rowsPerPageOptions={[5, 10, 20]}
//           onRowClick={handleRowClick}
//           components={{ Toolbar: GridToolbar }}
//           componentsProps={{
//             toolbar: {
//               showQuickFilter: true,
//               quickFilterProps: { debounceMs: 300 },
//             },
//           }}
//           disableSelectionOnClick
//           autoHeight
//         />
//       </Box>
//       <BookingForm/>
//     </Box>

    
//   );
// };

// export default BookingPage;
// src/pages/BookingsPage.jsx
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
import AddIcon from "@mui/icons-material/Add";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import BookingChart from "../components/BookingChart";
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

  // Example: load existing bookings on mount
  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  // --- Handlers ---
  // const handleSearch = async () => {
  //   const { sourceAirport, destinationAirport, bookingDate } = payload;
  //   if (!sourceAirport || !destinationAirport || !bookingDate) {
  //     return alert("Please fill in all search fields");
  //   }
  //   setSearching(true);
  //   try {
  //     const res = await apiClient.post("/flights/search", payload);
  //     setFlights(res.data);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error fetching flights");
  //   } finally {
  //     setSearching(false);
  //   }
  // };
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
  };

  const handleCreate = () => {
    // e.g. clear form or open modal
    setSelectedFlight(null);
  };

  // --- Column Definitions ---
  // const flightColumns = [
  //   { field: "flightID", headerName: "ID", width: 80 },
  //   { field: "flightNumber", headerName: "Flight No.", width: 120 },
  //   {
  //     field: "departureDateTime",
  //     headerName: "Departs",
  //     width: 180,
  //     valueFormatter: ({ value }) => new Date(value).toLocaleString(),
  //   },
  //   {
  //     field: "arrivalDateTime",
  //     headerName: "Arrives",
  //     width: 180,
  //     valueFormatter: ({ value }) => new Date(value).toLocaleString(),
  //   },
  //   { field: "originalAirportCode", headerName: "From", width: 100 },
  //   { field: "destinationAirportCode", headerName: "To", width: 100 },
  //   { field: "availableSeats", headerName: "Seats", width: 100 },
  // ];
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
      {/* --- Flight Search --- */}
      {/* <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        mb={3}
      >
        <TextField
          label="Source Airport"
          value={payload.sourceAirport}
          onChange={(e) =>
            setPayload({ ...payload, sourceAirport: e.target.value.toUpperCase() })
          }
        />
        <TextField
          label="Destination Airport"
          value={payload.destinationAirport}
          onChange={(e) =>
            setPayload({ ...payload, destinationAirport: e.target.value.toUpperCase() })
          }
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Booking Date"
            value={payload.bookingDate || null}
            onChange={(date) =>
              setPayload({
                ...payload,
                bookingDate: date ? date.toISOString().slice(0, 10) : "",
              })
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={searching}
        >
          Search Flights
        </Button>
      </Stack> */}

      <FlightSearchForm onSearch={handleSearch} />


      {/* --- Flight Results --- */}
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

      {/* --- Bookings Header & Stats --- */}
      {/* <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Bookings</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Book A Flight
        </Button>
      </Stack> */}

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

      {/* --- Bookings Chart & List --- */}
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
      <BookingForm selectedFlight={selectedFlight} />
    </Box>
  );
}
