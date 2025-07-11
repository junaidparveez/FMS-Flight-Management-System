import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// BookingChart: Bookings by Status (example)
const BookingChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/bookings/chart')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch chart data');
        return res.json();
      })
      .then(data => {
        // Expecting data: [{ status: 'CONFIRMED', count: 10 }, ...]
        setChartData(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!chartData || chartData.length === 0) return <div>No chart data available.</div>;

  const labels = chartData.map(item => item.status);
  const data = {
    labels,
    datasets: [
      {
        label: 'Bookings by Status',
        data: chartData.map(item => item.count),
        backgroundColor: 'rgba(76,175,80,0.5)',
        borderColor: 'rgba(76,175,80,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Bookings by Status' },
    },
    scales: {
      x: { title: { display: true, text: 'Status' } },
      y: { title: { display: true, text: 'Number of Bookings' }, beginAtZero: true }
    }
  };

  return <Bar data={data} options={options} />;
};

export default BookingChart;