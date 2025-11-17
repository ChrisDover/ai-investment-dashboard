import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMultipleQuotes } from '../services/marketDataService';
import { getTodayFormatted } from '../utils/dateUtils';

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

const SignalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
`;

const SignalCard = styled.div`
  background: ${props =>
    props.signal === 'buy' ? 'rgba(0, 255, 0, 0.05)' :
    props.signal === 'sell' ? 'rgba(255, 0, 0, 0.05)' :
    props.signal === 'watch' ? 'rgba(255, 170, 0, 0.05)' :
    'rgba(100, 100, 100, 0.05)'
  };
  border: 2px solid ${props =>
    props.signal === 'buy' ? '#00ff00' :
    props.signal === 'sell' ? '#ff0000' :
    props.signal === 'watch' ? '#ffaa00' :
    '#666'
  };
  border-radius: 8px;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props =>
      props.signal === 'buy' ? '#00ff00' :
      props.signal === 'sell' ? '#ff0000' :
      props.signal === 'watch' ? '#ffaa00' :
      '#666'
    };
  }
`;

const SignalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 15px;
`;

const SignalBadge = styled.div`
  background: ${props =>
    props.signal === 'buy' ? '#00ff00' :
    props.signal === 'sell' ? '#ff0000' :
    props.signal === 'watch' ? '#ffaa00' :
    '#666'
  };
  color: #000;
  padding: 6px 16px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

const Ticker = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ff6b00;
`;

const CompanyName = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 15px;
`;

const Section = styled.div`
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionLabel = styled.div`
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
`;

const SectionContent = styled.div`
  font-size: 0.95rem;
  color: #ddd;
  line-height: 1.5;
`;

const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
`;

const Metric = styled.div`
  background: #0a0a0a;
  padding: 10px;
  border-radius: 4px;
`;

const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 3px;
`;

const MetricValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.positive ? '#00ff00' : props.negative ? '#ff0000' : '#fff'};
`;

const Confidence = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #333;
`;

const ConfidenceLabel = styled.div`
  font-size: 0.85rem;
  color: #888;
`;

const ConfidenceBar = styled.div`
  flex: 1;
  height: 8px;
  background: #1a1a1a;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ConfidenceFill = styled.div`
  height: 100%;
  width: ${props => props.level}%;
  background: ${props =>
    props.level >= 80 ? '#00ff00' :
    props.level >= 60 ? '#ffaa00' :
    '#ff6b00'
  };
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const ConfidenceValue = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  min-width: 40px;
  text-align: right;
`;

const DemoNotice = styled.div`
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid #ff6b00;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 20px;
  color: #ff6b00;
  font-size: 0.9rem;
  text-align: center;
