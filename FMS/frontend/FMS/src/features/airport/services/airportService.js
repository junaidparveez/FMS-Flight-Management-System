import apiClient from '../../../common/services/apiClient';

export const getFlights = async () => {

 
  
  const params = {};
  // if (origin) params.origin = origin;
  // if (destination) params.destination = destination;
  // if (date) params.date = date;


   console.log("Get Flights Api Params ",params);
  const response = await apiClient.get('/airports');
  return response.data;
};
export const fetchAirports = async () => {
  const response = await apiClient.get('/airports');
  return response.data;
};

export const fetchAirport = async (id) => {
  const response = await apiClient.get(`/airports/${id}`);
  return response.data;
};

export const createAirport = async (airportData) => {
  const response = await apiClient.post('/airports', airportData);
  return response.data;
};

export const updateAirport = async ({ id, ...airportData }) => {
  const response = await apiClient.put(`/airports/${id}`, airportData);
  return response.data;
};

// Delete a flight
export const deleteAirport=async (id)=>
{
const response=await apiClient.delete(`/airports/${id}`)
return response.data;
}
