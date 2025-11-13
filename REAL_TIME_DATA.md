# Real-Time Data Integration Guide

## Current State

**⚠️ IMPORTANT:** The dashboard currently uses **simulated/mock data** for demonstration purposes. All market prices, news items, and alerts are static examples designed to show functionality.

### What's Simulated:
- Stock prices in MarketData component
- News items in NewsIntegration component
- Alert triggers in AlertsPanel component
- Company metrics in CompanyDeepDives component

### What Updates:
- Timestamps (shows current time)
- Date badges (shows current date)
- UI state (filters, expandable sections, etc.)

---

## Adding Real-Time Market Data

### Option 1: Yahoo Finance API (Free, Recommended for Start)

**Installation:**
```bash
npm install yahoofinance2
```

**Implementation:**
```javascript
// src/services/marketDataService.js
import yahooFinance from 'yahoofinance2';

export const getQuote = async (symbol) => {
  try {
    const quote = await yahooFinance.quote(symbol);
    return {
      symbol: quote.symbol,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChangePercent,
      volume: quote.regularMarketVolume,
      marketCap: quote.marketCap
    };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    return null;
  }
};

export const getMultipleQuotes = async (symbols) => {
  const promises = symbols.map(symbol => getQuote(symbol));
  return await Promise.all(promises);
};
```

**Update MarketData.js:**
```javascript
import { useEffect, useState } from 'react';
import { getMultipleQuotes } from '../services/marketDataService';

const MarketData = () => {
  const [marketData, setMarketData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const symbols = ['NVDA', 'TSM', 'AMD', 'MSFT', 'GOOGL', 'AMZN', 'META', 'VRT', 'ETN', 'EQT'];
      const quotes = await getMultipleQuotes(symbols);

      const grouped = {
        semiconductors: quotes.filter(q => ['NVDA', 'TSM', 'AMD', 'ASML', 'MU'].includes(q.symbol)),
        hyperscalers: quotes.filter(q => ['MSFT', 'GOOGL', 'AMZN', 'META'].includes(q.symbol)),
        infrastructure: quotes.filter(q => ['EQT', 'VRT', 'ETN', 'GE', 'EQIX'].includes(q.symbol))
      };

      setMarketData(grouped);
      setLoading(false);
    };

    fetchData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ... rest of component
};
```

### Option 2: Alpha Vantage API (Free Tier Available)

**Get API Key:** https://www.alphavantage.co/support/#api-key

**Installation:**
```bash
npm install axios
```

**Implementation:**
```javascript
// src/services/alphaVantageService.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export const getQuote = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: API_KEY
      }
    });

    const quote = response.data['Global Quote'];
    return {
      symbol: symbol,
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume'])
    };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    return null;
  }
};
```

**Environment Variables:**
Create `.env` file in project root:
```
REACT_APP_ALPHA_VANTAGE_KEY=your_api_key_here
```

---

## Adding Real-Time News Integration

### Option 1: NewsAPI (Free Tier: 100 requests/day)

**Get API Key:** https://newsapi.org/register

**Implementation:**
```javascript
// src/services/newsService.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export const getAINews = async () => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'AI OR "artificial intelligence" OR NVIDIA OR TSMC',
        sources: 'bloomberg,reuters,the-wall-street-journal',
        sortBy: 'publishedAt',
        pageSize: 20,
        apikey: API_KEY
      }
    });

    return response.data.articles.map(article => ({
      id: article.url,
      source: article.source.name,
      title: article.title,
      summary: article.description,
      timestamp: new Date(article.publishedAt).toLocaleString(),
      url: article.url,
      impact: determineImpact(article.title, article.description)
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

const determineImpact = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();
  if (text.includes('crisis') || text.includes('crash') || text.includes('collapse')) {
    return 'high';
  }
  if (text.includes('growth') || text.includes('surge') || text.includes('boom')) {
    return 'high';
  }
  return 'medium';
};
```

### Option 2: RSS Feeds (Free)

For SemiAnalysis, ArXiv, etc.:

```javascript
// src/services/rssService.js
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export const getSemiAnalysisNews = async () => {
  try {
    const response = await axios.get('https://api.rss2json.com/v1/api.json', {
      params: {
        rss_url: 'https://www.semianalysis.com/feed',
        api_key: process.env.REACT_APP_RSS2JSON_KEY,
        count: 10
      }
    });

    return response.data.items.map(item => ({
      id: item.link,
      source: 'SemiAnalysis',
      title: item.title,
      summary: item.description,
      timestamp: new Date(item.pubDate).toLocaleString(),
      category: 'research',
      impact: 'high'
    }));
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return [];
  }
};
```

---

## Adding Earnings Call Transcripts

### Option 1: Alpha Vantage Earnings API

