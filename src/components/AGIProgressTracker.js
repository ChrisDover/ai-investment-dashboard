import React, { useState } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

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

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
`;

const MetricBox = styled.div`
  background: #0a0a0a;
  padding: 15px;
  border-left: 3px solid ${props => props.color || '#ff6b00'};
  border-radius: 4px;
`;

const MetricLabel = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 5px;
`;

const MetricValue = styled.div`
  font-size: 1.8rem;
  color: ${props => props.color || '#fff'};
  font-weight: 700;
`;

const MetricSubtext = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-top: 5px;
`;

const StatusIndicator = styled.span`
  display: inline-block;
  padding: 3px 10px;
  background: ${props => props.status === 'on-track' ? '#00ff00' : props.status === 'warning' ? '#ffaa00' : '#ff0000'};
  color: #000;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-left: 10px;
`;

const AGIProgressTracker = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const targetYear = 2040;
  const yearsRemaining = targetYear - currentYear;
  const progressPercentage = ((currentYear - 2023) / (targetYear - 2023)) * 100;

  // AGI progress data - tracking key capability milestones
  const generateProgressData = () => {
    const data = [];
    const startYear = 2020;

    for (let year = startYear; year <= 2045; year++) {
      const item = {
        year,
        expectedCapability: Math.min(100, ((year - startYear) / (targetYear - startYear)) * 100),
        actualCapability: year <= currentYear ? Math.min(100, ((year - startYear) / (targetYear - startYear)) * 85) : null,
        upperBound: Math.min(100, ((year - startYear) / (targetYear - startYear)) * 115),
        lowerBound: Math.min(100, ((year - startYear) / (targetYear - startYear)) * 70),
      };
      data.push(item);
    }

    return data;
  };

  const data = generateProgressData();

  // Current AI capability score (0-100) - rough estimate based on benchmarks
  const currentCapability = 42; // Based on ~2024-2025 models
  const expectedCapability = ((currentYear - 2020) / (targetYear - 2020)) * 100;
  const status = currentCapability >= expectedCapability * 0.9 ? 'on-track' :
                 currentCapability >= expectedCapability * 0.7 ? 'warning' : 'behind';

  return (
    <Card>
      <CardTitle>
        AGI Progress Tracker: Path to 2040
        <StatusIndicator status={status}>
          {status === 'on-track' ? 'ON TRACK' : status === 'warning' ? 'MONITORING' : 'BEHIND'}
        </StatusIndicator>
      </CardTitle>

      <MetricsGrid>
        <MetricBox color="#00ff00">
          <MetricLabel>Years to AGI</MetricLabel>
          <MetricValue color="#00ff00">{yearsRemaining}</MetricValue>
          <MetricSubtext>Target: 2040 (70% probability)</MetricSubtext>
        </MetricBox>

        <MetricBox color="#ff6b00">
          <MetricLabel>Current Capability Score</MetricLabel>
          <MetricValue color="#ff6b00">{currentCapability}%</MetricValue>
          <MetricSubtext>vs Expected: {expectedCapability.toFixed(1)}%</MetricSubtext>
        </MetricBox>

        <MetricBox color="#00aaff">
          <MetricLabel>Timeline Progress</MetricLabel>
          <MetricValue color="#00aaff">{progressPercentage.toFixed(1)}%</MetricValue>
          <MetricSubtext>Since 2023 baseline</MetricSubtext>
        </MetricBox>

        <MetricBox color="#aa00ff">
          <MetricLabel>Scaling Confidence</MetricLabel>
          <MetricValue color="#aa00ff">70%</MetricValue>
          <MetricSubtext>Probability scaling works</MetricSubtext>
        </MetricBox>
      </MetricsGrid>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="year"
            stroke="#888"
            tick={{ fill: '#888' }}
          />
          <YAxis
            stroke="#888"
            tick={{ fill: '#888' }}
            label={{ value: 'AI Capability Progress (%)', angle: -90, position: 'insideLeft', fill: '#888' }}
          />
          <Tooltip
            contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px' }}
            labelStyle={{ color: '#ff6b00' }}
          />
          <Legend wrapperStyle={{ color: '#888' }} />

          <Line
            type="monotone"
            dataKey="upperBound"
            stroke="#00ff00"
            strokeWidth={1}
            strokeDasharray="5 5"
            dot={false}
            name="Optimistic Path (+15%)"
          />

          <Line
            type="monotone"
            dataKey="expectedCapability"
            stroke="#ff6b00"
            strokeWidth={3}
            dot={false}
            name="Expected Path (Base Case)"
          />

          <Line
            type="monotone"
            dataKey="actualCapability"
            stroke="#00aaff"
            strokeWidth={3}
            dot={{ fill: '#00aaff', r: 4 }}
            name="Actual Progress (2024-2025)"
          />

          <Line
            type="monotone"
            dataKey="lowerBound"
            stroke="#ff0000"
            strokeWidth={1}
            strokeDasharray="5 5"
            dot={false}
            name="Pessimistic Path (-30%)"
          />

          <ReferenceLine
            x={2040}
            stroke="#00ff00"
            strokeWidth={2}
            label={{ value: 'AGI Target: 2040', fill: '#00ff00', position: 'top' }}
          />

          <ReferenceLine
            x={currentYear}
            stroke="#fff"
            strokeWidth={2}
            strokeDasharray="3 3"
            label={{ value: 'Today', fill: '#fff', position: 'top' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default AGIProgressTracker;
