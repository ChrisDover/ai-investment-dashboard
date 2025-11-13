import React, { useState } from 'react';
import styled from 'styled-components';

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

const AlertsSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
`;

const SummaryBox = styled.div`
  background: #0a0a0a;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid ${props => props.color};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #1a1a1a;
    transform: translateY(-2px);
  }
`;

const SummaryCount = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.color};
  margin-bottom: 5px;
`;

const SummaryLabel = styled.div`
  font-size: 0.85rem;
  color: #888;
  text-transform: uppercase;
`;

const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AlertItem = styled.div`
  background: ${props =>
    props.severity === 'critical' ? 'rgba(255, 0, 0, 0.1)' :
    props.severity === 'warning' ? 'rgba(255, 170, 0, 0.1)' :
    'rgba(0, 255, 0, 0.1)'
  };
  border-left: 4px solid ${props =>
    props.severity === 'critical' ? '#ff0000' :
    props.severity === 'warning' ? '#ffaa00' :
    '#00ff00'
  };
  padding: 15px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateX(5px);
  }
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;
`;

const AlertTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props =>
    props.severity === 'critical' ? '#ff0000' :
    props.severity === 'warning' ? '#ffaa00' :
    '#00ff00'
  };
`;

const AlertTimestamp = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const AlertMessage = styled.div`
  color: #ccc;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const AlertAction = styled.div`
  color: #ff6b00;
  font-size: 0.9rem;
  font-weight: 700;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '→';
    font-size: 1.2rem;
  }
`;

const AlertTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Tag = styled.span`
  background: #1a1a1a;
  color: #888;
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 0.75rem;
  border: 1px solid #333;
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

