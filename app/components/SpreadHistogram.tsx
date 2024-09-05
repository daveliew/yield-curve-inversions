import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SpreadHistogram({ data }: { data: ChartData<'bar'> }) {
  // Implement histogram configuration and rendering here
  return <Bar data={data} />;
}
