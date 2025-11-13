const yahooFinance = require('yahoo-finance2').default;

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
          const quote = await yahooFinance.quote(symbol.trim());
          return {
            symbol: quote.symbol,
            price: quote.regularMarketPrice,
            change: quote.regularMarketChangePercent,
            volume: quote.regularMarketVolume,
            marketCap: quote.marketCap,
            previousClose: quote.regularMarketPreviousClose
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
