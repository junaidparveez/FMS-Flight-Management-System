// src/features/bookings/pages/BookingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Button, Card, CardContent, Typography, Stack, TextField, MenuItem, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import {createPassenger} from '../../passenger/services/passengerService'
import { fetchBookings, createBooking } from '../services/bookingService';
import apiClient from '../../../common/services/apiClient';
import PassengerForm from '../../passenger/components/PassengerForm';
import PaymentForm from '../../payment/components/PaymentForm';


export default function BookingsPage() {
  const queryClient = useQueryClient();

  // Step states
  const [step, setStep] = useState(1);
  const [passenger, setPassenger] = useState({passengerId: '',firstName: '', lastName: '', emailId: '', passportNumber: '' });
  const [flightSearch, setFlightSearch] = useState({ sourceAirport: '', destinationAirport: '', bookingDate: '' });
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [payment, setPayment] = useState({ paymentId:'',paymentMethod: 'CARD', amount: '' });

  // Load bookings
  const { data: bookings = [], isLoading: loadingBookings } = useQuery({
    queryKey: ['bookings'],
    queryFn: fetchBookings,
  });

  // Mutations
  const passengerMutation = useMutation({ mutationFn: createPassenger });
  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookings'] }),
  });

  // Handlers


  const handleSearchFlights = async () => {
    const { sourceAirport, destinationAirport, bookingDate } = flightSearch;
    if (!sourceAirport || !destinationAirport || !bookingDate) {
      return alert('Fill search fields');
    }
    try {
      const res = await apiClient.post('/flights/search', flightSearch);
      setFlights(res.data);
    } catch {
      alert('Flight search failed');
    }
  };
  const handleSelectFlight = (params) => {
    setSelectedFlight(params.row);
    setStep(3);
  };

  const handleBookingSubmit = async () => {
    try {
      await bookingMutation.mutateAsync({
        flightId: selectedFlight.flightID,
        passengerId: passenger.passengerId,
        payment: { ...payment, transactionDateTime: new Date().toISOString() }
      });
      alert('Booking successful');
      setStep(1);
      setPassenger({ firstName: '', lastName: '', emailId: '', passportNumber: '' });
      setFlightSearch({ sourceAirport: '', destinationAirport: '', bookingDate: '' });
      setFlights([]);
      setSelectedFlight(null);
    } catch {
      alert('Booking failed');
    }
  };

  // Render by step
  return (
    <Box p={3}>
   {step === 1 && (
  <PassengerForm
    onSuccess={(savedPassenger) => {
      setPassenger(savedPassenger);
      setStep(2);
    }}
  />
)}

      {step === 2 && (
        <>
          <Typography variant="h5">Step 2: Search Flights</Typography>
          <Stack direction="row" spacing={2} my={2}>
            <TextField label="From" name="sourceAirport" value={flightSearch.sourceAirport} onChange={e => setFlightSearch({...flightSearch, sourceAirport: e.target.value})} />
            <TextField label="To" name="destinationAirport" value={flightSearch.destinationAirport} onChange={e => setFlightSearch({...flightSearch, destinationAirport: e.target.value})} />
            <TextField
              label="Date" name="bookingDate" type="date" InputLabelProps={{ shrink: true }}
              value={flightSearch.bookingDate} onChange={e => setFlightSearch({...flightSearch, bookingDate: e.target.value})}
            />
            <Button variant="contained" onClick={handleSearchFlights}>Search</Button>
          </Stack>
          {flights.length > 0 && (
            <DataGrid
              rows={flights}
              columns={[
                { field: 'flightID', headerName: 'ID', width: 80 },
                { field: 'flightNumber', headerName: 'Flight #', width: 120 },
                { field: 'departureDateTime', headerName: 'Departs', width: 180, valueFormatter: ({value}) => new Date(value).toLocaleString() },
                { field: 'availableSeats', headerName: 'Seats', width: 100 }
              ]}
              getRowId={r => r.flightID}
              autoHeight
              onRowClick={handleSelectFlight}
              components={{ Toolbar: GridToolbar }}
            />
          )}
        </>
      )}

      {step === 3 && selectedFlight && (
        <Dialog open fullWidth maxWidth="sm">
          <DialogTitle>Step 3: Payment & Confirm</DialogTitle>
       <DialogContent>
  <Typography gutterBottom>Flight: {selectedFlight.flightNumber}</Typography>

  {!payment?.paymentId ? (
    <PaymentForm
      onSuccess={(savedPayment) => setPayment(savedPayment)}
    />
  ) : (
    <Typography color="green">
      Payment saved successfully with ID: {payment.paymentId}
    </Typography>
  )}
</DialogContent>
          <DialogActions>
            <Button onClick={() => setStep(2)}>Back</Button>
          <Button
  variant="contained"
  onClick={handleBookingSubmit}
  disabled={bookingMutation.isLoading || !payment.paymentId}
>
  {bookingMutation.isLoading ? 'Booking…' : 'Confirm'}
</Button>

          </DialogActions>
        </Dialog>
      )}

      {/* Always show existing bookings */}
      <Box mt={4}>
        <Typography variant="h5">All Bookings</Typography>
        <DataGrid
          rows={bookings}
          columns={[
            { field: 'bookingId', headerName: 'Booking ID', width: 120 },
            { field: 'passenger.firstName', headerName: 'Passenger', width: 180, valueGetter: ({row}) => `${row.passenger.firstName} ${row.passenger.lastName}` },
            { field: 'flight.flightNumber', headerName: 'Flight #', width: 120, valueGetter: ({row}) => row.flight.flightNumber },
            { field: 'paymentStatus', headerName: 'Status', width: 120 }
          ]}
          getRowId={r => r.bookingId}
          loading={loadingBookings}
          autoHeight
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}
