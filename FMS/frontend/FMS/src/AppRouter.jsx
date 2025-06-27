import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import LoginPage from './features/auth/pages/LoginPage';
import FlightsPage from './features/flights/pages/FlightsPage';
import AirlinePage from './features/airline/pages/AirlinePage';
import BookingPage from './features/bookings/pages/BookingPage';
import ProtectedRoute from './common/components/ProtectedRoute';
import Register from './features/auth/pages/Register';
import AirportPage from './features/airport/pages/AirportPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/flights" element={<ProtectedRoute><FlightsPage /></ProtectedRoute>} />
      <Route path="/airports" element={<ProtectedRoute><AirportPage /></ProtectedRoute>} />
       <Route path="/airlines" element={<ProtectedRoute><AirlinePage /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
      <Route path="/register" element={<Register/>}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
