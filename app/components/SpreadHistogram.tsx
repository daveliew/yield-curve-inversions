import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ChartOptions,
  registerables,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter

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

export default function SpreadHistogram({ data, duration1, duration2 }: SpreadHistogramProps) {
  if (!data || !data.datasets || data.datasets.length < 2) {
    return <div>No data available or insufficient datasets</div>; // Handle case where data is not available or insufficient
  }

  // Define colors for the spread line
  const colors = {
    spreadLine: '#FF5733', // Color for the spread line
  };

  // Calculate the spread
  const spreadData = data.datasets[0].data.map((value, index) => {
    const secondValue = data.datasets[1].data[index];
    return value - secondValue; // Calculate the spread
  });

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time', // Ensure the x-axis is a time scale
        time: {
          tooltipFormat: 'MMM YYYY', // Format for tooltip
          displayFormats: {
            month: 'MMM YYYY', // Format for x-axis labels
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
      // Custom plugin to highlight positive spread area
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        const yScale = chart.scales.y;
        const xScale = chart.scales.x;

        // Clear the area before drawing
        ctx.clearRect(0, 0, chart.width, chart.height);

        // Draw the positive spread area
        ctx.save();
        ctx.fillStyle = 'rgba(211, 211, 211, 0.5)'; // Light grey color

        // Draw the area where the spread is positive
        spreadData.forEach((value, index) => {
          if (value > 0) {
            const x = xScale.getPixelForValue(index);
            const y = yScale.getPixelForValue(value);
            ctx.fillRect(x, yScale.getPixelForValue(0), xScale.getPixelForValue(1) - 1, y - yScale.getPixelForValue(0));
          }
        });

        ctx.restore();
      },
    },
  };

  // Ensure your labels are in date format
  const histogramData = {
    labels: data.labels.map(label => new Date(label)), // Convert labels to Date objects
    datasets: [
      {
        label: `Spread (${duration1} - ${duration2})`,
        data: spreadData, // Use the calculated spread data
        borderColor: colors.spreadLine,
        backgroundColor: 'rgba(255, 87, 51, 0.5)', // Semi-transparent fill for the spread line
        fill: false, // Do not fill under the line
        tension: 0.1, // Smooth the line
      },
    ],
  };

  return <Line options={options} data={histogramData} />;
}