```javascript
// src/services/earningsService.js
const getEarnings = async (symbol) => {
  const response = await axios.get(BASE_URL, {
    params: {
      function: 'EARNINGS',
      symbol: symbol,
      apikey: API_KEY
    }
  });

  return response.data.quarterlyEarnings;
};
```

### Option 2: Scrape from Investor Relations

For detailed transcripts, consider:
- **Seeking Alpha Earnings Call Transcripts** (requires subscription)
- **Company Investor Relations Pages** (free, but requires scraping)

---

## Adding Alert System Automation

### Create Alert Logic:

```javascript
// src/services/alertService.js
export const checkThesisValidation = (currentData, historicalData) => {
  const alerts = [];

  // Check CapEx divergence
  const capexDivergence = calculateDivergence(currentData.capex, historicalData.expectedCapex);
  if (Math.abs(capexDivergence) > 10) {
    alerts.push({
      severity: 'warning',
      title: 'CapEx Divergence Detected',
      message: `Hyperscaler CapEx ${capexDivergence > 0 ? 'above' : 'below'} expectations by ${Math.abs(capexDivergence)}%`,
      action: capexDivergence < -10 ? 'Consider reducing AI infrastructure exposure' : 'Bullish for datacenter buildout'
    });
  }

  // Check Nvidia margins
  if (currentData.nvdaGrossMargin < 60) {
    alerts.push({
      severity: 'critical',
      title: 'NVDA Gross Margin Below Threshold',
      message: `Nvidia gross margin at ${currentData.nvdaGrossMargin}%, below 60% stop level`,
      action: 'Reduce NVDA position from 25% to 15%'
    });
  }

  // Check scaling progress
  const benchmarkProgress = calculateBenchmarkProgress(currentData.benchmarks);
  if (benchmarkProgress < 10) {
    alerts.push({
      severity: 'critical',
      title: 'Scaling Laws Showing Signs of Stalling',
      message: `Benchmark progress only ${benchmarkProgress}% Y/Y, below expected 15%`,
      action: 'Review AI pure-play positions. Consider scenario testing.'
    });
  }

  return alerts;
};
```

---

## Update Frequency Recommendations

### High-Priority (Every 5-15 minutes):
- Stock prices (MarketData)
- Critical alerts (AlertsPanel)
- BLUF takeaways

### Medium-Priority (Every 1-4 hours):
- News feed (NewsIntegration)
- Company metrics (CompanyDeepDives)
- Trading signals

### Low-Priority (Daily):
- Daily Executive Summary (refresh at market open)
- Thesis validation metrics
- Scenario testing parameters

---

## Implementation Steps

### Phase 1: Market Data (Week 1)
1. Get Yahoo Finance API or Alpha Vantage key
2. Create `src/services/marketDataService.js`
3. Update MarketData.js to use real data
4. Test with 5-minute refresh interval

### Phase 2: News Integration (Week 2)
1. Get NewsAPI key
2. Create `src/services/newsService.js`
3. Update NewsIntegration.js to use real data
4. Add RSS feeds for SemiAnalysis, ArXiv
5. Test with 1-hour refresh interval

### Phase 3: Alert Automation (Week 3)
1. Create `src/services/alertService.js`
2. Implement divergence detection logic
3. Update AlertsPanel to show real alerts
4. Add notification system (email/SMS)

### Phase 4: Historical Tracking (Week 4)
1. Set up Firebase or PostgreSQL database
2. Store historical prices, metrics, alerts
3. Track portfolio performance over time
4. Generate trend analysis

---

## Cost Estimates

### Free Tier:
- Yahoo Finance: Free, unlimited
- Alpha Vantage: 5 calls/minute, 500/day (free)
- NewsAPI: 100 requests/day (free)
- RSS feeds: Free

### Paid Tier (Optional):
- Alpha Vantage Premium: $50/month (1,200 calls/min)
- NewsAPI: $449/month (unlimited)
- IEX Cloud: $9-$499/month (real-time data)

**Recommendation:** Start with free tier using Yahoo Finance + NewsAPI

---

## Backend API (Optional)

For production use, create a backend API to:
1. Cache API responses (reduce external API calls)
2. Store historical data
3. Run scheduled jobs (data fetches)
4. Send email/SMS alerts

**Example Stack:**
- Node.js + Express for API
- PostgreSQL for data storage
- Redis for caching
- Cron jobs for scheduled updates

---

## Current Status

✅ **Complete UI/UX** - All components built and styled
✅ **Complete Logic** - Alert detection, scenario testing, thesis validation
✅ **Ready for Integration** - Components structured to accept real data
⚠️ **Simulated Data** - Replace mock data with API calls

**Next Step:** Choose Option 1 (Yahoo Finance) for market data and implement Phase 1 above.

---

**Last Updated:** November 13, 2025
**Version:** 1.0.0
