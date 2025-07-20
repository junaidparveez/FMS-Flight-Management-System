import apiClient from "../../../common/services/apiClient";

export const getFlights = async () => {
  const params = {};
  // if (origin) params.origin = origin;
  // if (destination) params.destination = destination;
  // if (date) params.date = date;

  console.log("Get Flights Api Params ", params);
  const response = await apiClient.get("/flights");
  return response.data;
};
export const fetchFlights = async () => {
  const response = await apiClient.get("/flights");
  return response.data;
};

export const fetchFlight = async (id) => {
  const response = await apiClient.get(`/flights/${id}`);
  return response.data;
};

export const createFlight = async (flightData) => {
  console.log("flightData :", flightData);
  const response = await apiClient.post("/flights", flightData);
  return response.data;
};

export const updateFlight = async ({ id, ...flightData }) => {

  const response = await apiClient.put(`/flights/${id}`, flightData);
  return response.data;
};

// Delete a flight
export const deleteFlight = async (id) => {
  console.log("calling flight with ID:", id);
  const response = await apiClient.delete(`/flights/${id}`);
  return response.data;
};

// (Optional) Fetch lists for selects
export const fetchAirports = async () => {
  const response = await apiClient.get("/airports");
  return response.data;
};
export const fetchAirlines = async () => {
  const response = await apiClient.get("/airlines");
  return response.data;
};
