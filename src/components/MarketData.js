import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllMarketData } from '../services/marketDataService';

const Card = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  color: #ff6b00;
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const StockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
`;

const StockCard = styled.div`
  background: #0a0a0a;
  padding: 15px;
  border-radius: 6px;
  border-left: 3px solid ${props => props.change >= 0 ? '#00ff00' : '#ff0000'};
  transition: all 0.3s;

  &:hover {
    background: #1a1a1a;
    transform: translateY(-2px);
  }
`;

const StockTicker = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #ff6b00;
  margin-bottom: 8px;
`;

const StockName = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 12px;
`;

const StockPrice = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 5px;
`;

const StockChange = styled.div`
  font-size: 0.85rem;
  color: ${props => props.change >= 0 ? '#00ff00' : '#ff0000'};
  font-weight: 700;
`;

const CategoryHeader = styled.h3`
  color: #888;
  font-size: 1rem;
  margin: 25px 0 15px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  grid-column: 1 / -1;

  &:first-child {
    margin-top: 0;
  }
`;

const MarketData = () => {
  const [loading, setLoading] = useState(true);
  const [marketData, setMarketData] = useState({
    semiconductors: [],
    hyperscalers: [],
    infrastructure: [],
    defensive: []
  });

  const stockNames = {
    'NVDA': 'Nvidia',
    'TSM': 'TSMC',
    'AMD': 'AMD',
    'ASML': 'ASML',
    'MU': 'Micron',
    'MSFT': 'Microsoft',
    'GOOGL': 'Google',
    'VRT': 'Vertiv',
    'ETN': 'Eaton',
    'EQT': 'EQT Corp',
    'SPY': 'S&P 500',
    'GLD': 'Gold',
    'BTC-USD': 'Bitcoin'
  };

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const data = await getAllMarketData();

        // Format the data with friendly names
        const formatQuotes = (quotes) => quotes.map(q => ({
          ticker: q.symbol,
          name: stockNames[q.symbol] || q.symbol,
          price: q.price || 0,
          change: q.change || 0
        }));

        setMarketData({
          semiconductors: formatQuotes(data.semiconductors),
          hyperscalers: formatQuotes(data.hyperscalers),
          infrastructure: formatQuotes(data.infrastructure),
          defensive: formatQuotes(data.defensive)
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setLoading(false);
      }
    };

    fetchMarketData();

    // Update every 5 minutes
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardTitle>Market Data: Key Holdings</CardTitle>
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          Loading real-time market data...
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle>Market Data: Key Holdings</CardTitle>

      <StockGrid>
        {marketData.semiconductors.length > 0 && (
          <>
            <CategoryHeader>Semiconductors & Foundries</CategoryHeader>
            {marketData.semiconductors.map(stock => (
              <StockCard key={stock.ticker} change={stock.change}>
                <StockTicker>{stock.ticker}</StockTicker>
                <StockName>{stock.name}</StockName>
                <StockPrice>${stock.price.toFixed(2)}</StockPrice>
                <StockChange change={stock.change}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </StockChange>
              </StockCard>
            ))}
          </>
        )}

        {marketData.hyperscalers.length > 0 && (
          <>
            <CategoryHeader>Hyperscalers & AI Labs</CategoryHeader>
            {marketData.hyperscalers.map(stock => (
              <StockCard key={stock.ticker} change={stock.change}>
                <StockTicker>{stock.ticker}</StockTicker>
                <StockName>{stock.name}</StockName>
                <StockPrice>${stock.price.toFixed(2)}</StockPrice>
                <StockChange change={stock.change}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </StockChange>
              </StockCard>
            ))}
          </>
        )}

        {marketData.infrastructure.length > 0 && (
          <>
            <CategoryHeader>Infrastructure & Energy</CategoryHeader>
            {marketData.infrastructure.map(stock => (
              <StockCard key={stock.ticker} change={stock.change}>
                <StockTicker>{stock.ticker}</StockTicker>
                <StockName>{stock.name}</StockName>
                <StockPrice>${stock.price.toFixed(2)}</StockPrice>
                <StockChange change={stock.change}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </StockChange>
              </StockCard>
            ))}
          </>
        )}

        {marketData.defensive.length > 0 && (
          <>
            <CategoryHeader>Defensive & Alternative Assets</CategoryHeader>
            {marketData.defensive.map(stock => (
              <StockCard key={stock.ticker} change={stock.change}>
                <StockTicker>{stock.ticker}</StockTicker>
                <StockName>{stock.name}</StockName>
                <StockPrice>${stock.price.toFixed(2)}</StockPrice>
                <StockChange change={stock.change}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </StockChange>
              </StockCard>
            ))}
          </>
        )}
      </StockGrid>
    </Card>
  );
};

export default MarketData;
