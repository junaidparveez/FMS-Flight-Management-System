import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAirports } from '../services/airportService';

const AirportList = () => {

 const { data, isLoading, error } = useQuery({
    queryKey: ['airports'],
    queryFn: () => fetchAirports()
  });

  if (isLoading) return <p>Loading Airports...</p>;
  if (error) return <p>Error loading Airports.</p>;
  if (!data || data.length === 0) return <p>No airports found.</p>;

  return (
    <div className="space-y-4">
       <p>Airports will be listed here.</p>
      {/* {data.map((flight) => ( */}
        {/* <div key={flight.id} className="p-4 border rounded shadow-sm"> */}
          {/* <h2 className="text-lg font-semibold">{flight.origin} → {flight.destination}</h2> */}
          {/* <p>Date: {flight.date}</p>
          <p>Price: {flight.price}</p> */}
          {/* Add more flight details and actions */}
        {/* </div> */}
      {/* // ))} */}
    </div>
  );
};

export default AirportList;
