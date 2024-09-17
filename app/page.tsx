'use client';

import YieldChart from './components/YieldChart';
import SpreadHistogram from './components/SpreadLine';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Yield Curve Visualizer</h1>
      <div className="w-full max-w-7xl space-y-8">
        <YieldChart />
        <SpreadHistogram duration1="2" duration2="10" />
      </div>
    </main>
  );
}