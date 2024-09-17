import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ChartOptions,
  registerables,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(...registerables);

interface SpreadHistogramProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  } | null;
  duration1: string;
  duration2: string;
}

const SpreadHistogram = ({ data, duration1, duration2 }: SpreadHistogramProps) => {
  if (!data || !data.datasets || data.datasets.length < 2) {
    return <div>No data available or insufficient datasets</div>;
  }

  const colors = {
    spreadLine: '#FF5733',
  };

  const calculateSpread = () => {
    return data.datasets[0].data.map((value, index) => value - data.datasets[1].data[index]);
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'MMM YYYY',
          displayFormats: {
            month: 'MMM YYYY',
          },
        },
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Spread (Percentage Points)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Spread Between ${duration1}-Year and ${duration2}-Year Treasury Yields`,
      },
    },
  };

  const histogramData = {
    labels: data.labels.map(label => new Date(label)),
    datasets: [
      {
        label: `Spread (${duration1} - ${duration2})`,
        data: calculateSpread(),
        borderColor: colors.spreadLine,
        backgroundColor: 'rgba(255, 87, 51, 0.5)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return <Line options={options} data={histogramData} />;
};

export default SpreadHistogram;
