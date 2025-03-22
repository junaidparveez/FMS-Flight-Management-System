import React, { useEffect, useState } from "react";
import { fetchFlights } from "../services/AxiosInstance";

const Flights = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const getFlights = async () => {
      try {
        const response = await fetchFlights();
        console.log("data ", response);
        setFlights(response);
      } catch (err) {}
    };
    getFlights();
  }, []);

  return (
    <div>
      <h2>Available Flights</h2>
      {flights && flights.length > 0 ? (
        <div>
          <p>Flight Number: {flights[0].flightNumber}</p>
          <p>
            Departure: {flights[0].originalAirportCode} at{" "}
            {flights[0].departureDateTime}
          </p>
          <p>
            Arrival: {flights[0].destinationAirportCode} at{" "}
            {flights[0].arrivalDateTime}
          </p>
          <p>Available Seats: {flights[0].availableSeats}</p>
        </div>
      ) : (
        <p>No flights available</p>
      )}
    </div>
  );
};

export default Flights;
