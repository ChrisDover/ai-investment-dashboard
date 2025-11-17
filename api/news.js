const fetch = require('node-fetch');

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'ZAN2YWHAD299PEE8';

// Simple in-memory cache (30 minute TTL for news)
const cache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

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
    const { tickers, topics, limit = 50 } = req.query;

    // Build cache key
    const cacheKey = `news_${tickers || 'all'}_${topics || 'all'}_${limit}`;

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
      return res.status(200).json(cached.data);
    }

    // Build API URL
    let url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${ALPHA_VANTAGE_KEY}&limit=${limit}`;

    if (tickers) {
      url += `&tickers=${tickers}`;
    }

    if (topics) {
      url += `&topics=${topics}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!data.feed || data.feed.length === 0) {
      console.error('No news data received from Alpha Vantage');
      return res.status(200).json([]);
    }

    // Transform news data to our format
    const newsItems = data.feed.map((article, index) => {
      // Parse time published (format: YYYYMMDDTHHMMSS)
      const timeString = article.time_published;
      const year = timeString.substring(0, 4);
      const month = timeString.substring(4, 6);
      const day = timeString.substring(6, 8);
      const hour = timeString.substring(9, 11);
      const minute = timeString.substring(11, 13);
      const second = timeString.substring(13, 15);

      const publishedDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);

      // Determine impact based on sentiment score
      const sentimentScore = parseFloat(article.overall_sentiment_score);
      let impact = 'low';
      if (Math.abs(sentimentScore) > 0.25) impact = 'high';
      else if (Math.abs(sentimentScore) > 0.15) impact = 'medium';

      // Extract ticker symbols
      const tickerSymbols = article.ticker_sentiment ?
        article.ticker_sentiment.map(t => t.ticker) : [];

      // Determine category based on topics
      const topics = article.topics || [];
      let category = 'news';
      if (topics.some(t => t.topic === 'Earnings')) category = 'earnings';
      if (topics.some(t => t.topic === 'Technology')) category = 'research';

      return {
        id: index + 1,
        source: article.source,
        title: article.title,
        summary: article.summary,
        url: article.url,
        timestamp: publishedDate.toISOString(),
        category: category,
        impact: impact,
        sentiment: sentimentScore,
        tags: topics.slice(0, 4).map(t => t.topic),
        tickers: tickerSymbols
      };
    });

    // Cache the result
    cache.set(cacheKey, { data: newsItems, timestamp: Date.now() });

    res.status(200).json(newsItems);
  } catch (error) {
    console.error('Error in /api/news:', error);
    res.status(500).json({ error: 'Failed to fetch news', details: error.message });
  }
}
