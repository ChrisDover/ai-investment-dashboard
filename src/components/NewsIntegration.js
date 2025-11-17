import React, { useState } from 'react';
import styled from 'styled-components';
import { getExampleTimestamp, getTodayFormatted } from '../utils/dateUtils';

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

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? '#ff6b00' : '#0a0a0a'};
  color: ${props => props.active ? '#000' : '#888'};
  border: 1px solid ${props => props.active ? '#ff6b00' : '#333'};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.85rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#ff8c33' : '#1a1a1a'};
    border-color: #ff6b00;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 15px;
`;

const NewsItem = styled.div`
  background: #0a0a0a;
  padding: 20px;
  border-radius: 6px;
  border-left: 4px solid ${props =>
    props.impact === 'high' ? '#ff0000' :
    props.impact === 'medium' ? '#ffaa00' : '#00aaff'
  };
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #1a1a1a;
    transform: translateX(5px);
  }
`;

const NewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
  gap: 10px;
`;

const NewsSource = styled.div`
  font-size: 0.75rem;
  color: #ff6b00;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const NewsTimestamp = styled.div`
  font-size: 0.75rem;
  color: #666;
  white-space: nowrap;
`;

const NewsTitle = styled.h3`
  color: #fff;
  font-size: 1.05rem;
  margin: 0 0 10px 0;
  line-height: 1.4;
`;

const NewsSummary = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 12px 0;
`;

const NewsTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const Tag = styled.span`
  background: #1a1a1a;
  color: ${props => props.color || '#888'};
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 0.75rem;
  border: 1px solid ${props => props.color || '#333'};
`;

