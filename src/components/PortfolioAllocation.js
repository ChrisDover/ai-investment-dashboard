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
      name: 'Foundries & Semiconductors',
      allocation: 40,
      color: '#ff6b00',
      holdings: ['TSM', 'ASML', 'MU', 'AMD', 'INTC'],
      description: 'TSMC leadership, EUV equipment, HBM memory, fab enablers',
      expectedReturn: '20-30% CAGR (supercycle)'
    },
    {
      name: 'AI Hardware & Accelerators',
      allocation: 30,
      color: '#00aaff',
      holdings: ['NVDA', 'AVGO', 'ARM', 'AMZN'],
      description: 'Nvidia dominance, networking silicon, Arm ecosystem, hyperscaler vertical integration',
      expectedReturn: '25-40% CAGR (explosive growth)'
    },
    {
      name: 'Infrastructure & Energy',
      allocation: 20,
      color: '#00ff00',
      holdings: ['VRT', 'ETN', 'EQT', 'EQIX', 'DLR'],
      description: 'Datacenter power (transformers, switchgear), natural gas, REITs',
      expectedReturn: '15-25% CAGR'
    },
    {
      name: 'Geopolitical Hedges',
      allocation: 10,
      color: '#ffaa00',
      holdings: ['GLD', 'BTC', 'SMH'],
      description: 'Hedge against US-China decoupling, export controls, semiconductor ETF diversification',
      expectedReturn: '5-15% CAGR'
    }
  ];

  const COLORS = ['#ff6b00', '#00aaff', '#00ff00', '#ffaa00'];

  return (
    <Card>
      <CardTitle>Portfolio Allocation: Semiconductor Supercycle Strategy</CardTitle>

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
