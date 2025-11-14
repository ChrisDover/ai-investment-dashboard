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
  // Core thesis assumptions and actual tracking - SemiAnalysis three pillars
  const thesisMetrics = {
    foundry: {
      expected: 'TSMC consolidates leadership, 2nm on schedule',
      actual: 'On track - 2nm risk production complete, mass production Q2 2025',
      status: 'on-track',
      divergence: 0,
      details: [
        { label: 'TSMC 2nm Readiness', expected: 'Q2 2025', actual: 'On track', status: 'on-track' },
        { label: 'TSMC CapEx 2024', expected: '$40-44B', actual: '$42B (est.)', status: 'on-track' },
        { label: 'EUV Capacity', expected: 'ASML monopoly', actual: 'Secure, 200+ systems', status: 'on-track' },
        { label: 'Samsung 2nm', expected: 'Late 2025', actual: 'Delayed to 2026', status: 'warning' },
        { label: 'Intel 18A', expected: 'Late 2024', actual: 'On track', status: 'on-track' },
        { label: 'China SMIC 7nm', expected: '<5% TAM', actual: '~3% TAM (no EUV)', status: 'on-track' }
      ]
    },
    aiHardware: {
      expected: 'Nvidia maintains >80% GPU share, challengers emerge',
      actual: '~85% market share, Blackwell ramping',
      status: 'on-track',
      divergence: +5,
      details: [
        { label: 'NVDA H100 Shipments', expected: '500K+ units', actual: '550K+ units 2024', status: 'on-track' },
        { label: 'Blackwell GB200', expected: 'Q1 2025', actual: 'Confirmed Q1 2025', status: 'on-track' },
        { label: 'AMD MI300 Share', expected: '<10%', actual: '~8% (inference edge)', status: 'on-track' },
        { label: 'HBM3E Availability', expected: 'Sufficient', actual: 'SK Hynix leading', status: 'on-track' },
        { label: 'Custom ASICs', expected: '<5% TAM', actual: '~3% (Google TPU, AWS)', status: 'on-track' }
      ]
    },
    datacenter: {
      expected: 'CapEx $2T/year by 2030, energy bottlenecks',
      actual: '$200B+ annual 2024, on trajectory',
      status: 'on-track',
      divergence: +2,
      details: [
        { label: 'Hyperscaler CapEx Q3 24', expected: '$55B', actual: '$53B', status: 'on-track' },
        { label: 'Power Density', expected: '50x office', actual: 'Achieved (AI-ready)', status: 'on-track' },
        { label: 'Transformer Lead Times', expected: '24+ months', actual: '24-36 months', status: 'warning' },
        { label: 'Natural Gas Preference', expected: 'Dominant', actual: 'Yes (US reserves)', status: 'on-track' },
        { label: 'CoWoS Shortages', expected: 'Easing 2025', actual: 'Expansion planned', status: 'on-track' }
      ]
    },
    geopolitical: {
      expected: 'US-China decoupling, $100B+ trade losses',
      actual: 'Export controls active, CHIPS Act funding',
      status: 'on-track',
      divergence: 0,
      details: [
        { label: 'CHIPS Act Funding', expected: '$52B', actual: '$52B deployed', status: 'on-track' },
        { label: 'China Fab Capacity', expected: '~30% by 2030', actual: 'On track (~25% 2024)', status: 'on-track' },
        { label: 'Export Controls', expected: 'Sustained', actual: 'Active (HBM, EUV)', status: 'on-track' },
        { label: 'Taiwan Risk', expected: 'Monitoring', actual: 'Stable (subsidies)', status: 'on-track' }
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
      <CardTitle>Thesis Validation: SemiAnalysis Semiconductor Supercycle</CardTitle>

      <ValidationGrid>
        {/* Pillar 1: Foundry Dominance */}
        <ValidationCard status={thesisMetrics.foundry.status}>
          <ValidationTitle>1. Foundry & Manufacturing Dominance</ValidationTitle>
          <MetricRow>
            <MetricLabel>Expected</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.foundry.expected}</MetricValue>
          </MetricRow>
          <MetricRow>
            <MetricLabel>Actual</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.foundry.actual}</MetricValue>
          </MetricRow>
          {thesisMetrics.foundry.details.map((detail, idx) => (
            <MetricRow key={idx}>
              <MetricLabel>{detail.label}</MetricLabel>
              <MetricValue status={detail.status}>
                {detail.actual}
                {detail.expected && <div style={{ fontSize: '0.75rem', color: '#666' }}>vs {detail.expected}</div>}
              </MetricValue>
            </MetricRow>
          ))}
          <DivergenceIndicator positive={thesisMetrics.foundry.divergence >= 0}>
            ✓ TSMC Leadership Holding
          </DivergenceIndicator>
        </ValidationCard>

        {/* Pillar 2: AI Hardware Innovation */}
        <ValidationCard status={thesisMetrics.aiHardware.status}>
          <ValidationTitle>2. AI Hardware Innovation</ValidationTitle>
          <MetricRow>
            <MetricLabel>Expected</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.aiHardware.expected}</MetricValue>
          </MetricRow>
          <MetricRow>
            <MetricLabel>Actual</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.aiHardware.actual}</MetricValue>
          </MetricRow>
          {thesisMetrics.aiHardware.details.map((detail, idx) => (
            <MetricRow key={idx}>
              <MetricLabel>{detail.label}</MetricLabel>
              <MetricValue status={detail.status}>
                {detail.actual}
                {detail.expected && <div style={{ fontSize: '0.75rem', color: '#666' }}>vs {detail.expected}</div>}
              </MetricValue>
            </MetricRow>
          ))}
          <DivergenceIndicator positive={thesisMetrics.aiHardware.divergence >= 0}>
            {thesisMetrics.aiHardware.divergence >= 0 ? '+' : ''}{thesisMetrics.aiHardware.divergence}% Above Expected
          </DivergenceIndicator>
        </ValidationCard>

        {/* Pillar 3: Datacenter Expansion */}
        <ValidationCard status={thesisMetrics.datacenter.status}>
          <ValidationTitle>3. Datacenter Ecosystem Expansion</ValidationTitle>
          <MetricRow>
            <MetricLabel>Expected</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.datacenter.expected}</MetricValue>
          </MetricRow>
          <MetricRow>
            <MetricLabel>Actual</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.datacenter.actual}</MetricValue>
          </MetricRow>
          {thesisMetrics.datacenter.details.map((detail, idx) => (
            <MetricRow key={idx}>
              <MetricLabel>{detail.label}</MetricLabel>
              <MetricValue status={detail.status}>
                {detail.actual}
                {detail.expected && <div style={{ fontSize: '0.75rem', color: '#666' }}>vs {detail.expected}</div>}
              </MetricValue>
            </MetricRow>
          ))}
          <DivergenceIndicator positive={thesisMetrics.datacenter.divergence >= 0}>
            {thesisMetrics.datacenter.divergence >= 0 ? '+' : ''}{thesisMetrics.datacenter.divergence}% vs Expected
          </DivergenceIndicator>
        </ValidationCard>

        {/* Geopolitical Risks */}
        <ValidationCard status={thesisMetrics.geopolitical.status}>
          <ValidationTitle>4. Geopolitical Landscape</ValidationTitle>
          <MetricRow>
            <MetricLabel>Expected</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.geopolitical.expected}</MetricValue>
          </MetricRow>
          <MetricRow>
            <MetricLabel>Actual</MetricLabel>
            <MetricValue status="on-track">{thesisMetrics.geopolitical.actual}</MetricValue>
          </MetricRow>
          {thesisMetrics.geopolitical.details.map((detail, idx) => (
            <MetricRow key={idx}>
              <MetricLabel>{detail.label}</MetricLabel>
              <MetricValue status={detail.status}>
                {detail.actual}
                {detail.expected && <div style={{ fontSize: '0.75rem', color: '#666' }}>vs {detail.expected}</div>}
              </MetricValue>
            </MetricRow>
          ))}
          <DivergenceIndicator positive={thesisMetrics.geopolitical.divergence >= 0}>
            ✓ Risks Monitored
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
