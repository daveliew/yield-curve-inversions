import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ProbabilityChange {
  date: string;
  changes: {
    [rate: string]: number;
  };
}

export default function FedWatch() {
  const [data, setData] = useState<ProbabilityChange[]>([]);

  useEffect(() => {
    const fetchFedWatchData = async () => {
      try {
        const response = await fetch('/api/fedwatch');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching FedWatch data:', error);
      }
    };

    fetchFedWatchData();
  }, []);

  const chartData = {
    labels: data.map(item => item.date),
    datasets: Object.keys(data[0]?.changes || {}).map(rate => ({
      label: `${rate} bps`,
      data: data.map(item => item.changes[rate]),
      fill: false,
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
    })),
  };

  return (
    <div>
      <h2>Fed Watch Probability Changes (Week-on-Week)</h2>
      <Line data={chartData} />
    </div>
  );
}
