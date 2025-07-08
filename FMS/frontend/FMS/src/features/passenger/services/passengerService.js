// src/features/bookings/services/passengerService.js
import apiClient from '../../../common/services/apiClient';

export const createPassenger = async (passenger) => {
  const res = await apiClient.post('/passengers', passenger);
  return res.data; // returns PassengerDTO with passengerId
};
