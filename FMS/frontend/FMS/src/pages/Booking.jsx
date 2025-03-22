import React, { useEffect, useState } from 'react';
import { fetchFlights } from '../services/AxiosInstance';

const Booking = () => {
//   const [flights, setFlights] = useState([]);

  useEffect(() => {
    // fetchFlights().then(setFlights);
    console.log("calling api");
    
  }, []);

  return (
    <div>
      <h2>Available Bookings</h2>
      {/* <ul>
        {flights.map(flight => (
          <li key={flight.FlightID}>
            {flight.FlightNumber} - {flight.OriginAirportCode} to {flight.DestinationAirportCode}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Booking;
