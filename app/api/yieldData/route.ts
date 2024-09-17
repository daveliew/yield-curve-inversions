import { NextRequest, NextResponse } from 'next/server';

const FRED_API_KEY = process.env.FRED_API_KEY;
const BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';

const SERIES_IDS = {
  '1': 'DGS1',
  '2': 'DGS2',
  '5': 'DGS5',
  '10': 'DGS10',
  '30': 'DGS30'
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const duration1 = searchParams.get('duration1') || '5';
  const duration2 = searchParams.get('duration2') || '10';

  try {
    console.log('Fetching data...');
    
    const url1 = `${BASE_URL}?series_id=${SERIES_IDS[duration1]}&api_key=${FRED_API_KEY}&file_type=json&observation_start=1990-01-01&frequency=m`;
    const url2 = `${BASE_URL}?series_id=${SERIES_IDS[duration2]}&api_key=${FRED_API_KEY}&file_type=json&observation_start=1990-01-01&frequency=m`;
    
    const [response1, response2] = await Promise.all([
      fetch(url1),
      fetch(url2)
    ]);

    const data1 = await response1.json();
    const data2 = await response2.json();

    console.log('Data fetched successfully');

    if (!data1.observations || !data2.observations) {
      throw new Error('Invalid data structure received from FRED API');
    }

    const processedData = processData(data1.observations, data2.observations, duration1, duration2);
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching or processing data' }, { status: 500 });
  }
}

// Define an interface for the observation data
interface Observation {
  date: string;
  value: string;
}

function processData(data1: Observation[], data2: Observation[], duration1: string, duration2: string) {
  const labels = data1.map(item => item.date);
  const values1 = data1.map(item => parseFloat(item.value));
  const values2 = data2.map(item => parseFloat(item.value));

  return {
    labels,
    datasets: [
      {
        label: `${duration1} Year Treasury Rate`,
        data: values1,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: `${duration2} Year Treasury Rate`,
        data: values2,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };
}
