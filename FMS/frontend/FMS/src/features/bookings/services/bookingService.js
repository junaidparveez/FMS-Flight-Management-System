import apiClient from '../../../common/services/apiClient';

export const getBookings = async () => {
  const response = await apiClient.get('/bookings');
  return response.data;
};
