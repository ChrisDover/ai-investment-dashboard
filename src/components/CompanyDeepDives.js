import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const CompanyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 15px;
`;

const CompanyCard = styled.div`
  background: #0a0a0a;
  border: 2px solid ${props => props.expanded ? '#ff6b00' : '#333'};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
`;

const CompanyHeader = styled.div`
  padding: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.expanded ? '#1a1a1a' : '#0a0a0a'};
  transition: background 0.2s;

  &:hover {
    background: #1a1a1a;
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const Ticker = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff6b00;
  margin-bottom: 5px;
`;

const CompanyName = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 10px;
`;

const QuickMetrics = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const QuickMetric = styled.div`
  font-size: 0.85rem;
  color: #ddd;

  span {
    color: #666;
    margin-right: 5px;
  }
`;

const ExpandIcon = styled.div`
  font-size: 1.5rem;
  color: #ff6b00;
  transition: transform 0.3s;
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const CompanyDetails = styled.div`
  max-height: ${props => props.expanded ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const DetailsContent = styled.div`
  padding: 0 20px 20px 20px;
`;

const Section = styled.div`
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  color: #ff6b00;
  font-size: 1rem;
  margin: 0 0 15px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
`;

const MetricBox = styled.div`
  background: #1a1a1a;
  padding: 12px;
  border-radius: 4px;
  border-left: 3px solid ${props => props.color || '#666'};
`;

const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 5px;
`;

const MetricValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.color || '#fff'};
`;

const MetricSubtext = styled.div`
  font-size: 0.7rem;
  color: #666;
  margin-top: 3px;
`;

const BulletPoints = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #ddd;
  font-size: 0.9rem;
  line-height: 1.8;

  li {
    margin-bottom: 8px;
  }
`;

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const CompanyDeepDives = () => {
  const [expanded, setExpanded] = useState({});
  const [livePrices, setLivePrices] = useState({});
  const [loading, setLoading] = useState(true);

  const toggleExpand = (ticker) => {
    setExpanded(prev => ({
      ...prev,
      [ticker]: !prev[ticker]
    }));
  };

  // Fetch live pricing data
  useEffect(() => {
    const fetchLivePrices = async () => {
      try {
        const tickers = ['NVDA', 'TSM', 'AMD', 'MSFT'];
        const response = await fetch(`${API_BASE_URL}/api/quotes?symbols=${tickers.join(',')}`);

        if (response.ok) {
          const data = await response.json();
          // Convert array to object keyed by symbol for easy lookup
          const pricesObj = {};
          data.forEach(quote => {
            pricesObj[quote.symbol] = quote;
          });
          setLivePrices(pricesObj);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching live prices:', error);
        setLoading(false);
      }
    };

    fetchLivePrices();

    // Refresh every 5 minutes
    const interval = setInterval(fetchLivePrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const companies = {
    NVDA: {
      name: 'Nvidia Corporation',
      quickMetrics: {
        price: '$142.50',
        ytd: '+48.5%',
        allocation: '25%'
      },
      fundamentals: [
        { label: 'Market Cap', value: '$4.5T', color: '#fff', borderColor: '#ff6b00' },
        { label: 'P/E Ratio', value: '68', color: '#fff', borderColor: '#00aaff' },
        { label: 'Gross Margin', value: '75.3%', color: '#00ff00', subtext: 'Target: >65%', borderColor: '#00ff00' },
        { label: 'DC Revenue Q3', value: '$30.8B', color: '#00ff00', subtext: '+112% Y/Y', borderColor: '#00ff00' },
        { label: 'Market Share', value: '85%', color: '#00ff00', subtext: 'GPU market', borderColor: '#00ff00' },
        { label: 'China Exposure', value: '15%', color: '#ffaa00', subtext: 'Export risk', borderColor: '#ffaa00' }
      ],
      keyMetrics: [
        'Blackwell ramp on schedule - GB200 systems shipping Q1 2025',
        'H100 demand still strong despite Blackwell launch (refresh cycles)',
        'Software moat: CUDA installed base >3M developers, growing 40% Y/Y',
        'Competition emerging: AMD MI300 at 8% share, custom ASICs at 3%',
        'Watch: Gross margins (target >65%), China revenue (geopolitical risk)'
      ],
      revenueHistory: [
        { quarter: 'Q1 23', datacenter: 4.3, gaming: 2.2 },
        { quarter: 'Q2 23', datacenter: 10.3, gaming: 2.5 },
        { quarter: 'Q3 23', datacenter: 14.5, gaming: 2.9 },
        { quarter: 'Q4 23', datacenter: 18.4, gaming: 2.9 },
        { quarter: 'Q1 24', datacenter: 22.6, gaming: 2.6 },
        { quarter: 'Q2 24', datacenter: 26.3, gaming: 2.9 },
        { quarter: 'Q3 24', datacenter: 30.8, gaming: 3.3 }
      ],
      catalysts: [
        'Blackwell demand visibility through 2025',
        'MI400 competitive response in H2 2025',
        'New China export restrictions (risk)',
        'Margin sustainability as competition increases'
      ]
    },
    TSM: {
      name: 'Taiwan Semiconductor Manufacturing',
      quickMetrics: {
        price: '$187.25',
        ytd: '+42.3%',
        allocation: '8%'
      },
      fundamentals: [
        { label: 'Market Cap', value: '$970B', color: '#fff', borderColor: '#ff6b00' },
        { label: 'P/E Ratio', value: '28', color: '#fff', borderColor: '#00aaff' },
        { label: 'Gross Margin', value: '54.5%', color: '#00ff00', subtext: 'Pricing power', borderColor: '#00ff00' },
        { label: 'N2 Timeline', value: 'Q2 2025', color: '#00ff00', subtext: 'On schedule', borderColor: '#00ff00' },
        { label: 'Yield (N2)', value: '~75%', color: '#00ff00', subtext: 'Ahead of plan', borderColor: '#00ff00' },
        { label: 'Taiwan Risk', value: 'High', color: '#ff0000', subtext: 'Geopolitical', borderColor: '#ff0000' }
      ],
      keyMetrics: [
        '2nm (N2) on track: Risk production yields 75-80%, mass prod Q2 2025',
        'Apple A19 taped out for N2, Nvidia B200 successor also planned',
        'CoWoS capacity expanding: +50% by end 2025 to support AI demand',
        'Pricing power intact: N2 premiums 2.5x vs N5, customers accepting',
        'Watch: Geopolitical risk (Taiwan), customer concentration (Apple 25%)'
      ],
      revenueHistory: [
        { quarter: 'Q1 23', smartphone: 38, hpc: 42 },
        { quarter: 'Q2 23', smartphone: 35, hpc: 45 },
        { quarter: 'Q3 23', smartphone: 40, hpc: 44 },
        { quarter: 'Q4 23', smartphone: 45, hpc: 44 },
        { quarter: 'Q1 24', smartphone: 42, hpc: 48 },
        { quarter: 'Q2 24', smartphone: 40, hpc: 52 },
        { quarter: 'Q3 24', smartphone: 38, hpc: 55 }
      ],
      catalysts: [
        'N2 mass production ramp in Q2-Q3 2025',
        'Apple iPhone 17 Pro launch with A19 (N2)',
        'Nvidia next-gen AI chip adoption',
        'Any escalation in China-Taiwan tensions (risk)'
      ]
    },
    AMD: {
      name: 'Advanced Micro Devices',
      quickMetrics: {
        price: '$163.40',
        ytd: '+28.9%',
        allocation: '5%'
      },
      fundamentals: [
        { label: 'Market Cap', value: '$265B', color: '#fff', borderColor: '#ff6b00' },
        { label: 'P/E Ratio', value: '45', color: '#fff', borderColor: '#00aaff' },
        { label: 'Gross Margin', value: '53%', color: '#ffaa00', subtext: 'vs NVDA 75%', borderColor: '#ffaa00' },
        { label: 'DC GPU Revenue', value: '$400M Q4', color: '#ffaa00', subtext: 'Below target', borderColor: '#ffaa00' },
        { label: 'Market Share', value: '8%', color: '#ffaa00', subtext: 'Growing slowly', borderColor: '#ffaa00' },
        { label: 'Design Wins 2025', value: '3+', color: '#00ff00', subtext: 'Hyperscalers', borderColor: '#00ff00' }
      ],
      keyMetrics: [
        'MI300 ramp slower than expected: $400M Q4 vs $600M whisper',
        'Design wins growing: 3 new hyperscalers for 2025, $4.5B pipeline',
        'MI350 launch Q4 2025: Expected to show significant performance gains',
        'Software challenge: ROCm ecosystem lags CUDA, limiting adoption',
        'Watch: MI350 benchmarks, hyperscaler deployment timing, pricing'
      ],
      revenueHistory: [
        { quarter: 'Q1 23', datacenter: 1.3, client: 0.7 },
        { quarter: 'Q2 23', datacenter: 1.3, client: 0.9 },
        { quarter: 'Q3 23', datacenter: 1.6, client: 1.4 },
        { quarter: 'Q4 23', datacenter: 2.3, client: 1.5 },
        { quarter: 'Q1 24', datacenter: 2.3, client: 1.4 },
        { quarter: 'Q2 24', datacenter: 2.8, client: 1.5 },
        { quarter: 'Q3 24', datacenter: 3.5, client: 1.9 }
      ],
      catalysts: [
        'MI350 launch and benchmark results (Q4 2025)',
        'Hyperscaler deployment announcements',
        'ROCm ecosystem improvements',
        'Any Nvidia stumble (Blackwell delays, margin compression)'
      ]
    },
    MSFT: {
      name: 'Microsoft Corporation',
      quickMetrics: {
        price: '$425.80',
        ytd: '+38.7%',
        allocation: '10%'
      },
      fundamentals: [
        { label: 'Market Cap', value: '$3.2T', color: '#fff', borderColor: '#ff6b00' },
        { label: 'P/E Ratio', value: '35', color: '#fff', borderColor: '#00aaff' },
        { label: 'Cloud Growth', value: '+30% Y/Y', color: '#00ff00', subtext: 'Azure strong', borderColor: '#00ff00' },
        { label: 'AI Revenue', value: '$10B run-rate', color: '#00ff00', subtext: 'Growing fast', borderColor: '#00ff00' },
        { label: 'CapEx 2025', value: '$80B', color: '#ffaa00', subtext: '+45% Y/Y', borderColor: '#ffaa00' },
        { label: 'OpenAI Edge', value: 'Exclusive', color: '#00ff00', subtext: 'GPT-5 access', borderColor: '#00ff00' }
      ],
      keyMetrics: [
        'Azure growth accelerating: +31% Y/Y, AI workloads now 12% of cloud revenue',
        'OpenAI partnership: Exclusive access to GPT-5, revenue share from ChatGPT',
        'CapEx ramping: $80B for 2025, majority for AI datacenter buildout',
        'Copilot adoption: 1M+ paying enterprise seats, $30/user/month',
        'Watch: OpenAI exclusivity (competitors catching up), CapEx efficiency'
      ],
      revenueHistory: [
        { quarter: 'Q1 23', cloud: 22.3, productivity: 17.5 },
        { quarter: 'Q2 23', cloud: 24.3, productivity: 18.6 },
        { quarter: 'Q3 23', cloud: 26.7, productivity: 19.6 },
        { quarter: 'Q4 23', cloud: 28.5, productivity: 18.6 },
        { quarter: 'Q1 24', cloud: 31.8, productivity: 19.2 },
        { quarter: 'Q2 24', cloud: 33.7, productivity: 20.3 },
        { quarter: 'Q3 24', cloud: 35.1, productivity: 20.8 }
      ],
      catalysts: [
        'GPT-5 launch impact on Azure demand',
        'Copilot penetration rates in enterprise',
        'AI CapEx ROI visibility',
        'Competitive response from Google, Amazon'
      ]
    }
  };

  return (
    <Card>
      <CardTitle>🔍 Company Deep Dives: Detailed Metrics</CardTitle>

      <CompanyGrid>
        {Object.entries(companies).map(([ticker, company]) => (
          <CompanyCard key={ticker} expanded={expanded[ticker]}>
            <CompanyHeader
              expanded={expanded[ticker]}
              onClick={() => toggleExpand(ticker)}
            >
              <CompanyInfo>
                <Ticker>{ticker}</Ticker>
                <CompanyName>{company.name}</CompanyName>
                <QuickMetrics>
                  <QuickMetric>
                    <span>Price:</span>
                    {livePrices[ticker] ? `$${livePrices[ticker].price.toFixed(2)}` : (loading ? 'Loading...' : company.quickMetrics.price)}
                  </QuickMetric>
                  <QuickMetric>
                    <span>Change:</span>
                    {livePrices[ticker] ? `${livePrices[ticker].change >= 0 ? '+' : ''}${livePrices[ticker].change.toFixed(2)}%` : (loading ? 'Loading...' : company.quickMetrics.ytd)}
                  </QuickMetric>
                  <QuickMetric><span>Position:</span>{company.quickMetrics.allocation}</QuickMetric>
                </QuickMetrics>
              </CompanyInfo>
              <ExpandIcon expanded={expanded[ticker]}>▼</ExpandIcon>
            </CompanyHeader>

            <CompanyDetails expanded={expanded[ticker]}>
              <DetailsContent>
                <Section>
                  <SectionTitle>Key Fundamentals</SectionTitle>
                  <MetricsGrid>
                    {company.fundamentals.map((metric, idx) => (
                      <MetricBox key={idx} color={metric.borderColor}>
                        <MetricLabel>{metric.label}</MetricLabel>
                        <MetricValue color={metric.color}>{metric.value}</MetricValue>
                        {metric.subtext && <MetricSubtext>{metric.subtext}</MetricSubtext>}
                      </MetricBox>
                    ))}
                  </MetricsGrid>
                </Section>

                <Section>
                  <SectionTitle>Revenue Trends ($B)</SectionTitle>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={company.revenueHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="quarter" stroke="#888" tick={{ fill: '#888', fontSize: 11 }} />
                      <YAxis stroke="#888" tick={{ fill: '#888', fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px' }}
                        labelStyle={{ color: '#ff6b00' }}
                      />
                      <Line
                        type="monotone"
                        dataKey={Object.keys(company.revenueHistory[0])[1]}
                        stroke="#00ff00"
                        strokeWidth={2}
                        dot={{ fill: '#00ff00', r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey={Object.keys(company.revenueHistory[0])[2]}
                        stroke="#00aaff"
                        strokeWidth={2}
                        dot={{ fill: '#00aaff', r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Section>

                <Section>
                  <SectionTitle>Key Insights & Monitoring</SectionTitle>
                  <BulletPoints>
                    {company.keyMetrics.map((metric, idx) => (
                      <li key={idx}>{metric}</li>
                    ))}
                  </BulletPoints>
                </Section>

                <Section>
                  <SectionTitle>Upcoming Catalysts</SectionTitle>
                  <BulletPoints>
                    {company.catalysts.map((catalyst, idx) => (
                      <li key={idx}>{catalyst}</li>
                    ))}
                  </BulletPoints>
                </Section>
              </DetailsContent>
            </CompanyDetails>
          </CompanyCard>
        ))}
      </CompanyGrid>
    </Card>
  );
};

export default CompanyDeepDives;
