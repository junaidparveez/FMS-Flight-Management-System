// src/features/bookings/pages/BookingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Button, Card, CardContent, Typography, Stack, TextField, MenuItem, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { createPassenger } from '../../passenger/services/passengerService'
import { fetchBookings, createBooking } from '../services/bookingService';
import apiClient from '../../../common/services/apiClient';
import PassengerForm from '../../passenger/components/PassengerForm';
import PaymentForm from '../../payment/components/PaymentForm';
import FlightSearchForm from '../pages/FlightSearchForm';

export default function BookingsPage() {
  const queryClient = useQueryClient();

  // Step states
  const [step, setStep] = useState(1);
  const [passenger, setPassenger] = useState({ passengerId: '', firstName: '', lastName: '', emailId: '', passportNumber: '' });
  const [flightSearch, setFlightSearch] = useState({ sourceAirport: '', destinationAirport: '', bookingDate: '' });
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [payment, setPayment] = useState({ paymentId: '', paymentMethod: 'CARD', amount: '' });
  const [booking, setBooking] = useState();


 useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiClient.get("/reports/booking");
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking report:", error);
      }
    };

    fetchBookings();
  }, [payment]);
  // Load bookings
  const { data: bookings = [], isLoading: loadingBookings } = useQuery({
    queryKey: ['bookings'],
    queryFn: fetchBookings,
  });


  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookings'] }),
  });



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
      setPayment({ paymentId: '', paymentMethod: 'CARD', amount: '' });
      setFlights([]);
      setSelectedFlight(null);
    } catch {
      alert('Booking failed');
    }
  };
  console.log('bookingDate',{flightSearch});
  // Render by step
  return (
    <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: 1100, mx: 'auto' }}>
      {/* Step 1: Passenger */}
      {step === 1 && (
        <Card elevation={2} sx={{ mb: 3 }}>
          <CardContent>
            <PassengerForm
              onSuccess={(savedPassenger) => {
                setPassenger(savedPassenger);
                setStep(2);
              }}
              submitLabel="Next"
            />
          </CardContent>
        </Card>
      )}

      {/* Step 2: Search Flights */}
      {step === 2 && (
        <Card elevation={2} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" mb={2} fontWeight={600}>Step 2: Search Flights</Typography>
            <FlightSearchForm
              onSearch={(searchParams) => {
                setFlightSearch(searchParams);
                // mimic handleSearchFlights logic
                (async () => {
                  try {
                    const res = await apiClient.post('/flights/search', searchParams);
                    setFlights(res.data);
                  } catch {
                    alert('Flight search failed');
                  }
                })();
              }}
            />
          
            {flights.length > 0 && (
              <DataGrid
                rows={flights}
                columns={[
                  { field: 'flightID', headerName: 'ID', width: 80 },
                  { field: 'flightNumber', headerName: 'Flight #', width: 120 },
                  {
                    field: 'departureDateTime',
                    headerName: 'Departs',
                    width: 180,
                    valueFormatter: () => {
                      // params.value is the date string
                      
                      const date = new Date(flightSearch.bookingDate);
                      return date.toLocaleString();
                    }
                  },
                  { field: 'availableSeats', headerName: 'Seats', width: 100 }
                ]}
                getRowId={r => r.flightID}
                autoHeight
                onRowClick={handleSelectFlight}
                components={{ Toolbar: GridToolbar }}
                sx={{ bgcolor: '#fafafa', borderRadius: 2, mt: 2 }}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Payment & Confirm */}
      {step === 3 && selectedFlight && (
        <Dialog open fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 600 }}>Step 3: Payment & Confirm</DialogTitle>
          <DialogContent>
            <Typography gutterBottom fontWeight={500} mb={2}>
              Flight: <b>{selectedFlight.flightNumber}</b>
            </Typography>

            {!payment?.paymentId ? (
              <PaymentForm
                onSuccess={(savedPayment) => setPayment(savedPayment)}
              />
            ) : (
              <Typography color="success.main" fontWeight={600}>
                Payment saved successfully with ID: {payment.paymentId}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStep(2)} variant="outlined">Back</Button>
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
      <Card elevation={2} sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" mb={2} fontWeight={600}>All Bookings</Typography>
          <DataGrid
            rows={booking}
            columns={[
              { field: 'bookingId', headerName: 'Booking ID', width: 120 },
              { field: 'paymentStatus', headerName: 'Status', width: 120 },
              { field: 'flightNumber', headerName: 'Flight No.', width: 130 },
            
              { field: 'passengerName', headerName: 'Passenger', width: 160 },
              { field: 'paymentAmount', headerName: 'Amount', width: 120, type: 'number' }
            ]}
            getRowId={r => r.bookingId}
            loading={loadingBookings}
            autoHeight
            components={{ Toolbar: GridToolbar }}
            sx={{ bgcolor: '#fafafa', borderRadius: 2 }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
