import React, { useState } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

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

const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const ScenarioCard = styled.div`
  background: ${props => props.selected ? '#1a1a1a' : '#0a0a0a'};
  padding: 20px;
  border-radius: 6px;
  border: 2px solid ${props => props.selected ? '#ff6b00' : '#333'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #ff6b00;
    background: #1a1a1a;
  }
`;

const ScenarioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
`;

const ScenarioTitle = styled.h3`
  color: #fff;
  font-size: 1.1rem;
  margin: 0;
`;

const ProbabilityBadge = styled.div`
  background: ${props =>
    props.probability >= 20 ? 'rgba(255, 0, 0, 0.2)' :
    props.probability >= 10 ? 'rgba(255, 170, 0, 0.2)' : 'rgba(0, 170, 255, 0.2)'
  };
  color: ${props =>
    props.probability >= 20 ? '#ff0000' :
    props.probability >= 10 ? '#ffaa00' : '#00aaff'
  };
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid ${props =>
    props.probability >= 20 ? '#ff0000' :
    props.probability >= 10 ? '#ffaa00' : '#00aaff'
  };
`;

const ScenarioDescription = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 15px 0;
`;

const ImpactLabel = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 5px;
`;

const ImpactValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.negative ? '#ff0000' : '#00ff00'};
`;

const AnalysisSection = styled.div`
  background: #0a0a0a;
  padding: 25px;
  border-radius: 6px;
  margin-top: 30px;
`;

const SectionTitle = styled.h3`
  color: #ff6b00;
  font-size: 1.2rem;
  margin: 0 0 20px 0;
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
`;

const ImpactCard = styled.div`
  background: #1a1a1a;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid ${props => props.positive ? '#00ff00' : '#ff0000'};
`;

const ImpactCardLabel = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 5px;
`;

const ImpactCardValue = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${props => props.positive ? '#00ff00' : '#ff0000'};
`;

const ActionsList = styled.div`
  margin-top: 20px;
`;

const ActionItem = styled.div`
  background: #1a1a1a;
  padding: 15px 20px;
  margin-bottom: 10px;
  border-left: 4px solid #ff6b00;
  border-radius: 4px;
  display: flex;
  align-items: start;
  gap: 15px;
`;