`;

const TradingSignals = () => {
  const [livePrices, setLivePrices] = useState({});

  useEffect(() => {
    // Fetch live prices for the stocks mentioned in signals
    const fetchPrices = async () => {
      const quotes = await getMultipleQuotes(['NVDA', 'AMD', 'GOOGL', 'VRT']);
      const pricesMap = {};
      quotes.forEach(q => {
        pricesMap[q.symbol] = q.price;
      });
      setLivePrices(pricesMap);
    };
    fetchPrices();
  }, []);

  const signals = [
    {
      id: 1,
      ticker: 'SK Hynix',
      company: 'SK Hynix Inc. (Korean ADR)',
      signal: 'buy',
      catalyst: 'HBM3E supply shortage intensifying. SK Hynix has 50%+ market share with allocation fully booked through mid-2025. Nvidia Blackwell ramp will increase HBM demand 3x.',
      entry: '$180-$185',
      target: '$240',
      stop: '$165',
      timeframe: '6-9 months',
      positionSize: '3-5%',
      confidence: 85,
      metrics: [
        { label: 'Expected Return', value: '+30%', positive: true },
        { label: 'Risk/Reward', value: '3.7:1', positive: true },
        { label: 'Allocation', value: '4%', positive: false },
        { label: 'Time Horizon', value: '6-9mo', positive: false }
      ]
    },
    {
      id: 2,
      ticker: 'AMD',
      company: 'Advanced Micro Devices',
      signal: 'watch',
      catalyst: 'MI350 launch Q4 2025 expected to show significant performance gains over MI300. Watching for hyperscaler design wins and benchmark confirmations.',
      entry: 'Wait for <$155 OR design win confirmation',
      target: '$210',
      stop: '$140',
      timeframe: '9-12 months',
      positionSize: '5-7%',
      confidence: 65,
      metrics: [
        { label: 'Expected Return', value: '+35%', positive: true },
        { label: 'Current Price', value: livePrices['AMD'] ? `$${livePrices['AMD'].toFixed(2)}` : 'Loading...', positive: false },
        { label: 'Design Wins', value: 'Pending', positive: false },
        { label: 'Time Horizon', value: '9-12mo', positive: false }
      ]
    },
    {
      id: 3,
      ticker: 'NVDA',
      company: 'Nvidia Corporation',
      signal: 'hold',
      catalyst: 'Blackwell ramp proceeding on schedule with strong early demand. Maintain core position but monitor for margin compression if AMD competition intensifies.',
      entry: 'Already positioned',
      target: '$180 (12mo)',
      stop: '$120 (if margins <60%)',
      timeframe: 'Hold long-term',
      positionSize: '20-25%',
      confidence: 90,
      metrics: [
        { label: 'Current Price', value: livePrices['NVDA'] ? `$${livePrices['NVDA'].toFixed(2)}` : 'Loading...', positive: false },
        { label: 'YTD Return', value: '+45%', positive: true },
        { label: 'Gross Margin', value: '75%', positive: true },
        { label: 'Market Share', value: '85%', positive: true }
      ]
    },
    {
      id: 4,
      ticker: 'VRT',
      company: 'Vertiv Holdings',
      signal: 'buy',
      catalyst: 'Datacenter infrastructure buildout accelerating. VRT supplies critical cooling/power systems. Order backlog growing 40% YoY. Hyperscaler CapEx increase directly benefits.',
      entry: '$100-$105',
      target: '$140',
      stop: '$92',
      timeframe: '12-18 months',
      positionSize: '4-6%',
      confidence: 75,
      metrics: [
        { label: 'Current Price', value: livePrices['VRT'] ? `$${livePrices['VRT'].toFixed(2)}` : 'Loading...', positive: false },
        { label: 'Order Backlog', value: '+40% YoY', positive: true },
        { label: 'P/E Ratio', value: '28', positive: false },
        { label: 'Time Horizon', value: '12-18mo', positive: false }
      ]
    },
    {
      id: 5,
      ticker: 'INTC',
      company: 'Intel Corporation',
      signal: 'watch',
      catalyst: 'Intel 18A node showing promise with test chip successes. Potential foundry business inflection if they can execute. However, high execution risk.',
      entry: 'Wait for 18A customer wins',
      target: '$60',
      stop: '$35',
      timeframe: '18-24 months',
      positionSize: '2-3%',
      confidence: 45,
      metrics: [
        { label: 'Upside Potential', value: '+60%', positive: true },
        { label: 'Execution Risk', value: 'High', negative: true },
        { label: '18A Timeline', value: 'Q4 2024', positive: false },
        { label: 'Customer Wins', value: 'TBD', positive: false }
      ]
    },
    {
      id: 6,
      ticker: 'GOOGL',
      company: 'Alphabet Inc.',
      signal: 'buy',
      catalyst: 'Gemini models showing competitive performance. CapEx increasing 15% for 2025 AI infrastructure. Undervalued vs. MSFT on AI exposure with better core business margins.',
      entry: '$165-$170',
      target: '$210',
      stop: '$155',
      timeframe: '12 months',
      positionSize: '8-10%',
      confidence: 80,
      metrics: [
        { label: 'Current Price', value: livePrices['GOOGL'] ? `$${livePrices['GOOGL'].toFixed(2)}` : 'Loading...', positive: false },
        { label: 'Expected Return', value: '+25%', positive: true },
        { label: 'P/E vs MSFT', value: 'Cheaper', positive: true },
        { label: 'CapEx 2025', value: '+15%', positive: true }
      ]
    }
  ];

  return (
    <Card>
      <CardTitle>📊 Trading Signals: Actionable Investment Ideas ({getTodayFormatted()})</CardTitle>

      <DemoNotice>
        ⚠️ Example Research Ideas - These are illustrative trading signals for demonstration purposes. Not financial advice. Current prices are LIVE from Alpha Vantage.
      </DemoNotice>

      <SignalsGrid>
        {signals.map(signal => (
          <SignalCard key={signal.id} signal={signal.signal}>
            <SignalHeader>
              <div>
                <Ticker>{signal.ticker}</Ticker>
                <CompanyName>{signal.company}</CompanyName>
              </div>
              <SignalBadge signal={signal.signal}>{signal.signal}</SignalBadge>
            </SignalHeader>

            <Section>
              <SectionLabel>Catalyst</SectionLabel>
              <SectionContent>{signal.catalyst}</SectionContent>
            </Section>

            <Section>
              <SectionLabel>Trade Setup</SectionLabel>
              <SectionContent>
                <div><strong>Entry:</strong> {signal.entry}</div>
                <div><strong>Target:</strong> {signal.target}</div>
                <div><strong>Stop Loss:</strong> {signal.stop}</div>
                <div><strong>Timeframe:</strong> {signal.timeframe}</div>
                <div><strong>Position Size:</strong> {signal.positionSize}</div>
              </SectionContent>
            </Section>

            <MetricsRow>
              {signal.metrics.map((metric, idx) => (
                <Metric key={idx}>
                  <MetricLabel>{metric.label}</MetricLabel>
                  <MetricValue positive={metric.positive} negative={metric.negative}>
                    {metric.value}
                  </MetricValue>
                </Metric>
              ))}
            </MetricsRow>

            <Confidence>
              <ConfidenceLabel>Confidence:</ConfidenceLabel>
              <ConfidenceBar>
                <ConfidenceFill level={signal.confidence} />
              </ConfidenceBar>
              <ConfidenceValue>{signal.confidence}%</ConfidenceValue>
            </Confidence>
          </SignalCard>
        ))}
      </SignalsGrid>
    </Card>
  );
};

export default TradingSignals;