const AlertsPanel = () => {
  const [filter, setFilter] = useState('all');

  const alerts = [
    {
      id: 1,
      severity: 'opportunity',
      title: 'TSMC 2nm Yields Exceeding Expectations',
      message: 'TSMC N2 process showing ~75% yield rates in risk production, beating N3 ramp by 2 months. This de-risks 2025 Apple/Nvidia adoption.',
      action: 'Consider adding TSM on pullbacks below $180. Target allocation: 8-10%',
      timestamp: '2 hours ago',
      tags: ['TSM', 'Process Node', 'Bullish'],
      category: 'chips'
    },
    {
      id: 2,
      severity: 'warning',
      title: 'Samsung 2nm Delayed to 2026',
      message: 'Samsung pushed 2nm GAA mass production from late 2025 to 2026 due to yield issues. This strengthens TSMC monopoly but creates supply risk if China tensions escalate.',
      action: 'Monitor TSMC capacity allocation. Hedge with Intel 18A progress',
      timestamp: '5 hours ago',
      tags: ['Samsung', 'TSMC', 'Geopolitical Risk'],
      category: 'chips'
    },
    {
      id: 3,
      severity: 'opportunity',
      title: 'Meta CapEx Guidance Raised +15% for 2025',
      message: 'META increased 2025 CapEx guidance to $42B (vs $36B prior), citing AI infrastructure buildout. Llama 4 training cluster expansion ahead of schedule.',
      action: 'Bullish for datacenter infrastructure: VRT, ETN, EQIX. Add exposure.',
      timestamp: '1 day ago',
      tags: ['META', 'CapEx', 'Infrastructure'],
      category: 'capex'
    },
    {
      id: 4,
      severity: 'critical',
      title: 'AMD MI300 Design Win at Major Hyperscaler',
      message: 'Reports suggest AMD secured significant MI300X deployment at GOOGL for inference workloads. First major design win challenging Nvidia dominance.',
      action: 'Watch NVDA margins closely. If AMD takes >15% share, reassess NVDA allocation.',
      timestamp: '1 day ago',
      tags: ['AMD', 'NVDA', 'Competition'],
      category: 'competition'
    },
    {
      id: 5,
      severity: 'opportunity',
      title: 'Scaling Laws Holding: GPT-5 Benchmarks Leaked',
      message: 'Unconfirmed benchmarks suggest OpenAI GPT-5 showing 40% improvement over GPT-4 on MMLU, confirming scaling thesis. Expected Q3 2025 launch.',
      action: 'Validates MSFT position. Bullish for compute demand (NVDA, AMD, TSM).',
      timestamp: '2 days ago',
      tags: ['OpenAI', 'Scaling', 'MSFT'],
      category: 'models'
    },
    {
      id: 6,
      severity: 'warning',
      title: 'Natural Gas Prices Spiking +20% M/M',
      message: 'Winter demand + datacenter consumption pushing nat gas prices up. Could impact datacenter economics if sustained above $4.50/MMBtu.',
      action: 'Monitor energy costs. If sustained, rotate from EQT to renewable infrastructure.',
      timestamp: '2 days ago',
      tags: ['Energy', 'EQT', 'Risk'],
      category: 'infrastructure'
    },
    {
      id: 7,
      severity: 'opportunity',
      title: 'Blackwell GB200 Shipments Accelerating',
      message: 'NVDA Blackwell systems shipping ahead of schedule to major hyperscalers. Initial reviews show 2.5x performance over H100 in training workloads.',
      action: 'Confirms NVDA moat. Maintain 25% allocation. Watch for gross margin guidance.',
      timestamp: '3 days ago',
      tags: ['NVDA', 'Blackwell', 'Product Cycle'],
      category: 'chips'
    },
    {
      id: 8,
      severity: 'warning',
      title: 'China Export Controls Tightening',
      message: 'US considering further restrictions on AI chip exports to China, including H20 variants. Could impact NVDA revenue (15-20% China exposure).',
      action: 'Monitor Q4 earnings. If China revenue drops >25%, reduce NVDA to 20%.',
      timestamp: '4 days ago',
      tags: ['Geopolitical', 'NVDA', 'Policy Risk'],
      category: 'geopolitical'
    },
    {
      id: 9,
      severity: 'opportunity',
      title: 'HBM Supply Shortage Intensifying',
      message: 'SK Hynix HBM3E allocation fully booked through mid-2025. Micron ramping HBM3E production to capture share. Pricing power increasing.',
      action: 'Add SK Hynix exposure via ETF. MU attractive below $95.',
      timestamp: '5 days ago',
      tags: ['Memory', 'SK Hynix', 'MU'],
      category: 'chips'
    }
  ];

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter);

  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const warningCount = alerts.filter(a => a.severity === 'warning').length;
  const opportunityCount = alerts.filter(a => a.severity === 'opportunity').length;

  return (
    <Card>
      <CardTitle>⚠ Alert System: Divergence Detection</CardTitle>

      <AlertsSummary>
        <SummaryBox color="#ff0000" onClick={() => setFilter('critical')}>
          <SummaryCount color="#ff0000">{criticalCount}</SummaryCount>
          <SummaryLabel>Critical Alerts</SummaryLabel>
        </SummaryBox>

        <SummaryBox color="#ffaa00" onClick={() => setFilter('warning')}>
          <SummaryCount color="#ffaa00">{warningCount}</SummaryCount>
          <SummaryLabel>Warnings</SummaryLabel>
        </SummaryBox>

        <SummaryBox color="#00ff00" onClick={() => setFilter('opportunity')}>
          <SummaryCount color="#00ff00">{opportunityCount}</SummaryCount>
          <SummaryLabel>Opportunities</SummaryLabel>
        </SummaryBox>
      </AlertsSummary>

      <FilterButtons>
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          All Alerts
        </FilterButton>
        <FilterButton active={filter === 'critical'} onClick={() => setFilter('critical')}>
          Critical
        </FilterButton>
        <FilterButton active={filter === 'warning'} onClick={() => setFilter('warning')}>
          Warnings
        </FilterButton>
        <FilterButton active={filter === 'opportunity'} onClick={() => setFilter('opportunity')}>
          Opportunities
        </FilterButton>
      </FilterButtons>

      <AlertsList>
        {filteredAlerts.map(alert => (
          <AlertItem key={alert.id} severity={alert.severity}>
            <AlertHeader>
              <AlertTitle severity={alert.severity}>{alert.title}</AlertTitle>
              <AlertTimestamp>{alert.timestamp}</AlertTimestamp>
            </AlertHeader>
            <AlertMessage>{alert.message}</AlertMessage>
            <AlertAction>{alert.action}</AlertAction>
            <AlertTags>
              {alert.tags.map((tag, idx) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </AlertTags>
          </AlertItem>
        ))}
      </AlertsList>
    </Card>
  );
};

export default AlertsPanel;
