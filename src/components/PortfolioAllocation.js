import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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

const AllocationList = styled.div`
  margin-top: 25px;
`;

const AllocationItem = styled.div`
  background: #0a0a0a;
  padding: 15px;
  margin-bottom: 12px;
  border-left: 4px solid ${props => props.color};
  border-radius: 4px;
`;

const AllocationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const AllocationName = styled.div`
  font-size: 1rem;
  color: #fff;
  font-weight: 700;
`;

const AllocationPercentage = styled.div`
  font-size: 1.2rem;
  color: ${props => props.color};
  font-weight: 700;
`;

const AllocationDetails = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-top: 8px;
`;

const Ticker = styled.span`
  background: #1a1a1a;
  color: #ff6b00;
  padding: 2px 8px;
  border-radius: 3px;
  font-weight: 700;
  margin-right: 5px;
  font-size: 0.8rem;
  border: 1px solid #333;
`;

const ExpectedReturn = styled.div`
  margin-top: 8px;
  font-size: 0.85rem;
  color: #00ff00;
`;

const PortfolioAllocation = () => {
  const portfolioData = [
    {
      name: 'AI/Tech/Semiconductors',
      allocation: 45,
      color: '#ff6b00',
      holdings: ['NVDA', 'TSM', 'MSFT', 'AMD', 'GOOGL', 'ASML', 'MU'],
      description: 'Foundation models, hyperscalers, foundries, memory',
      expectedReturn: '20-50% CAGR'
    },
    {
      name: 'Infrastructure/Energy',
      allocation: 30,
      color: '#00aaff',
      holdings: ['EQT', 'VRT', 'ETN', 'GE', 'FSLR', 'EQIX', 'DLR'],
      description: 'Natural gas, datacenters, power infrastructure',
      expectedReturn: '15-30% CAGR'
    },
    {
      name: 'Broad Market/Hedges',
      allocation: 15,
      color: '#00ff00',
      holdings: ['SPY', 'QQQ', 'ARKK'],
      description: 'Broad exposure to AI-amplified growth',
      expectedReturn: '10-20% CAGR'
    },
    {
      name: 'Defensive/Geopolitical',
      allocation: 10,
      color: '#ffaa00',
      holdings: ['GLD', 'BTC'],
      description: 'Hedge against misalignment, regulatory overreach, decoupling',
      expectedReturn: '5-15% CAGR'
    }
  ];

  const COLORS = ['#ff6b00', '#00aaff', '#00ff00', '#ffaa00'];

  return (
    <Card>
      <CardTitle>Portfolio Allocation: Thesis-Aligned Strategy</CardTitle>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={portfolioData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, allocation }) => `${name}: ${allocation}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="allocation"
          >
            {portfolioData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px' }}
            labelStyle={{ color: '#ff6b00' }}
          />
        </PieChart>
      </ResponsiveContainer>

      <AllocationList>
        {portfolioData.map((item, index) => (
          <AllocationItem key={index} color={item.color}>
            <AllocationHeader>
              <AllocationName>{item.name}</AllocationName>
              <AllocationPercentage color={item.color}>{item.allocation}%</AllocationPercentage>
            </AllocationHeader>
            <AllocationDetails>
              {item.description}
            </AllocationDetails>
            <AllocationDetails style={{ marginTop: '8px' }}>
              {item.holdings.map((ticker, idx) => (
                <Ticker key={idx}>{ticker}</Ticker>
              ))}
            </AllocationDetails>
            <ExpectedReturn>Expected: {item.expectedReturn}</ExpectedReturn>
          </AllocationItem>
        ))}
      </AllocationList>
    </Card>
  );
};

export default PortfolioAllocation;