const ImpactBadge = styled.div`
  background: ${props =>
    props.impact === 'high' ? 'rgba(255, 0, 0, 0.2)' :
    props.impact === 'medium' ? 'rgba(255, 170, 0, 0.2)' : 'rgba(0, 170, 255, 0.2)'
  };
  color: ${props =>
    props.impact === 'high' ? '#ff0000' :
    props.impact === 'medium' ? '#ffaa00' : '#00aaff'
  };
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid ${props =>
    props.impact === 'high' ? '#ff0000' :
    props.impact === 'medium' ? '#ffaa00' : '#00aaff'
  };
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

const NewsIntegration = () => {
  const [filter, setFilter] = useState('all');

  const newsItems = [
    {
      id: 1,
      source: 'SemiAnalysis',
      title: 'TSMC N2 Yields Ahead of Schedule, Apple A19 Design Tape-Out Complete',
      summary: 'TSMC 2nm GAA process showing 75-80% yields in risk production, 5-8% ahead of N3 ramp at same stage. Apple A19 for iPhone 17 Pro has taped out, with production starting Q2 2025. Nvidia Blackwell successor (B200 Ultra) also planned for N2.',
      timestamp: getExampleTimestamp(3),
      category: 'research',
      impact: 'high',
      tags: ['TSMC', 'Process Node', 'Apple', 'Nvidia'],
      tickers: ['TSM', 'AAPL', 'NVDA']
    },
    {
      id: 2,
      source: 'Earnings Call',
      title: 'Nvidia Q4 2024: Blackwell Demand "Insane", Margins Holding at 75%+',
      summary: 'Jensen Huang: "Blackwell demand is insane... we have more demand than we can supply for the next 12 months." Gross margins at 75.3% despite competitive pressure. Guidance: Q1 2025 revenue $28-29B (vs consensus $27B).',
      timestamp: getExampleTimestamp(5),
      category: 'earnings',
      impact: 'high',
      tags: ['NVDA', 'Earnings', 'Blackwell', 'Revenue Beat'],
      tickers: ['NVDA']
    },
    {
      id: 3,
      source: 'ArXiv',
      title: 'New Paper: "Scaling Laws Hold to 10^26 FLOPs" - DeepMind',
      summary: 'DeepMind researchers demonstrate scaling laws continue to hold with no saturation up to 10^26 FLOPs (10x current GPT-4 scale). Suggests room for 3-4 more model generations before hitting data walls. Validates thesis on continued capability gains.',
      timestamp: getExampleTimestamp(8),
      category: 'research',
      impact: 'high',
      tags: ['Scaling Laws', 'DeepMind', 'GOOGL', 'AGI Progress'],
      tickers: ['GOOGL']
    },
    {
      id: 4,
      source: 'Bloomberg',
      title: 'Microsoft to Spend $80B on AI Datacenters in 2025',
      summary: 'Microsoft CFO confirms $80B CapEx for fiscal 2025, up from $55B in 2024. Majority earmarked for AI datacenter buildout globally. 40+ new datacenter regions planned. Bullish for Nvidia, Vertiv, datacenter REITs.',
      timestamp: getExampleTimestamp(12),
      category: 'news',
      impact: 'high',
      tags: ['MSFT', 'CapEx', 'Datacenter', 'Infrastructure'],
      tickers: ['MSFT', 'NVDA', 'VRT', 'EQIX']
    },
    {
      id: 5,
      source: 'Dwarkesh Podcast',
      title: 'Leopold Aschenbrenner: "AGI Timeline Moved Up to 2027"',
      summary: 'Former OpenAI researcher Leopold updates AGI timeline from 2029 to 2027 based on faster-than-expected scaling progress. Cites GPT-5 internal benchmarks and compute buildout acceleration. Implications: CapEx surge continues, competitive pressure intensifies.',
      timestamp: getExampleTimestamp(24),
      category: 'podcast',
      impact: 'high',
      tags: ['AGI', 'Timeline', 'OpenAI', 'Leopold'],
      tickers: ['MSFT', 'GOOGL']
    },
    {
      id: 6,
      source: 'Earnings Call',
      title: 'AMD Q4 2024: MI300 Ramp Slower Than Expected, But Design Wins Growing',
      summary: 'AMD reports $400M MI300 revenue in Q4 (below $600M whisper). However, announced 3 new hyperscaler design wins for 2025 deployment. Lisa Su: "Pipeline for 2025 is $4.5B, ahead of plan." Stock down 5% after hours.',
      timestamp: getExampleTimestamp(24),
      category: 'earnings',
      impact: 'medium',
      tags: ['AMD', 'MI300', 'Revenue Miss', 'Design Wins'],
      tickers: ['AMD']
    },
    {
      id: 7,
      source: 'SemiAnalysis',
      title: 'HBM Market Dynamics: SK Hynix Pricing Power Increasing',
      summary: 'Analysis shows SK Hynix HBM3E ASPs up 35% Y/Y due to supply constraints. Micron ramping HBM3E but yield issues delaying volume production to Q3 2025. Samsung losing share (15% → 10%). Bullish for SK Hynix margins.',
      timestamp: getExampleTimestamp(24),
      category: 'research',
      impact: 'medium',
      tags: ['Memory', 'SK Hynix', 'Micron', 'HBM'],
      tickers: ['MU']
    },
    {
      id: 8,
      source: 'Reuters',
      title: 'US Tightens AI Chip Export Controls, H20 Variants Now Restricted',
      summary: 'Biden administration expands China export controls to include Nvidia H20 and other "workaround" chips. Effective immediately. Nvidia China revenue (20% of total) at risk. May force further product redesigns or revenue hit.',
      timestamp: getExampleTimestamp(48),
      category: 'news',
      impact: 'high',
      tags: ['Geopolitical', 'NVDA', 'China', 'Export Controls'],
      tickers: ['NVDA']
    },
    {
      id: 9,
      source: 'ArXiv',
      title: 'Breakthrough: "Mixture of Experts at 100T Parameters" Shows 10x Efficiency Gains',
      summary: 'Research from Meta demonstrates MoE architecture scaling to 100T parameters with 10x training efficiency vs dense models. Could extend runway before hitting compute/data walls. Implications: Models get bigger/cheaper faster.',
      timestamp: getExampleTimestamp(48),
      category: 'research',
      impact: 'medium',
      tags: ['Architecture', 'MoE', 'Meta', 'Efficiency'],
      tickers: ['META', 'NVDA']
    },
    {
      id: 10,
      source: 'Earnings Call',
      title: 'Google Q4 2024: Cloud Revenue +30% Y/Y, AI Driving Growth',
      summary: 'Google Cloud revenue $11.4B (+30% Y/Y), beating estimates. Sundar Pichai: "AI workloads now 15% of cloud revenue, fastest-growing segment." Gemini Pro adoption accelerating. CapEx guidance: $75B for 2025.',
      timestamp: getExampleTimestamp(72),
      category: 'earnings',
      impact: 'medium',
      tags: ['GOOGL', 'Cloud', 'Revenue Beat', 'AI Growth'],
      tickers: ['GOOGL']
    },
    {
      id: 11,
      source: 'SemiAnalysis',
      title: 'Intel 18A Node Showing Progress: Panther Lake Test Chips Functional',
      summary: 'Intel Panther Lake (18A process) test chips now functional and meeting targets. First external foundry customer (unnamed) placing orders for tape-out in Q2 2025. Still high execution risk but de-risks Intel turnaround thesis.',
      timestamp: getExampleTimestamp(72),
      category: 'research',
      impact: 'low',
      tags: ['Intel', '18A', 'Process Node', 'Foundry'],
      tickers: ['INTC']
    },
    {
      id: 12,
      source: 'WSJ',
      title: 'Natural Gas Prices Surge 25% as Datacenter Demand Spikes',
      summary: 'Nat gas futures hit $4.80/MMBtu (up 25% M/M) as datacenter consumption grows 40% Y/Y. Hyperscalers scrambling for power contracts. Could impact datacenter economics if sustained above $5. Watch EQT, energy infrastructure plays.',
      timestamp: getExampleTimestamp(96),
      category: 'news',
      impact: 'medium',
      tags: ['Energy', 'Nat Gas', 'Datacenter Economics'],
      tickers: ['EQT']
    }
  ];

  const filteredNews = filter === 'all' ? newsItems : newsItems.filter(item => item.category === filter);

  return (
    <Card>
      <CardTitle>📰 News & Research Feed</CardTitle>

      <DemoNotice>
        ⚠️ Demo Data - Displaying example news and research items with current timestamps ({getTodayFormatted()}). Live news integration coming soon.
      </DemoNotice>

      <FilterButtons>
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          All Sources
        </FilterButton>
        <FilterButton active={filter === 'research'} onClick={() => setFilter('research')}>
          Research (SemiAnalysis, ArXiv)
        </FilterButton>
        <FilterButton active={filter === 'earnings'} onClick={() => setFilter('earnings')}>
          Earnings Calls
        </FilterButton>
        <FilterButton active={filter === 'news'} onClick={() => setFilter('news')}>
          News (Bloomberg, Reuters)
        </FilterButton>
        <FilterButton active={filter === 'podcast'} onClick={() => setFilter('podcast')}>
          Podcasts
        </FilterButton>
      </FilterButtons>

      <NewsGrid>
        {filteredNews.map(item => (
          <NewsItem key={item.id} impact={item.impact}>
            <NewsHeader>
              <NewsSource>{item.source}</NewsSource>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <ImpactBadge impact={item.impact}>{item.impact} impact</ImpactBadge>
                <NewsTimestamp>{item.timestamp}</NewsTimestamp>
              </div>
            </NewsHeader>
            <NewsTitle>{item.title}</NewsTitle>
            <NewsSummary>{item.summary}</NewsSummary>
            <NewsTags>
              {item.tickers.map((ticker, idx) => (
                <Tag key={idx} color="#ff6b00">{ticker}</Tag>
              ))}
              {item.tags.slice(0, 3).map((tag, idx) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </NewsTags>
          </NewsItem>
        ))}
      </NewsGrid>
    </Card>
  );
};

export default NewsIntegration;
