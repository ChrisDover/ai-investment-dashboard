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

const Timeline = styled.div`
  position: relative;
  padding-left: 40px;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #00ff00, #ff6b00, #ff0000);
  }
`;

const MilestoneItem = styled.div`
  position: relative;
  margin-bottom: 25px;
  background: #0a0a0a;
  padding: 15px 20px;
  border-radius: 6px;
  border-left: 3px solid ${props => props.status === 'completed' ? '#00ff00' :
                                       props.status === 'in-progress' ? '#ffaa00' :
                                       props.status === 'upcoming' ? '#ff6b00' : '#ff0000'};

  &::before {
    content: '';
    position: absolute;
    left: -43px;
    top: 20px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.status === 'completed' ? '#00ff00' :
                           props.status === 'in-progress' ? '#ffaa00' :
                           props.status === 'upcoming' ? '#ff6b00' : '#333'};
    border: 2px solid #1a1a1a;
  }
`;

const MilestoneHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;
`;

const MilestoneTitle = styled.h3`
  color: #fff;
  font-size: 1.1rem;
  margin: 0;
  flex: 1;
`;

const MilestoneDate = styled.div`
  color: #888;
  font-size: 0.9rem;
  font-weight: 700;
`;

const MilestoneDescription = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  margin: 10px 0 0 0;
  line-height: 1.5;
`;

const MilestoneTags = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #1a1a1a;
  color: ${props => props.color || '#888'};
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 0.75rem;
  border: 1px solid ${props => props.color || '#333'};
