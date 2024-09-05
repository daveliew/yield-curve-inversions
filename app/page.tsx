'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import YieldCurveChart from './components/YieldCurveChart';
import SpreadHistogram from './components/SpreadHistogram';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/yieldData');
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Yield Curve Visualization</h1>
      {data ? (
        <>
          <YieldCurveChart data={data.lineChartData} />
          <SpreadHistogram data={data.histogramData} />
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </main>
  );
}
