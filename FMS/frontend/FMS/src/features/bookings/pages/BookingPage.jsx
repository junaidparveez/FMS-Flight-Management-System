import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import BookingChart from "../components/BookingChart";
import { fetchBookings } from "../services/bookingService";

const columns = [
  { field: 'bookingId', headerName: 'Booking ID', width: 130 },
  { field: 'flightId', headerName: 'Flight ID', width: 130 },
  { field: 'passengerId', headerName: 'Passenger ID', width: 150 },
  { field: 'paymentStatus', headerName: 'Payment Status', width: 160 },
];

const BookingPage = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleRowClick = (params) => {
    setSelected(params.row);
    setOpen(true);
  };

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Bookings</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Create New Booking
        </Button>
      </Stack>

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
            <Typography variant="h4">{(bookings.length / 10).toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </Stack>

      <BookingChart />

      <Box mt={3}>
        <DataGrid
          rows={bookings}
          columns={columns}
          getRowId={(row) => row.bookingId}
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
    </Box>
  );
};

export default BookingPage;