`;

const StatusBadge = styled.span`
  background: ${props => props.status === 'completed' ? '#00ff00' :
                         props.status === 'in-progress' ? '#ffaa00' :
                         props.status === 'upcoming' ? '#ff6b00' : '#666'};
  color: #000;
  padding: 4px 12px;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const KeyMilestones = () => {
  const [filter, setFilter] = useState('all');

  const milestones = [
    {
      id: 1,
      title: 'TSMC 5nm Mass Production',
      date: 'Q2 2020',
      status: 'completed',
      category: 'foundry',
      description: 'TSMC achieves 2x transistor density from 7nm to 5nm, establishing leadership in advanced nodes.',
      tags: ['TSMC', 'Process Node'],
      impact: 'critical'
    },
    {
      id: 2,
      title: 'Nvidia A100 Launch',
      date: 'Q2 2020',
      status: 'completed',
      category: 'accelerators',
      description: 'Ampere architecture with HBM2e marks beginning of AI datacenter GPU dominance.',
      tags: ['Nvidia', 'AI Hardware'],
      impact: 'critical'
    },
    {
      id: 3,
      title: 'TSMC 3nm Production Ramp',
      date: 'Q4 2023',
      status: 'completed',
      category: 'foundry',
      description: 'TSMC begins mass production of 3nm chips (N3), achieving 2x transistor density improvements over 5nm.',
      tags: ['TSMC', 'Process Node'],
      impact: 'critical'
    },
    {
      id: 4,
      title: 'Nvidia H100 Datacenter Deployment',
      date: 'Q2 2023',
      status: 'completed',
      category: 'accelerators',
      description: 'Hopper H100 with HBM3 delivers 4-9x performance improvements, capturing 85%+ datacenter GPU share.',
      tags: ['Nvidia', 'Hardware', 'Datacenter'],
      impact: 'critical'
    },
    {
      id: 5,
      title: 'SK Hynix HBM3E Production',
      date: 'Q3 2023',
      status: 'completed',
      category: 'memory',
      description: 'HBM3E production begins with 3x bandwidth advantage over DDR5, critical for AI inference.',
      tags: ['Memory', 'SK Hynix', 'HBM'],
      impact: 'critical'
    },
    {
      id: 6,
      title: 'US CHIPS Act Funding',
      date: 'Q1 2024',
      status: 'completed',
      category: 'geopolitical',
      description: 'US deploys $52B in subsidies, boosting domestic fab construction (TSMC Arizona, Intel Ohio).',
      tags: ['Policy', 'US-China', 'Subsidies'],
      impact: 'high'
    },
    {
      id: 7,
      title: 'TSMC 2nm (N2) Risk Production',
      date: 'Q4 2024',
      status: 'completed',
      category: 'foundry',
      description: 'TSMC begins risk production of 2nm GAA process with backside power delivery.',
      tags: ['TSMC', 'Process Node', 'GAA'],
      impact: 'critical'
    },
    {
      id: 8,
      title: 'Nvidia Blackwell GB200 Launch',
      date: 'Q1 2025',
      status: 'in-progress',
      category: 'accelerators',
      description: 'Blackwell GB200A with 2.5x performance over Hopper. NVSwitch enables 4,000+ GPU clusters.',
      tags: ['Nvidia', 'Next-Gen', 'Critical'],
      impact: 'critical'
    },
    {
      id: 9,
      title: 'TSMC 2nm Mass Production',
      date: 'Q2 2025',
      status: 'upcoming',
      category: 'foundry',
      description: 'TSMC ramps 2nm to mass production. Expected to power Nvidia, AMD, Apple next-gen chips.',
      tags: ['TSMC', 'Critical Milestone'],
      impact: 'critical'
    },
    {
      id: 10,
      title: 'AMD MI350 Launch',
      date: 'Q4 2025',
      status: 'upcoming',
      category: 'accelerators',
      description: 'AMD MI350 on TSMC 3nm targets 40%+ latency edge over Hopper in inference workloads.',
      tags: ['AMD', 'Competition'],
      impact: 'high'
    },
    {
      id: 11,
      title: 'CoWoS Capacity Expansion',
      date: 'Q1 2026',
      status: 'upcoming',
      category: 'packaging',
      description: 'TSMC doubles CoWoS advanced packaging capacity, easing supply bottlenecks for AI chips.',
      tags: ['TSMC', 'Packaging', 'Supply Chain'],
      impact: 'high'
    },
    {
      id: 12,
      title: 'HBM4 Mass Production',
      date: 'Q2 2026',
      status: 'upcoming',
      category: 'memory',
      description: 'SK Hynix/Micron begin HBM4 production with 2x bandwidth vs HBM3E for LLM KV cache scaling.',
      tags: ['Memory', 'SK Hynix', 'Micron'],
      impact: 'critical'
    },
    {
      id: 13,
      title: '1GW Datacenter Deployments',
      date: 'Q4 2026',
      status: 'upcoming',
      category: 'infrastructure',
      description: 'First gigawatt-scale AI datacenters come online with natural gas and off-grid power solutions.',
      tags: ['Energy', 'Datacenter', 'Infrastructure'],
      impact: 'critical'
    },
    {
      id: 14,
      title: 'Semiconductor Revenue >$1T',
      date: 'Q4 2029',
      status: 'upcoming',
      category: 'economic',
      description: 'Global semiconductor revenues cross $1T milestone driven by AI compute demand.',
      tags: ['Economics', 'Revenue', 'Industry'],
      impact: 'critical'
    },
    {
      id: 15,
      title: 'Global AI CapEx $2T Annually',
      date: 'Q4 2029',
      status: 'upcoming',
      category: 'economic',
      description: 'Annual AI infrastructure CapEx reaches $2T, with 60-70% allocated to semiconductors.',
      tags: ['CapEx', 'Infrastructure', 'Chips'],
      impact: 'critical'
    },
    {
      id: 16,
      title: 'TSMC 1.4nm (A14) Production',
      date: 'Q1 2028',
      status: 'upcoming',
      category: 'foundry',
      description: 'TSMC advances to A14 node (1.4nm equivalent), continuing Moore\'s Law trajectory for AI chips.',
      tags: ['TSMC', 'Process Node'],
      impact: 'high'
    },
    {
      id: 17,
      title: 'China Semiconductor Self-Sufficiency',
      date: 'Q2 2030',
      status: 'upcoming',
      category: 'geopolitical',
      description: 'Risk scenario: China achieves 30%+ global fab capacity via SMIC 7nm volumes despite EUV restrictions.',
      tags: ['China', 'SMIC', 'Geopolitical Risk'],
      impact: 'critical'
    }
  ];

  const filteredMilestones = filter === 'all'
    ? milestones
    : milestones.filter(m => m.category === filter);

  return (
    <Card>
      <CardTitle>Key Milestones: Semiconductor Supercycle Roadmap</CardTitle>

      <FilterButtons>
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          All Milestones
        </FilterButton>
        <FilterButton active={filter === 'foundry'} onClick={() => setFilter('foundry')}>
          Foundry & Process Nodes
        </FilterButton>
        <FilterButton active={filter === 'accelerators'} onClick={() => setFilter('accelerators')}>
          AI Accelerators
        </FilterButton>
        <FilterButton active={filter === 'memory'} onClick={() => setFilter('memory')}>
          Memory & HBM
        </FilterButton>
        <FilterButton active={filter === 'infrastructure'} onClick={() => setFilter('infrastructure')}>
          Infrastructure
        </FilterButton>
        <FilterButton active={filter === 'economic'} onClick={() => setFilter('economic')}>
          Economic
        </FilterButton>
        <FilterButton active={filter === 'geopolitical'} onClick={() => setFilter('geopolitical')}>
          Geopolitical
        </FilterButton>
      </FilterButtons>

      <Timeline>
        {filteredMilestones.map(milestone => (
          <MilestoneItem key={milestone.id} status={milestone.status}>
            <MilestoneHeader>
              <MilestoneTitle>{milestone.title}</MilestoneTitle>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <MilestoneDate>{milestone.date}</MilestoneDate>
                <StatusBadge status={milestone.status}>{milestone.status}</StatusBadge>
              </div>
            </MilestoneHeader>
            <MilestoneDescription>{milestone.description}</MilestoneDescription>
            <MilestoneTags>
              {milestone.tags.map((tag, idx) => (
                <Tag key={idx} color={milestone.impact === 'critical' ? '#ff6b00' : '#00aaff'}>
                  {tag}
                </Tag>
              ))}
            </MilestoneTags>
          </MilestoneItem>
        ))}
      </Timeline>
    </Card>
  );
};

export default KeyMilestones;
