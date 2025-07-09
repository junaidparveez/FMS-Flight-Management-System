// src/features/bookings/services/passengerService.js
import apiClient from '../../../common/services/apiClient';

export const createPassenger = async (passenger) => {
  const res = await apiClient.post('/passengers', passenger);
  return res.data; // returns PassengerDTO with passengerId
};

export const fetchPassengers = async () => {
  const res = await apiClient.get('/passengers');
  return res.data; // returns array of passengers
};

export const deletePassenger = async (id) => {
  await apiClient.delete(`/passengers/${id}`);
  return id;
};
