import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const durations = ['1', '2', '5', '10', '30'];

export default function YieldChart() {
  const [chartData, setChartData] = useState(null);
  const [duration1, setDuration1] = useState('5');
  const [duration2, setDuration2] = useState('10');

  useEffect(() => {
    fetchData();
  }, [duration1, duration2]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/yieldData?duration1=${duration1}&duration2=${duration2}`);
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDurationChange = (setter) => (event) => {
    setter(event.target.value);
  };

  if (!chartData) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <select value={duration1} onChange={handleDurationChange(setDuration1)}>
          {durations.map(d => <option key={d} value={d}>{d} Year</option>)}
        </select>
        <select value={duration2} onChange={handleDurationChange(setDuration2)}>
          {durations.map(d => <option key={d} value={d}>{d} Year</option>)}
        </select>
      </div>
      <Line data={chartData} />
    </div>
  );
}