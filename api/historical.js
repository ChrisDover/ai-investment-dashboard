const yahooFinance = require('yahoo-finance2');

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

    const start = startDate ? new Date(startDate) : new Date('2023-01-01');
    const end = new Date();

    const result = await yahooFinance.historical(symbol, {
      period1: start,
      period2: end,
      interval: '1d'
    });

    const formattedResult = result.map(item => ({
      date: item.date.toISOString(),
      close: item.close,
      open: item.open,
      high: item.high,
      low: item.low,
      volume: item.volume
    }));

    res.status(200).json(formattedResult);
  } catch (error) {
    console.error(`Error in /api/historical for ${req.query.symbol}:`, error);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
}
