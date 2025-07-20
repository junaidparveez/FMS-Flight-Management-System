import apiClient from '../../../common/services/apiClient';




export const fetchBookings = async () => {
  const res = await apiClient.get('/bookings');
  return res.data;
};

export const createBooking = async ({ flightId, passengerId, payment }) => {
  // Your BookingDTO likely needs passengerId and flightId
  const payload = { flightId, passengerId, paymentId: payment.paymentId,  paymentStatus: payment.paymentId ? 'PAID' : 'PENDING', };
  const res = await apiClient.post('/bookings', payload);
  return res.data;
};
