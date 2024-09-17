import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import SpreadHistogram from './SpreadHistogram'; // Import the SpreadHistogram component

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const durations = ['1', '2', '5', '10', '30'];

export default function YieldChart() {
  const [chartData, setChartData] = useState(null);
  const [duration1, setDuration1] = useState('2'); // Set default to 2 years
  const [duration2, setDuration2] = useState('10'); // Set default to 10 years

  useEffect(() => {
    fetchData();
  }, [duration1, duration2]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/yieldData?duration1=${duration1}&duration2=${duration2}`);
      const data = await response.json();
      console.log('Fetched Data:', data); // Log the fetched data
      setChartData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDurationChange = (setter) => (event) => {
    setter(event.target.value);
  };

  if (!chartData) return <div className="loading">Loading...</div>;

  return (
    <div className="yield-chart">
      <div className="dropdown-container">
        <div className="dropdown-wrapper">
          <label htmlFor="duration1">First Duration:</label>
          <select
            id="duration1"
            value={duration1}
            onChange={handleDurationChange(setDuration1)}
            className="dropdown"
          >
            {durations.map(d => <option key={d} value={d}>{d} Year</option>)}
          </select>
        </div>
        <div className="dropdown-wrapper">
          <label htmlFor="duration2">Second Duration:</label>
          <select
            id="duration2"
            value={duration2}
            onChange={handleDurationChange(setDuration2)}
            className="dropdown"
          >
            {durations.map(d => <option key={d} value={d}>{d} Year</option>)}
          </select>
        </div>
      </div>
      <div className="chart-wrapper">
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      {/* Pass the selected durations and chart data to the SpreadHistogram component */}
      <SpreadHistogram data={chartData} duration1={duration1} duration2={duration2} />
    </div>
  );
}