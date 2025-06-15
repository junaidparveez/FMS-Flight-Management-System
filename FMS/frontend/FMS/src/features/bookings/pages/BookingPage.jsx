import React from 'react';
import BookingList from '../components/BookingList';

const BookingPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <BookingList />
    </div>
  );
};

export default BookingPage;
