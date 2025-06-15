import React, { useState } from 'react';
import FlightList from '../components/FlightList';
import FlightSearch from '../components/FlightSearch';

const FlightsPage = () => {
  const [filters, setFilters] = useState({ origin: '', destination: '', date: '' });

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Flights</h1>
      <FlightSearch onSearch={handleSearch} />
      <FlightList filters={filters} />
    </div>
  );
};

export default FlightsPage;
