import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  const [marketData, setMarketData] = useState({
    semiconductors: [
      { ticker: 'NVDA', name: 'Nvidia', price: 0, change: 0 },
      { ticker: 'TSM', name: 'TSMC', price: 0, change: 0 },
      { ticker: 'AMD', name: 'AMD', price: 0, change: 0 },
      { ticker: 'ASML', name: 'ASML', price: 0, change: 0 },
      { ticker: 'MU', name: 'Micron', price: 0, change: 0 },
    ],
    hyperscalers: [
      { ticker: 'MSFT', name: 'Microsoft', price: 0, change: 0 },
      { ticker: 'GOOGL', name: 'Google', price: 0, change: 0 },
      { ticker: 'AMZN', name: 'Amazon', price: 0, change: 0 },
      { ticker: 'META', name: 'Meta', price: 0, change: 0 },
    ],
    infrastructure: [
      { ticker: 'EQT', name: 'EQT Corp', price: 0, change: 0 },
      { ticker: 'VRT', name: 'Vertiv', price: 0, change: 0 },
      { ticker: 'ETN', name: 'Eaton', price: 0, change: 0 },
      { ticker: 'GE', name: 'GE Vernova', price: 0, change: 0 },
      { ticker: 'EQIX', name: 'Equinix', price: 0, change: 0 },
    ]
  });

  // Simulate market data (in production, this would fetch from Yahoo Finance API)
  useEffect(() => {
    const simulateMarketData = () => {
      // Mock data - replace with real API calls in production
      const mockPrices = {
        'NVDA': { price: 142.50, change: 2.3 },
        'TSM': { price: 187.25, change: 1.8 },
        'AMD': { price: 163.40, change: -0.5 },
        'ASML': { price: 897.60, change: 1.2 },
        'MU': { price: 98.30, change: 3.1 },
        'MSFT': { price: 425.80, change: 0.9 },
        'GOOGL': { price: 168.20, change: 1.5 },
        'AMZN': { price: 195.75, change: 2.1 },
        'META': { price: 582.30, change: 1.7 },
        'EQT': { price: 38.90, change: -1.2 },
        'VRT': { price: 105.40, change: 2.8 },
        'ETN': { price: 315.20, change: 1.1 },
        'GE': { price: 172.50, change: 0.7 },
        'EQIX': { price: 845.30, change: -0.3 },
      };

      setMarketData(prev => ({
        semiconductors: prev.semiconductors.map(stock => ({
          ...stock,
          price: mockPrices[stock.ticker]?.price || 0,
          change: mockPrices[stock.ticker]?.change || 0
        })),
        hyperscalers: prev.hyperscalers.map(stock => ({
          ...stock,
          price: mockPrices[stock.ticker]?.price || 0,
          change: mockPrices[stock.ticker]?.change || 0
        })),
        infrastructure: prev.infrastructure.map(stock => ({
          ...stock,
          price: mockPrices[stock.ticker]?.price || 0,
          change: mockPrices[stock.ticker]?.change || 0
        }))
      }));
    };

    simulateMarketData();

    // Update every 5 minutes
    const interval = setInterval(simulateMarketData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardTitle>Market Data: Key Holdings</CardTitle>

      <StockGrid>
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
      </StockGrid>
    </Card>
  );
};

export default MarketData;
