import React, { useState } from 'react';

const FlightSearch = ({ onSearch }) => {
  const [inputs, setInputs] = useState({ origin: '', destination: '', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputs);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex space-x-2">
      <input
        type="text"
        placeholder="Origin"
        value={inputs.origin}
        onChange={(e) => setInputs({ ...inputs, origin: e.target.value })}
        className="px-3 py-2 border rounded flex-1"
      />
      <input
        type="text"
        placeholder="Destination"
        value={inputs.destination}
        onChange={(e) => setInputs({ ...inputs, destination: e.target.value })}
        className="px-3 py-2 border rounded flex-1"
      />
      <input
        type="date"
        value={inputs.date}
        onChange={(e) => setInputs({ ...inputs, date: e.target.value })}
        className="px-3 py-2 border rounded"
      />
      <button type="submit" className="bg-blue-800 text-black px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
};

export default FlightSearch;
