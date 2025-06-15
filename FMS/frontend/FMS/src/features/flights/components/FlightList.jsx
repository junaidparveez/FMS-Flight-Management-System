import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFlights } from '../services/flightService';

const FlightList = ({ filters }) => {
  const { data, isLoading, error } = useQuery(['flights', filters], () => getFlights(filters), {
    enabled: !!filters.date, // only fetch when date is provided
  });

  if (isLoading) return <p>Loading flights...</p>;
  if (error) return <p>Error loading flights.</p>;
  if (!data || data.length === 0) return <p>No flights found.</p>;

  return (
    <div className="space-y-4">
      {data.map((flight) => (
        <div key={flight.id} className="p-4 border rounded shadow-sm">
          <h2 className="text-lg font-semibold">{flight.origin} → {flight.destination}</h2>
          <p>Date: {flight.date}</p>
          <p>Price: {flight.price}</p>
          {/* Add more flight details and actions */}
        </div>
      ))}
    </div>
  );
};

export default FlightList;
