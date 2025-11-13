import React from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

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

const ValidationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const ValidationCard = styled.div`
  background: #0a0a0a;
  padding: 20px;
  border-radius: 6px;
  border-left: 4px solid ${props => props.status === 'on-track' ? '#00ff00' :
                                       props.status === 'warning' ? '#ffaa00' : '#ff0000'};
`;

const ValidationTitle = styled.h3`
  color: #fff;
  font-size: 1.1rem;
  margin: 0 0 15px 0;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const MetricLabel = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

const MetricValue = styled.div`
  color: ${props => props.status === 'on-track' ? '#00ff00' :
                     props.status === 'warning' ? '#ffaa00' : '#ff0000'};
  font-size: 1rem;
  font-weight: 700;
`;

const DivergenceIndicator = styled.div`
  background: ${props => props.positive ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
  color: ${props => props.positive ? '#00ff00' : '#ff0000'};
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-top: 8px;
  border: 1px solid ${props => props.positive ? '#00ff00' : '#ff0000'};
`;

const ChartSection = styled.div`
  margin-top: 30px;
`;

const SectionTitle = styled.h3`
  color: #ff6b00;
  font-size: 1.2rem;
  margin: 0 0 20px 0;
`;

const ThesisValidation = () => {
  // Core thesis assumptions and actual tracking
  const thesisMetrics = {
    scaling: {
      expected: 'Continuous gains through 2030',
      actual: 'On track - GPT-4 → Claude 3.5 improvements',
      status: 'on-track',
      divergence: 0,
      details: [
        { label: 'Benchmark Progress', expected: '+15% YoY', actual: '+18% YoY', status: 'on-track' },
        { label: 'Compute Efficiency', expected: '2x per year', actual: '2.3x per year', status: 'on-track' },
        { label: 'Data Availability', expected: 'Sufficient to 2027', actual: 'Synthetic data working', status: 'on-track' }
      ]
    },
    capex: {
      expected: '$500B cumulative by 2025',
      actual: '$520B cumulative (est.)',
      status: 'on-track',
      divergence: +4,
      details: [
        { label: 'MSFT CapEx Q3 2024', expected: '$14B', actual: '$14.9B', status: 'on-track' },
        { label: 'GOOGL CapEx Q3 2024', expected: '$13B', actual: '$13.1B', status: 'on-track' },
        { label: 'META CapEx Q3 2024', expected: '$9B', actual: '$9.2B', status: 'on-track' },
        { label: 'AMZN CapEx Q3 2024', expected: '$16B', actual: '$15.8B', status: 'warning' }
      ]
    },
    processNodes: {
      expected: 'TSMC 2nm mass production Q2 2025',
      actual: 'On schedule - risk production complete',
      status: 'on-track',
      divergence: 0,
      details: [
        { label: 'TSMC 2nm Readiness', expected: 'Q2 2025', actual: 'On track', status: 'on-track' },
        { label: 'Yield Rates', expected: '>70%', actual: '~75% (estimated)', status: 'on-track' },
        { label: 'Samsung 2nm', expected: 'Late 2025', actual: 'Delayed to 2026', status: 'warning' },
        { label: 'Intel 18A', expected: 'Late 2024', actual: 'On track', status: 'on-track' }
      ]
    },
    competition: {
      expected: 'Nvidia maintains >80% datacenter GPU share',
      actual: '~85% market share',
      status: 'on-track',
      divergence: +5,
      details: [
        { label: 'NVDA H100 Shipments', expected: 'Strong', actual: '550K+ units 2024', status: 'on-track' },
        { label: 'AMD MI300 Adoption', expected: '<10% share', actual: '~8% share', status: 'on-track' },
        { label: 'Custom ASICs', expected: '<5% TAM', actual: '~3% TAM', status: 'on-track' },
        { label: 'Blackwell Ramp', expected: 'Q1 2025', actual: 'Confirmed Q1 2025', status: 'on-track' }
      ]
    }
  };

  // Quarterly hyperscaler CapEx data
  const capexData = [
    { quarter: 'Q1 2024', expected: 48, actual: 50.2, company: 'Total' },
    { quarter: 'Q2 2024', expected: 52, actual: 53.8, company: 'Total' },
    { quarter: 'Q3 2024', expected: 55, actual: 53.0, company: 'Total' },
    { quarter: 'Q4 2024', expected: 60, actual: 62, company: 'Total (proj)' },
    { quarter: 'Q1 2025', expected: 65, actual: null, company: 'Total (proj)' }
  ];

  return (
    <Card>
      <CardTitle>Thesis Validation: Core Assumptions Check</CardTitle>

      <ValidationGrid>
        {/* Scaling Laws Validation */}
        <ValidationCard status={thesisMetrics.scaling.status}>
          <ValidationTitle>1. Scaling Laws Working</ValidationTitle>
          <MetricRow>
            <MetricLabel>Expected</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.scaling.expected}</MetricValue>
          </MetricRow>
          <MetricRow>
            <MetricLabel>Actual</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.scaling.actual}</MetricValue>
          </MetricRow>
          {thesisMetrics.scaling.details.map((detail, idx) => (
            <MetricRow key={idx}>
              <MetricLabel>{detail.label}</MetricLabel>
              <MetricValue status={detail.status}>
                {detail.actual}
                {detail.expected && <div style={{ fontSize: '0.75rem', color: '#666' }}>vs {detail.expected}</div>}
              </MetricValue>
            </MetricRow>
          ))}
          <DivergenceIndicator positive={thesisMetrics.scaling.divergence >= 0}>
            {thesisMetrics.scaling.divergence >= 0 ? '✓ ' : '⚠ '}
            Status: ON TRACK
          </DivergenceIndicator>
        </ValidationCard>

        {/* CapEx Validation */}
        <ValidationCard status={thesisMetrics.capex.status}>
          <ValidationTitle>2. CapEx Deployment</ValidationTitle>
          <MetricRow>
            <MetricLabel>Expected 2025 Cumulative</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.capex.expected}</MetricValue>
          </MetricRow>
          <MetricRow>
            <MetricLabel>Actual Progress</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.capex.actual}</MetricValue>
          </MetricRow>
          {thesisMetrics.capex.details.map((detail, idx) => (
            <MetricRow key={idx}>
              <MetricLabel>{detail.label}</MetricLabel>
              <MetricValue status={detail.status}>
                {detail.actual}
                <div style={{ fontSize: '0.75rem', color: '#666' }}>vs {detail.expected}</div>
              </MetricValue>
            </MetricRow>
          ))}
          <DivergenceIndicator positive={thesisMetrics.capex.divergence >= 0}>
            {thesisMetrics.capex.divergence >= 0 ? '+' : ''}{thesisMetrics.capex.divergence}% vs Expected
          </DivergenceIndicator>
        </ValidationCard>

        {/* Process Nodes Validation */}
        <ValidationCard status={thesisMetrics.processNodes.status}>
          <ValidationTitle>3. Process Node Roadmap</ValidationTitle>
          <MetricRow>
            <MetricLabel>TSMC 2nm Timeline</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.processNodes.expected}</MetricValue>
          </MetricRow>
          <MetricRow>
            <MetricLabel>Current Status</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.processNodes.actual}</MetricValue>
          </MetricRow>
          {thesisMetrics.processNodes.details.map((detail, idx) => (
            <MetricRow key={idx}>
              <MetricLabel>{detail.label}</MetricLabel>
              <MetricValue status={detail.status}>
                {detail.actual}
                <div style={{ fontSize: '0.75rem', color: '#666' }}>Target: {detail.expected}</div>
              </MetricValue>
            </MetricRow>
          ))}
          <DivergenceIndicator positive={thesisMetrics.processNodes.divergence >= 0}>
            ✓ Critical Path Holding
          </DivergenceIndicator>
        </ValidationCard>

        {/* Competition Validation */}
        <ValidationCard status={thesisMetrics.competition.status}>
          <ValidationTitle>4. Competitive Landscape</ValidationTitle>
          <MetricRow>
            <MetricLabel>Thesis Assumption</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.competition.expected}</MetricValue>
          </MetricRow>
          <MetricRow>
            <MetricLabel>Current Reality</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.competition.actual}</MetricValue>
          </MetricRow>
          {thesisMetrics.competition.details.map((detail, idx) => (
            <MetricRow key={idx}>
              <MetricLabel>{detail.label}</MetricLabel>
              <MetricValue status={detail.status}>
                {detail.actual}
              </MetricValue>
            </MetricRow>
          ))}
          <DivergenceIndicator positive={thesisMetrics.competition.divergence >= 0}>
            {thesisMetrics.competition.divergence >= 0 ? '+' : ''}{thesisMetrics.competition.divergence}% Above Expected
          </DivergenceIndicator>
        </ValidationCard>
      </ValidationGrid>

      {/* Hyperscaler CapEx Chart */}
      <ChartSection>
        <SectionTitle>Hyperscaler CapEx: Expected vs. Actual ($B)</SectionTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={capexData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="quarter" stroke="#888" tick={{ fill: '#888' }} />
            <YAxis stroke="#888" tick={{ fill: '#888' }} label={{ value: 'CapEx ($B)', angle: -90, position: 'insideLeft', fill: '#888' }} />
            <Tooltip
              contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px' }}
              labelStyle={{ color: '#ff6b00' }}
            />
            <Legend wrapperStyle={{ color: '#888' }} />
            <Bar dataKey="expected" fill="#ff6b00" name="Expected CapEx" />
            <Bar dataKey="actual" fill="#00ff00" name="Actual CapEx">
              {capexData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.actual === null ? '#666' : '#00ff00'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartSection>
    </Card>
  );
};

export default ThesisValidation;
