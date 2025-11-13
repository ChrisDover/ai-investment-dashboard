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
    const { symbols } = req.query;

    if (!symbols) {
      return res.status(400).json({ error: 'symbols parameter is required' });
    }

    const symbolArray = symbols.split(',');
    const quotes = await Promise.all(
      symbolArray.map(async (symbol) => {
        try {
          const trimmedSymbol = symbol.trim();
          const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${trimmedSymbol}&apikey=${ALPHA_VANTAGE_KEY}`;

          const response = await fetch(url);
          const data = await response.json();

          if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
            console.error(`No data for ${trimmedSymbol}`);
            return null;
          }

          const quote = data['Global Quote'];

          return {
            symbol: trimmedSymbol,
            price: parseFloat(quote['05. price']),
            change: parseFloat(quote['10. change percent'].replace('%', '')),
            volume: parseInt(quote['06. volume']),
            previousClose: parseFloat(quote['08. previous close'])
          };
        } catch (error) {
          console.error(`Error fetching quote for ${symbol}:`, error);
          return null;
        }
      })
    );

    const validQuotes = quotes.filter(q => q !== null);
    res.status(200).json(validQuotes);
  } catch (error) {
    console.error('Error in /api/quotes:', error);
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
}
