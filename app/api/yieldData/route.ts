import axios from 'axios';
import { NextResponse } from 'next/server';

const FRED_API_KEY = process.env.FRED_API_KEY;
const BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';

export async function GET() {
  try {
    const [twoYearData, tenYearData] = await Promise.all([
      axios.get(`${BASE_URL}?series_id=DGS2&api_key=${FRED_API_KEY}&file_type=json`),
      axios.get(`${BASE_URL}?series_id=DGS10&api_key=${FRED_API_KEY}&file_type=json`)
    ]);

    const processedData = processData(twoYearData.data.observations, tenYearData.data.observations);
    return NextResponse.json(processedData);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data from FRED API' }, { status: 500 });
  }
}

function processData(twoYearData: any[], tenYearData: any[]) {
  // Implement data processing logic here
  // This should combine the two datasets and calculate the spread
  // Return an object with data for the line chart and histogram
}
