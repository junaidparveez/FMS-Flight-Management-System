import apiClient from '../../../common/services/apiClient';

export const getFlights = async ({ origin, destination, date }) => {
  const params = {};
  if (origin) params.origin = origin;
  if (destination) params.destination = destination;
  if (date) params.date = date;
  const response = await apiClient.get('/flights', { params });
  return response.data;
};
