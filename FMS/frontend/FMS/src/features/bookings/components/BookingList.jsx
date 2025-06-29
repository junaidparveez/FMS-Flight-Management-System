import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBookings } from '../services/bookingService';

const BookingList = () => {
  const { data, isLoading, error } = useQuery(['bookings'], fetchBookings);

  if (isLoading) return <p>Loading bookings...</p>;
  if (error) return <p>Error loading bookings.</p>;
  if (!data || data.length === 0) return <p>No bookings found.</p>;

  return (
    <div className="space-y-4">
      {data.map((booking) => (
        <div key={booking.id} className="p-4 border rounded shadow-sm">
          <h2 className="text-lg font-semibold">Booking ID: {booking.id}</h2>
          <p>Flight: {booking.flightId}</p>
          <p>Status: {booking.status}</p>
          {/* Add more booking details and actions */}
        </div>
      ))}
    </div>
  );
};

export default BookingList;
