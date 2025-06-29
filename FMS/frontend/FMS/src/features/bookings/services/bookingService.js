import apiClient from '../../../common/services/apiClient';

export const fetchBookings = async () => {
  const response = await apiClient.get('/bookings');
  return response.data;
};
