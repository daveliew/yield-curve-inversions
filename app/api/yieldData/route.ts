import axios from 'axios';
import { NextResponse } from 'next/server';

const FRED_API_KEY = process.env.FRED_API_KEY;
const BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';

export async function GET() {
  try {
    console.log('Fetching data...');
    
    const twoYearUrl = `${BASE_URL}?series_id=DGS2&api_key=${FRED_API_KEY}&file_type=json&observation_start=1990-01-01&frequency=m`;
    const tenYearUrl = `${BASE_URL}?series_id=DGS10&api_key=${FRED_API_KEY}&file_type=json&observation_start=1990-01-01&frequency=m`;
    
    const [twoYearResponse, tenYearResponse] = await Promise.all([
      fetch(twoYearUrl),
      fetch(tenYearUrl)
    ]);

    const twoYearData = await twoYearResponse.json();
    const tenYearData = await tenYearResponse.json();

    console.log('Data fetched successfully');

    if (!twoYearData.observations || !tenYearData.observations) {
      throw new Error('Invalid data structure received from FRED API');
    }

    const processedData = processData(twoYearData.observations, tenYearData.observations);
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching or processing data' }, { status: 500 });
  }
}

function processData(twoYearData: any[], tenYearData: any[]) {
  const labels = twoYearData.map(item => item.date);
  const twoYearValues = twoYearData.map(item => parseFloat(item.value));
  const tenYearValues = tenYearData.map(item => parseFloat(item.value));

  return {
    labels,
    datasets: [
      {
        label: '2 Year Treasury Rate',
        data: twoYearValues,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: '10 Year Treasury Rate',
        data: tenYearValues,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };
}