const ActionNumber = styled.div`
  background: #ff6b00;
  color: #000;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const ActionText = styled.div`
  color: #ddd;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ScenarioTesting = () => {
  const [selectedScenario, setSelectedScenario] = useState('scaling-stalls');

  const scenarios = {
    'scaling-stalls': {
      title: 'Scaling Stalls in 2026',
      probability: 20,
      description: 'AI capability improvements plateau due to data exhaustion or architectural limits. Benchmark gains drop from 15% YoY to <5% YoY. Training runs hit diminishing returns.',
      portfolioImpact: -28,
      impacts: {
        nvda: -40,
        tsm: -25,
        msft: -20,
        googl: -18,
        amd: -30,
        vrt: -35,
        etn: -30,
        eqt: -15,
        spy: -10,
        defensive: +15
      },
      actions: [
        'Immediately reduce NVDA allocation from 25% to 15% (-10%)',
        'Cut AMD position from 5% to 2% (-3%)',
        'Reduce datacenter infrastructure exposure: VRT, ETN by 50%',
        'Increase defensive allocation from 10% to 25% (GLD, BTC, cash)',
        'Rotate into profitable hyperscalers with diversified revenue: MSFT, GOOGL hold',
        'Wait for re-acceleration signals before re-entering AI pure-plays'
      ]
    },
    'china-taiwan': {
      title: 'China Invades Taiwan',
      probability: 5,
      description: 'China launches military action against Taiwan. TSMC fabrication facilities disrupted. Semiconductor supply chain collapses. US/allies impose severe sanctions on China.',
      portfolioImpact: -45,
      impacts: {
        nvda: -60,
        tsm: -90,
        msft: -30,
        googl: -25,
        amd: -55,
        vrt: -20,
        etn: -15,
        eqt: -10,
        spy: -35,
        defensive: +40
      },
      actions: [
        'IMMEDIATELY exit TSM position (8% → 0%)',
        'Reduce NVDA by 50% due to supply chain collapse (25% → 12%)',
        'Rotate into Intel as US foundry beneficiary (0% → 8%)',
        'Increase defensive allocation to 30% (gold, treasuries)',
        'Add geographically diversified plays: Samsung, US equipment makers',
        'Monitor for global recession - reduce equity exposure to 50% if confirmed'
      ]
    },
    'energy-spike': {
      title: 'Energy Costs Spike 3x',
      probability: 15,
      description: 'Natural gas prices surge to $12/MMBtu (3x current). Datacenter economics break. Hyperscalers pause builds. AI training costs become prohibitive for all but largest players.',
      portfolioImpact: -22,
      impacts: {
        nvda: -25,
        tsm: -15,
        msft: -10,
        googl: -8,
        amd: -20,
        vrt: -40,
        etn: -35,
        eqt: +80,
        spy: -12,
        defensive: +10
      },
      actions: [
        'Increase EQT allocation from 5% to 15% (+10%)',
        'Add energy producers: CHK, natural gas pipeline operators',
        'Reduce datacenter infrastructure: VRT, ETN by 70%',
        'Hold NVDA/AMD - demand delayed but not destroyed',
        'Favor hyperscalers with efficient datacenters: GOOGL, MSFT',
        'Watch for renewable energy plays (solar, wind) as long-term solution'
      ]
    },
    'nvidia-disruption': {
      title: 'Nvidia Loses Dominance to AMD/ASICs',
      probability: 12,
      description: 'AMD MI400 series shows 2x price/performance advantage. Hyperscalers shift to custom ASICs (Google TPU, Amazon Trainium). Nvidia market share drops from 85% to 50% over 18 months.',
      portfolioImpact: -18,
      impacts: {
        nvda: -50,
        tsm: +10,
        msft: +5,
        googl: +15,
        amd: +80,
        vrt: 0,
        etn: 0,
        eqt: 0,
        spy: -5,
        defensive: 0
      },
      actions: [
        'Reduce NVDA from 25% to 10% (-15%)',
        'Increase AMD from 5% to 15% (+10%)',
        'Add GOOGL exposure by 5% (custom silicon beneficiary)',
        'Increase TSMC - benefits from both AMD and hyperscaler custom chips',
        'Monitor Nvidia margins closely - exit if drops below 60%',
        'Diversify into Broadcom (AVGO) for networking/optics'
      ]
    },
    'ai-winter': {
      title: 'AI Winter 2.0 - Demand Collapse',
      probability: 8,
      description: 'Enterprise AI adoption disappoints. ROI fails to materialize. Hyperscalers slash CapEx by 50%. Nvidia revenue drops 40% Y/Y. "AI was overhyped" narrative dominates.',
      portfolioImpact: -52,
      impacts: {
        nvda: -70,
        tsm: -30,
        msft: -25,
        googl: -20,
        amd: -65,
        vrt: -60,
        etn: -50,
        eqt: -20,
        spy: -15,
        defensive: +20
      },
      actions: [
        'Exit all AI pure-plays: NVDA, AMD, VRT, ETN immediately',
        'Reduce to SPY 60%, defensive 40% allocation',
        'Hold MSFT/GOOGL at reduced weight (diversified businesses)',
        'Wait for valuations to reset (NVDA P/E <20, AMD <15)',
        'Prepare to re-enter at trough when fundamentals recover',
        'Focus on capital preservation, not growth'
      ]
    },
    'acceleration': {
      title: 'AGI Acceleration - 2027 Timeline',
      probability: 25,
      description: 'Breakthroughs in reasoning and agentic AI. AGI arrives 2027 instead of 2040. Hyperscaler CapEx doubles. Compute demand explodes. Winner-take-most dynamics intensify.',
      portfolioImpact: +85,
      impacts: {
        nvda: +120,
        tsm: +80,
        msft: +60,
        googl: +55,
        amd: +75,
        vrt: +100,
        etn: +90,
        eqt: +50,
        spy: +40,
        defensive: -30
      },
      actions: [
        'Increase NVDA to 30% (+5%) - max out allocation',
        'Add to AMD aggressively: 5% → 10%',
        'Increase datacenter infrastructure: VRT, ETN to 10% each',
        'Reduce defensive to 5% - redeploy to high-growth AI plays',
        'Add TSM by 5% (capacity constraints create pricing power)',
        'Consider leverage (2x) if conviction is very high'
      ]
    }
  };

  const selected = scenarios[selectedScenario];

  // Portfolio impact chart data
  const impactData = Object.entries(selected.impacts).map(([ticker, impact]) => ({
    ticker: ticker.toUpperCase(),
    impact: impact
  }));

  return (
    <Card>
      <CardTitle>🎯 Scenario Stress Testing</CardTitle>

      <ScenarioGrid>
        {Object.entries(scenarios).map(([key, scenario]) => (
          <ScenarioCard
            key={key}
            selected={selectedScenario === key}
            onClick={() => setSelectedScenario(key)}
          >
            <ScenarioHeader>
              <ScenarioTitle>{scenario.title}</ScenarioTitle>
              <ProbabilityBadge probability={scenario.probability}>
                {scenario.probability}% prob
              </ProbabilityBadge>
            </ScenarioHeader>
            <ScenarioDescription>{scenario.description}</ScenarioDescription>
            <ImpactLabel>Portfolio Impact</ImpactLabel>
            <ImpactValue negative={scenario.portfolioImpact < 0}>
              {scenario.portfolioImpact > 0 ? '+' : ''}{scenario.portfolioImpact}%
            </ImpactValue>
          </ScenarioCard>
        ))}
      </ScenarioGrid>

      <AnalysisSection>
        <SectionTitle>Selected Scenario Analysis: {selected.title}</SectionTitle>

        <ImpactGrid>
          <ImpactCard positive={selected.portfolioImpact > 0}>
            <ImpactCardLabel>Total Portfolio Impact</ImpactCardLabel>
            <ImpactCardValue positive={selected.portfolioImpact > 0}>
              {selected.portfolioImpact > 0 ? '+' : ''}{selected.portfolioImpact}%
            </ImpactCardValue>
          </ImpactCard>
          <ImpactCard positive={false}>
            <ImpactCardLabel>Probability of Occurring</ImpactCardLabel>
            <ImpactCardValue positive={false}>{selected.probability}%</ImpactCardValue>
          </ImpactCard>
          <ImpactCard positive={selected.impacts.nvda > 0}>
            <ImpactCardLabel>NVDA Impact (25% position)</ImpactCardLabel>
            <ImpactCardValue positive={selected.impacts.nvda > 0}>
              {selected.impacts.nvda > 0 ? '+' : ''}{selected.impacts.nvda}%
            </ImpactCardValue>
          </ImpactCard>
          <ImpactCard positive={selected.impacts.defensive > 0}>
            <ImpactCardLabel>Defensive Hedge Impact</ImpactCardLabel>
            <ImpactCardValue positive={selected.impacts.defensive > 0}>
              {selected.impacts.defensive > 0 ? '+' : ''}{selected.impacts.defensive}%
            </ImpactCardValue>
          </ImpactCard>
        </ImpactGrid>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={impactData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="ticker" stroke="#888" tick={{ fill: '#888' }} />
            <YAxis stroke="#888" tick={{ fill: '#888' }} label={{ value: 'Impact (%)', angle: -90, position: 'insideLeft', fill: '#888' }} />
            <Tooltip
              contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px' }}
              labelStyle={{ color: '#ff6b00' }}
            />
            <ReferenceLine y={0} stroke="#666" strokeWidth={2} />
            <Bar dataKey="impact">
              {impactData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.impact >= 0 ? '#00ff00' : '#ff0000'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <SectionTitle style={{ marginTop: '30px' }}>Recommended Actions</SectionTitle>
        <ActionsList>
          {selected.actions.map((action, idx) => (
            <ActionItem key={idx}>
              <ActionNumber>{idx + 1}</ActionNumber>
              <ActionText>{action}</ActionText>
            </ActionItem>
          ))}
        </ActionsList>
      </AnalysisSection>
    </Card>
  );
};

export default ScenarioTesting;
