import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

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

const PerformanceSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const SummaryCard = styled.div`
  background: #0a0a0a;
  padding: 20px;
  border-radius: 6px;
  border-left: 4px solid ${props => props.color || '#ff6b00'};
`;

const SummaryLabel = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const SummaryValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.color || '#fff'};
  margin-bottom: 5px;
`;

const SummarySubtext = styled.div`
  font-size: 0.75rem;
  color: #666;
`;

const AttributionSection = styled.div`
  margin-top: 30px;
`;

const SectionTitle = styled.h3`
  color: #ff6b00;
  font-size: 1.2rem;
  margin: 0 0 20px 0;
`;

const AttributionTable = styled.div`
  background: #0a0a0a;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: 15px 20px;
  border-bottom: 1px solid #333;
  transition: background 0.2s;

  &:hover {
    background: #1a1a1a;
  }

  &:first-child {
    background: #1a1a1a;
    font-weight: 700;
    color: #ff6b00;
    text-transform: uppercase;
    font-size: 0.85rem;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.div`
  color: ${props => props.color || '#ddd'};
  font-size: 0.95rem;
`;

const PortfolioPerformance = () => {
  // Historical performance data (since inception - Jan 2024)
  const performanceData = [
    { month: 'Jan 24', actual: 0, expected: 0, spy: 0 },
    { month: 'Feb 24', actual: 5.2, expected: 2.5, spy: 3.1 },
    { month: 'Mar 24', actual: 8.7, expected: 5.0, spy: 5.8 },
    { month: 'Apr 24', actual: 6.3, expected: 7.5, spy: 4.2 },
    { month: 'May 24', actual: 11.2, expected: 10.0, spy: 7.5 },
    { month: 'Jun 24', actual: 15.8, expected: 12.5, spy: 10.2 },
    { month: 'Jul 24', actual: 18.9, expected: 15.0, spy: 12.8 },
    { month: 'Aug 24', actual: 16.2, expected: 17.5, spy: 11.5 },
    { month: 'Sep 24', actual: 21.5, expected: 20.0, spy: 14.3 },
    { month: 'Oct 24', actual: 24.8, expected: 22.5, spy: 16.1 },
    { month: 'Nov 24', actual: 28.3, expected: 25.0, spy: 18.5 },
    { month: 'Dec 24', actual: 32.1, expected: 30.0, spy: 21.2 }
  ];

  // Attribution by position
  const attributionData = [
    { holding: 'NVDA', allocation: '25%', ytdReturn: '+48.5%', contribution: '+12.1%', status: 'outperform' },
    { holding: 'TSM', allocation: '8%', ytdReturn: '+42.3%', contribution: '+3.4%', status: 'outperform' },
    { holding: 'MSFT', allocation: '10%', ytdReturn: '+38.7%', contribution: '+3.9%', status: 'outperform' },
    { holding: 'GOOGL', allocation: '7%', ytdReturn: '+35.2%', contribution: '+2.5%', status: 'outperform' },
    { holding: 'AMD', allocation: '5%', ytdReturn: '+28.9%', contribution: '+1.4%', status: 'inline' },
    { holding: 'ASML', allocation: '5%', ytdReturn: '+31.2%', contribution: '+1.6%', status: 'inline' },
    { holding: 'VRT', allocation: '6%', ytdReturn: '+52.1%', contribution: '+3.1%', status: 'outperform' },
    { holding: 'ETN', allocation: '4%', ytdReturn: '+44.8%', contribution: '+1.8%', status: 'outperform' },
    { holding: 'EQT', allocation: '5%', ytdReturn: '+12.3%', contribution: '+0.6%', status: 'underperform' },
    { holding: 'SPY', allocation: '10%', ytdReturn: '+21.2%', contribution: '+2.1%', status: 'inline' },
    { holding: 'Cash/Other', allocation: '15%', ytdReturn: '+5.2%', contribution: '+0.8%', status: 'inline' }
  ];

  // Risk metrics
  const riskMetrics = [
    { month: 'Jan', drawdown: 0 },
    { month: 'Feb', drawdown: -2.1 },
    { month: 'Mar', drawdown: 0 },
    { month: 'Apr', drawdown: -3.8 },
    { month: 'May', drawdown: 0 },
    { month: 'Jun', drawdown: 0 },
    { month: 'Jul', drawdown: 0 },
    { month: 'Aug', drawdown: -5.2 },
    { month: 'Sep', drawdown: 0 },
    { month: 'Oct', drawdown: 0 },
    { month: 'Nov', drawdown: 0 },
    { month: 'Dec', drawdown: 0 }
  ];

  const currentReturn = 32.1; // YTD
  const expectedReturn = 30.0;
  const spyReturn = 21.2;
  const sharpeRatio = 1.85;
  const maxDrawdown = -5.2;
  const alpha = currentReturn - spyReturn;

  return (
    <Card>
      <CardTitle>💼 Portfolio Performance: Thesis vs. Reality</CardTitle>

      <PerformanceSummary>
        <SummaryCard color="#00ff00">
          <SummaryLabel>YTD Return</SummaryLabel>
          <SummaryValue color="#00ff00">+{currentReturn.toFixed(1)}%</SummaryValue>
          <SummarySubtext>vs Expected: +{expectedReturn.toFixed(1)}%</SummarySubtext>
        </SummaryCard>

        <SummaryCard color="#ff6b00">
          <SummaryLabel>Outperformance vs SPY</SummaryLabel>
          <SummaryValue color="#ff6b00">+{alpha.toFixed(1)}%</SummaryValue>
          <SummarySubtext>SPY: +{spyReturn.toFixed(1)}%</SummarySubtext>
        </SummaryCard>

        <SummaryCard color="#00aaff">
          <SummaryLabel>Sharpe Ratio</SummaryLabel>
          <SummaryValue color="#00aaff">{sharpeRatio.toFixed(2)}</SummaryValue>
          <SummarySubtext>Risk-adjusted returns</SummarySubtext>
        </SummaryCard>

        <SummaryCard color="#ffaa00">
          <SummaryLabel>Max Drawdown</SummaryLabel>
          <SummaryValue color="#ffaa00">{maxDrawdown.toFixed(1)}%</SummaryValue>
          <SummarySubtext>Peak-to-trough decline</SummarySubtext>
        </SummaryCard>
      </PerformanceSummary>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" stroke="#888" tick={{ fill: '#888' }} />
          <YAxis stroke="#888" tick={{ fill: '#888' }} label={{ value: 'Return (%)', angle: -90, position: 'insideLeft', fill: '#888' }} />
          <Tooltip
            contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px' }}
            labelStyle={{ color: '#ff6b00' }}
          />
          <Legend wrapperStyle={{ color: '#888' }} />
          <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="expected"
            stroke="#ff6b00"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Expected (30% CAGR)"
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#00ff00"
            strokeWidth={3}
            dot={{ fill: '#00ff00', r: 4 }}
            name="Actual Performance"
          />
          <Line
            type="monotone"
            dataKey="spy"
            stroke="#00aaff"
            strokeWidth={2}
            dot={false}
            name="SPY Benchmark"
          />
        </LineChart>
      </ResponsiveContainer>

      <AttributionSection>
        <SectionTitle>Performance Attribution by Holding</SectionTitle>
        <AttributionTable>
          <TableRow>
            <TableCell>Holding</TableCell>
            <TableCell>Allocation</TableCell>
            <TableCell>YTD Return</TableCell>
            <TableCell>Contribution</TableCell>
            <TableCell>vs Thesis</TableCell>
          </TableRow>
          {attributionData.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell color="#fff">{item.holding}</TableCell>
              <TableCell>{item.allocation}</TableCell>
              <TableCell color={parseFloat(item.ytdReturn) >= 30 ? '#00ff00' : parseFloat(item.ytdReturn) >= 20 ? '#ffaa00' : '#888'}>
                {item.ytdReturn}
              </TableCell>
              <TableCell color="#ff6b00">{item.contribution}</TableCell>
              <TableCell color={
                item.status === 'outperform' ? '#00ff00' :
                item.status === 'underperform' ? '#ff0000' : '#888'
              }>
                {item.status === 'outperform' ? '↑ Outperform' :
                 item.status === 'underperform' ? '↓ Underperform' : '→ In-line'}
              </TableCell>
            </TableRow>
          ))}
        </AttributionTable>
      </AttributionSection>

      <AttributionSection>
        <SectionTitle>Drawdown Analysis</SectionTitle>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={riskMetrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#888" tick={{ fill: '#888' }} />
            <YAxis stroke="#888" tick={{ fill: '#888' }} label={{ value: 'Drawdown (%)', angle: -90, position: 'insideLeft', fill: '#888' }} />
            <Tooltip
              contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px' }}
              labelStyle={{ color: '#ff6b00' }}
            />
            <Bar dataKey="drawdown" fill="#ff0000" name="Monthly Drawdown" />
            <ReferenceLine y={0} stroke="#888" />
            <ReferenceLine y={-10} stroke="#ff0000" strokeDasharray="3 3" label={{ value: '-10% Alert Level', fill: '#ff0000', position: 'right' }} />
          </BarChart>
        </ResponsiveContainer>
      </AttributionSection>
    </Card>
  );
};

export default PortfolioPerformance;
