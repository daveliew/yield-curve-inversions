'use client';

import ChartComponent from './components/ChartComponent';
import SpreadHistogram from './components/SpreadHistogram';

// Add a default or placeholder chart data
const placeholderChartData = {
  labels: [],
  datasets: []
};

const histogramData = {
  labels: ['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'],
  datasets: [
    {
      label: 'Spread Frequency',
      data: [5, 10, 20, 30, 40, 30, 20, 10, 5],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Yield Curve Visualizer</h1>
      <div className="w-full max-w-7xl space-y-8">
        <ChartComponent chartData={placeholderChartData} />
        <SpreadHistogram data={histogramData} />
      </div>
    </main>
  );
}