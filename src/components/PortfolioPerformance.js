import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import {
  calculatePortfolioPerformance,
  calculateSharpeRatio,
  calculateMaxDrawdown,
  calculateAttribution,
  getSPYPerformance,
  START_DATE
} from '../services/marketDataService';

const Card = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    border-radius: 6px;
  }

  @media (max-width: 360px) {
    padding: 12px;
  }
`;

const CardTitle = styled.h2`
  color: #ff6b00;
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const PerformanceSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const SummaryCard = styled.div`
  background: #0a0a0a;
  padding: 20px;
  border-radius: 6px;
  border-left: 4px solid ${props => props.color || '#ff6b00'};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }

  @media (max-width: 360px) {
    padding: 10px 8px;
  }
`;

const SummaryLabel = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 8px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const SummaryValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.color || '#fff'};
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const SummarySubtext = styled.div`
  font-size: 0.75rem;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
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
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 30px;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    margin: 0 -20px 30px -20px;
    border-radius: 0;
  }

  @media (max-width: 480px) {
    margin: 0 -15px 20px -15px;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: 15px 20px;
  border-bottom: 1px solid #333;
  transition: background 0.2s;
  min-width: 600px;

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

  @media (max-width: 768px) {
    padding: 12px 15px;
    min-width: 550px;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
    min-width: 500px;
  }
`;

const TableCell = styled.div`
  color: ${props => props.color || '#ddd'};
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const PortfolioPerformance = () => {
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState([]);
  const [attributionData, setAttributionData] = useState([]);
  const [riskMetrics, setRiskMetrics] = useState([]);
  const [currentReturn, setCurrentReturn] = useState(0);
  const [spyReturn, setSpyReturn] = useState(0);
  const [sharpeRatio, setSharpeRatio] = useState(0);
  const [maxDrawdown, setMaxDrawdown] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch portfolio performance time series
        const portfolioTimeSeries = await calculatePortfolioPerformance(START_DATE);

        if (portfolioTimeSeries.length === 0) {
          setLoading(false);
          return;
        }

        // Calculate daily returns for Sharpe ratio
        const dailyReturns = [];
        for (let i = 1; i < portfolioTimeSeries.length; i++) {
          const dailyReturn = (portfolioTimeSeries[i].value - portfolioTimeSeries[i - 1].value) / portfolioTimeSeries[i - 1].value;
          dailyReturns.push(dailyReturn);
        }

        // Calculate metrics
        const sharpe = calculateSharpeRatio(dailyReturns);
        const maxDD = calculateMaxDrawdown(portfolioTimeSeries);
        const spyPerf = await getSPYPerformance(START_DATE);
        const attribution = await calculateAttribution(START_DATE);

        // Get current return (last data point)
        const latestReturn = portfolioTimeSeries[portfolioTimeSeries.length - 1].return;

        // Format performance data by month for chart
        const monthlyData = {};
        portfolioTimeSeries.forEach(point => {
          const monthKey = point.date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = point;
          }
        });

        const formattedPerformanceData = Object.keys(monthlyData).map(monthKey => {
          const point = monthlyData[monthKey];
          const expectedReturn = ((point.date - new Date(START_DATE)) / (1000 * 60 * 60 * 24 * 365)) * 30; // 30% CAGR expected
          const spyReturnAtDate = (point.return / latestReturn) * spyPerf; // Proportional SPY return

          return {
            month: monthKey,
            actual: point.return,
            expected: expectedReturn,
            spy: spyReturnAtDate
          };
        });

        // Calculate drawdowns by month
        const drawdownsByMonth = {};
        let runningPeak = portfolioTimeSeries[0].value;

        portfolioTimeSeries.forEach(point => {
          const monthKey = point.date.toLocaleDateString('en-US', { month: 'short' });

          if (point.value > runningPeak) {
            runningPeak = point.value;
          }

          const currentDrawdown = ((point.value - runningPeak) / runningPeak) * 100;

          if (!drawdownsByMonth[monthKey] || currentDrawdown < drawdownsByMonth[monthKey]) {
            drawdownsByMonth[monthKey] = currentDrawdown;
          }
        });

        const formattedRiskMetrics = Object.keys(drawdownsByMonth).map(month => ({
          month,
          drawdown: drawdownsByMonth[month]
        }));

        // Set all state
        setPerformanceData(formattedPerformanceData);
        setAttributionData(attribution);
        setRiskMetrics(formattedRiskMetrics);
        setCurrentReturn(latestReturn);
        setSpyReturn(spyPerf);
        setSharpeRatio(sharpe);
        setMaxDrawdown(maxDD);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching portfolio performance:', error);
        setLoading(false);
      }
    };

    fetchData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const expectedReturn = 30.0; // Expected CAGR
  const alpha = currentReturn - spyReturn;

  if (loading) {
    return (
      <Card>
        <CardTitle>💼 Portfolio Performance: Thesis vs. Reality</CardTitle>
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          Loading real portfolio performance data...
        </div>
      </Card>
    );
  }

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
