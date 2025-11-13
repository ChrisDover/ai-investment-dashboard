import React from 'react';
import styled from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  font-size: 1.6rem;
  color: ${props => props.color || '#fff'};
  font-weight: 700;
`;

const MetricSubtext = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-top: 5px;
`;

const CAGRTimeline = () => {
  const currentYear = new Date().getFullYear();

  // Generate CAGR projection data
  const generateCAGRData = () => {
    const data = [];
    const baseYear = 2020;
    const baseRevenue = 10; // $10B baseline

    // Expected: 20-40% CAGR in explosive scenario
    // Bull case: 40% CAGR
    // Base case: 30% CAGR
    // Bear case: 15% CAGR

    for (let year = baseYear; year <= 2040; year++) {
      const yearsSince = year - baseYear;

      const item = {
        year,
        bullCase: baseRevenue * Math.pow(1.40, yearsSince), // 40% CAGR
        baseCase: baseRevenue * Math.pow(1.30, yearsSince), // 30% CAGR
        bearCase: baseRevenue * Math.pow(1.15, yearsSince), // 15% CAGR (stalled scaling)
        // Actual data up to current year (using ~35% actual CAGR)
        actual: year <= currentYear ? baseRevenue * Math.pow(1.35, yearsSince) : null,
      };

      data.push(item);
    }

    return data;
  };

  const data = generateCAGRData();

  // Calculate current metrics
  const currentActual = data.find(d => d.year === currentYear)?.actual || 0;
  const currentBase = data.find(d => d.year === currentYear)?.baseCase || 0;
  const variance = ((currentActual - currentBase) / currentBase) * 100;

  // Future projections
  const projection2030 = data.find(d => d.year === 2030);
  const projection2040 = data.find(d => d.year === 2040);

  return (
    <Card>
      <CardTitle>CAGR Timeline: Revenue Growth Projections</CardTitle>

      <MetricsGrid>
        <MetricBox color="#00ff00">
          <MetricLabel>Current AI Revenue (Est.)</MetricLabel>
          <MetricValue color="#00ff00">${currentActual.toFixed(1)}B</MetricValue>
          <MetricSubtext>vs Base Case: {variance > 0 ? '+' : ''}{variance.toFixed(1)}%</MetricSubtext>
        </MetricBox>

        <MetricBox color="#ff6b00">
          <MetricLabel>2030 Base Projection</MetricLabel>
          <MetricValue color="#ff6b00">${projection2030.baseCase.toFixed(0)}B</MetricValue>
          <MetricSubtext>30% CAGR from 2020</MetricSubtext>
        </MetricBox>

        <MetricBox color="#00aaff">
          <MetricLabel>2040 Base Projection</MetricLabel>
          <MetricValue color="#00aaff">${(projection2040.baseCase / 1000).toFixed(1)}T</MetricValue>
          <MetricSubtext>Expected AI market size</MetricSubtext>
        </MetricBox>

        <MetricBox color="#aa00ff">
          <MetricLabel>Bull Case 2040</MetricLabel>
          <MetricValue color="#aa00ff">${(projection2040.bullCase / 1000).toFixed(1)}T</MetricValue>
          <MetricSubtext>40% CAGR (explosive growth)</MetricSubtext>
        </MetricBox>
      </MetricsGrid>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBull" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ff00" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00ff00" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ff6b00" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff0000" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ff0000" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00aaff" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="#00aaff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="year"
            stroke="#888"
            tick={{ fill: '#888' }}
          />
          <YAxis
            stroke="#888"
            tick={{ fill: '#888' }}
            scale="log"
            domain={[10, 100000]}
            label={{ value: 'Revenue ($B, log scale)', angle: -90, position: 'insideLeft', fill: '#888' }}
          />
          <Tooltip
            contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px' }}
            labelStyle={{ color: '#ff6b00' }}
            formatter={(value) => `$${value.toFixed(1)}B`}
          />
          <Legend wrapperStyle={{ color: '#888' }} />

          <Area
            type="monotone"
            dataKey="bearCase"
            stroke="#ff0000"
            strokeWidth={2}
            fill="url(#colorBear)"
            name="Bear Case (15% CAGR - Stalled Scaling)"
          />

          <Area
            type="monotone"
            dataKey="baseCase"
            stroke="#ff6b00"
            strokeWidth={3}
            fill="url(#colorBase)"
            name="Base Case (30% CAGR)"
          />

          <Area
            type="monotone"
            dataKey="bullCase"
            stroke="#00ff00"
            strokeWidth={2}
            fill="url(#colorBull)"
            name="Bull Case (40% CAGR - Explosive Growth)"
          />

          <Area
            type="monotone"
            dataKey="actual"
            stroke="#00aaff"
            strokeWidth={4}
            fill="url(#colorActual)"
            dot={{ fill: '#00aaff', r: 5 }}
            name="Actual (Est. 35% CAGR)"
          />

          <ReferenceLine
            x={2030}
            stroke="#ffaa00"
            strokeWidth={2}
            strokeDasharray="3 3"
            label={{ value: '2030 Milestone', fill: '#ffaa00', position: 'top' }}
          />

          <ReferenceLine
            x={2040}
            stroke="#00ff00"
            strokeWidth={2}
            label={{ value: '2040 Target', fill: '#00ff00', position: 'top' }}
          />

          <ReferenceLine
            x={currentYear}
            stroke="#fff"
            strokeWidth={2}
            strokeDasharray="3 3"
            label={{ value: 'Today', fill: '#fff', position: 'top' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CAGRTimeline;
