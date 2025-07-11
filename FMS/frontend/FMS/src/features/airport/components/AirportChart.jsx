import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend
} from 'chart.js';
import apiClient from '../../../common/services/apiClient';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Airport by Location chart, data from backend /airports/chart
const AirportChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
      setLoading(true);
      apiClient
        .get("/charts/airportlocation")                        // ← lowercase path
        .then((res) => setChartData(res.data))
        .catch((err) => {
          console.error(err);
          setError("Failed to load chart data");
        })
        .finally(() => setLoading(false));
    }, []);

  // useEffect(() => {
  //   setLoading(true);
  //    apiClient.get('/charts/airportlocation')
  //     .then(res => {
  //       if (!res.ok) throw new Error('Failed to fetch chart data');
  //       return res.json();
  //     })
  //     .then(data => {
  //       // Expecting data: [{ location: 'City', count: 5 }, ...]
  //       setChartData(data);
  //       setLoading(false);
  //     })
  //     .catch(e => {
  //       setError(e.message);
  //       setLoading(false);
  //     });
  // }, []);

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!chartData || chartData.length === 0) return <div>No chart data available.</div>;

  const labels = chartData.map(item => item.location);
  const data = {
    labels,
    datasets: [
      {
        label: 'Airports by Location',
        data: chartData.map(item => item.count),
        backgroundColor: 'rgba(63,81,181,0.5)',
        borderColor: 'rgba(63,81,181,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Airports by Location' },
    },
    scales: {
      x: { title: { display: true, text: 'Location' } },
      y: { title: { display: true, text: 'Number of Airports' }, beginAtZero: true }
    }
  };

  return <Bar data={data} options={options} />;
};

export default AirportChart;