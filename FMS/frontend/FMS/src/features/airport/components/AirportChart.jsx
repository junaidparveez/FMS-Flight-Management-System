import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AirportChart = ({ flights }) => {
  // Count flights per date (using departureDateTime)
  const countsByDate = {};
  flights.forEach(f => {
    const date = new Date(f.departureDateTime).toLocaleDateString();
    countsByDate[date] = (countsByDate[date] || 0) + 1;
  });

  // Prepare sorted labels and data
  const labels = Object.keys(countsByDate).sort(
    (a,b) => new Date(a) - new Date(b)
  );
  const data = {
    labels,
    datasets: [
      {
        label: 'Flights per Day',
        data: labels.map(date => countsByDate[date]),
        backgroundColor: 'rgba(63,81,181,0.5)', // MUI primary color
        borderColor: 'rgba(63,81,181,1)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Flights Per Day' },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Number of Flights' }, beginAtZero: true }
    }
  };

  return <Line data={data} options={options} />;
};

export default AirportChart;