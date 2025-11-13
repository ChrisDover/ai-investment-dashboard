// Portfolio allocation based on thesis
export const PORTFOLIO_ALLOCATION = {
  'NVDA': 0.25,   // 25%
  'TSM': 0.08,    // 8%
  'MSFT': 0.10,   // 10%
  'GOOGL': 0.07,  // 7%
  'AMD': 0.05,    // 5%
  'ASML': 0.05,   // 5%
  'MU': 0.05,     // 5%
  'VRT': 0.06,    // 6%
  'ETN': 0.04,    // 4%
  'EQT': 0.05,    // 5%
  'SPY': 0.10,    // 10%
  'GLD': 0.05,    // 5%
  'BTC-USD': 0.05 // 5%
};

// Start date for tracking (ChatGPT release was Nov 2022, but let's use Jan 1, 2023 for clean data)
export const START_DATE = '2023-01-01';

// Determine API base URL based on environment
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://ai.trade.pollinatetrading.com'
  : 'http://localhost:3000';

/**
 * Get current quote for a symbol
 */
export const getQuote = async (symbol) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/quotes?symbols=${symbol}`);
    if (!response.ok) throw new Error('Failed to fetch quote');
    const quotes = await response.json();
    return quotes[0] || null;
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    return null;
  }
};

/**
 * Get multiple quotes
 */
export const getMultipleQuotes = async (symbols) => {
  try {
    const symbolsParam = symbols.join(',');
    const response = await fetch(`${API_BASE_URL}/api/quotes?symbols=${symbolsParam}`);
    if (!response.ok) throw new Error('Failed to fetch quotes');
    const quotes = await response.json();
    return quotes || [];
  } catch (error) {
    console.error('Error fetching multiple quotes:', error);
    return [];
  }
};

/**
 * Get historical data for a symbol
 */
export const getHistoricalData = async (symbol, startDate, endDate = new Date()) => {
  try {
    const startParam = typeof startDate === 'string' ? startDate : startDate.toISOString().split('T')[0];
    const response = await fetch(`${API_BASE_URL}/api/historical?symbol=${symbol}&startDate=${startParam}`);
    if (!response.ok) throw new Error('Failed to fetch historical data');
    const result = await response.json();
    // Convert date strings back to Date objects
    return result.map(item => ({
      ...item,
      date: new Date(item.date)
    }));
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error);
    return [];
  }
};

/**
 * Calculate portfolio performance over time
 */
export const calculatePortfolioPerformance = async (startDate = START_DATE) => {
  const symbols = Object.keys(PORTFOLIO_ALLOCATION);
  const endDate = new Date();

  try {
    // Fetch historical data for all symbols
    const historicalDataPromises = symbols.map(symbol =>
      getHistoricalData(symbol, startDate, endDate)
    );

    const allHistoricalData = await Promise.all(historicalDataPromises);

    // Create a map of symbol to historical data
    const dataMap = {};
    symbols.forEach((symbol, index) => {
      dataMap[symbol] = allHistoricalData[index];
    });

    // Get all unique dates
    const allDates = new Set();
    Object.values(dataMap).forEach(data => {
      data.forEach(point => {
        allDates.add(point.date.toISOString().split('T')[0]);
      });
    });

    const sortedDates = Array.from(allDates).sort();

    // Calculate portfolio value for each date
    const portfolioTimeSeries = [];
    let initialValue = 100000; // Start with $100k

    sortedDates.forEach((date, index) => {
      let portfolioValue = 0;

      // For each holding, get price on this date
      symbols.forEach(symbol => {
        const symbolData = dataMap[symbol];
        const allocation = PORTFOLIO_ALLOCATION[symbol];

        // Find closest price data
        const dataPoint = symbolData.find(d =>
          d.date.toISOString().split('T')[0] === date
        );

        if (dataPoint && symbolData[0]) {
          const initialPrice = symbolData[0].close;
          const currentPrice = dataPoint.close;
          const priceReturn = currentPrice / initialPrice;
          portfolioValue += initialValue * allocation * priceReturn;
        }
      });

      if (portfolioValue > 0) {
        const portfolioReturn = ((portfolioValue - initialValue) / initialValue) * 100;

        portfolioTimeSeries.push({
          date: new Date(date),
          value: portfolioValue,
          return: portfolioReturn
        });
      }
    });

    return portfolioTimeSeries;
  } catch (error) {
    console.error('Error calculating portfolio performance:', error);
    return [];
  }
};

/**
 * Calculate Sharpe Ratio
 */
export const calculateSharpeRatio = (returns, riskFreeRate = 0.045) => {
  // returns should be an array of daily returns
  if (returns.length === 0) return 0;

  const meanReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - meanReturn, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);

  if (stdDev === 0) return 0;

  // Annualize (assuming daily returns)
  const annualizedReturn = meanReturn * 252;
  const annualizedStdDev = stdDev * Math.sqrt(252);

  return (annualizedReturn - riskFreeRate) / annualizedStdDev;
};

/**
 * Calculate Maximum Drawdown
 */
export const calculateMaxDrawdown = (portfolioTimeSeries) => {
  if (portfolioTimeSeries.length === 0) return 0;

  let maxDrawdown = 0;
  let peak = portfolioTimeSeries[0].value;

  portfolioTimeSeries.forEach(point => {
    if (point.value > peak) {
      peak = point.value;
    }

    const drawdown = ((point.value - peak) / peak) * 100;
    if (drawdown < maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });

  return maxDrawdown;
};

/**
 * Calculate attribution by holding
 */
export const calculateAttribution = async (startDate = START_DATE) => {
  const symbols = Object.keys(PORTFOLIO_ALLOCATION);

  try {
    const attributionData = await Promise.all(
      symbols.map(async (symbol) => {
        const historical = await getHistoricalData(symbol, startDate);

        if (historical.length === 0) {
          return {
            holding: symbol,
            allocation: `${(PORTFOLIO_ALLOCATION[symbol] * 100).toFixed(0)}%`,
            ytdReturn: 'N/A',
            contribution: 'N/A',
            status: 'inline'
          };
        }

        const startPrice = historical[0].close;
        const endPrice = historical[historical.length - 1].close;
        const holdingReturn = ((endPrice - startPrice) / startPrice) * 100;
        const contribution = holdingReturn * PORTFOLIO_ALLOCATION[symbol];

        return {
          holding: symbol,
          allocation: `${(PORTFOLIO_ALLOCATION[symbol] * 100).toFixed(0)}%`,
          ytdReturn: `${holdingReturn >= 0 ? '+' : ''}${holdingReturn.toFixed(1)}%`,
          contribution: `${contribution >= 0 ? '+' : ''}${contribution.toFixed(1)}%`,
          status: holdingReturn >= 30 ? 'outperform' :
                  holdingReturn >= 20 ? 'inline' : 'underperform'
        };
      })
    );

    return attributionData;
  } catch (error) {
    console.error('Error calculating attribution:', error);
    return [];
  }
};

/**
 * Get SPY performance for comparison
 */
export const getSPYPerformance = async (startDate = START_DATE) => {
  try {
    const historical = await getHistoricalData('SPY', startDate);

    if (historical.length === 0) return 0;

    const startPrice = historical[0].close;
    const endPrice = historical[historical.length - 1].close;

    return ((endPrice - startPrice) / startPrice) * 100;
  } catch (error) {
    console.error('Error fetching SPY performance:', error);
    return 0;
  }
};

/**
 * Get all real-time market data for dashboard
 */
export const getAllMarketData = async () => {
  const symbols = Object.keys(PORTFOLIO_ALLOCATION);
  const quotes = await getMultipleQuotes(symbols);

  const semiconductors = quotes.filter(q =>
    ['NVDA', 'TSM', 'AMD', 'ASML', 'MU'].includes(q.symbol)
  );

  const hyperscalers = quotes.filter(q =>
    ['MSFT', 'GOOGL'].includes(q.symbol)
  );

  const infrastructure = quotes.filter(q =>
    ['VRT', 'ETN', 'EQT'].includes(q.symbol)
  );

  const defensive = quotes.filter(q =>
    ['SPY', 'GLD', 'BTC-USD'].includes(q.symbol)
  );

  return {
    semiconductors,
    hyperscalers,
    infrastructure,
    defensive
  };
};
