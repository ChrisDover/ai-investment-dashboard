const fetch = require('node-fetch');

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'ZAN2YWHAD299PEE8';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { symbol, startDate } = req.query;

    if (!symbol) {
      return res.status(400).json({ error: 'symbol parameter is required' });
    }

    // Use TIME_SERIES_DAILY_ADJUSTED for full historical data
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${ALPHA_VANTAGE_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data['Time Series (Daily)']) {
      console.error(`No historical data for ${symbol}`);
      return res.status(404).json({ error: 'No data found for symbol' });
    }

    const timeSeries = data['Time Series (Daily)'];
    const startDateObj = startDate ? new Date(startDate) : new Date('2023-01-01');

    // Convert to array and filter by start date
    const formattedResult = Object.entries(timeSeries)
      .map(([dateStr, values]) => {
        const date = new Date(dateStr);

        if (date >= startDateObj) {
          return {
            date: date.toISOString(),
            close: parseFloat(values['5. adjusted close']),
            open: parseFloat(values['1. open']),
            high: parseFloat(values['2. high']),
            low: parseFloat(values['3. low']),
            volume: parseInt(values['6. volume'])
          };
        }
        return null;
      })
      .filter(item => item !== null)
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort chronologically

    res.status(200).json(formattedResult);
  } catch (error) {
    console.error(`Error in /api/historical for ${req.query.symbol}:`, error);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
}
