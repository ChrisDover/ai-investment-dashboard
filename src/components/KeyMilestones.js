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
      title: 'GPT-4 Launch',
      date: 'Q1 2023',
      status: 'completed',
      category: 'models',
      description: 'OpenAI releases GPT-4, demonstrating significant improvements in reasoning and multimodal capabilities.',
      tags: ['Foundation Model', 'OpenAI'],
      impact: 'high'
    },
    {
      id: 2,
      title: 'TSMC 3nm Production Ramp',
      date: 'Q4 2023',
      status: 'completed',
      category: 'chips',
      description: 'TSMC begins mass production of 3nm chips (N3), achieving 2x transistor density improvements.',
      tags: ['TSMC', 'Process Node'],
      impact: 'critical'
    },
    {
      id: 3,
      title: 'Nvidia H100 Datacenter Deployment',
      date: 'Q2 2023',
      status: 'completed',
      category: 'infrastructure',
      description: 'Major hyperscalers deploy H100 GPUs at scale, enabling 4-9x performance improvements over A100.',
      tags: ['Nvidia', 'Hardware', 'Datacenter'],
      impact: 'critical'
    },
    {
      id: 4,
      title: 'Claude 3 Opus Release',
      date: 'Q1 2024',
      status: 'completed',
      category: 'models',
      description: 'Anthropic launches Claude 3 family, with Opus matching/exceeding GPT-4 on key benchmarks.',
      tags: ['Foundation Model', 'Anthropic'],
      impact: 'high'
    },
    {
      id: 5,
      title: 'Nvidia Blackwell B200 Launch',
      date: 'Q1 2025',
      status: 'in-progress',
      category: 'chips',
      description: 'Blackwell architecture promises 2.5x performance improvement over Hopper. GB200 systems in production.',
      tags: ['Nvidia', 'Next-Gen'],
      impact: 'critical'
    },
    {
      id: 6,
      title: 'TSMC 2nm (N2) Risk Production',
      date: 'Q4 2024',
      status: 'completed',
      category: 'chips',
      description: 'TSMC begins risk production of 2nm GAA process with backside power delivery.',
      tags: ['TSMC', 'Process Node', 'GAA'],
      impact: 'critical'
    },
    {
      id: 7,
      title: 'TSMC 2nm Mass Production',
      date: 'Q2 2025',
      status: 'upcoming',
      category: 'chips',
      description: 'TSMC ramps 2nm to mass production. Expected to power next-gen AI accelerators (Nvidia, AMD, Apple).',
      tags: ['TSMC', 'Critical Milestone'],
      impact: 'critical'
    },
    {
      id: 8,
      title: 'GPT-5 / Next-Gen Foundation Models',
      date: 'Q3 2025',
      status: 'upcoming',
      category: 'models',
      description: 'Expected release of next-generation foundation models with significantly enhanced reasoning and agentic capabilities.',
      tags: ['Foundation Model', 'OpenAI', 'Scaling'],
      impact: 'critical'
    },
    {
      id: 9,
      title: 'AMD MI350 Launch',
      date: 'Q4 2025',
      status: 'upcoming',
      category: 'chips',
      description: 'AMD MI350 on TSMC 3nm expected to challenge Nvidia with improved inference performance.',
      tags: ['AMD', 'Competition'],
      impact: 'high'
    },
    {
      id: 10,
      title: '1GW Datacenter Deployments',
      date: 'Q4 2026',
      status: 'upcoming',
      category: 'infrastructure',
      description: 'First gigawatt-scale AI datacenters come online, enabled by natural gas and off-grid solutions.',
      tags: ['Energy', 'Scale', 'Infrastructure'],
      impact: 'critical'
    },
    {
      id: 11,
      title: 'HBM4 Mass Production',
      date: 'Q2 2026',
      status: 'upcoming',
      category: 'chips',
      description: 'SK Hynix/Micron begin HBM4 production with 2x bandwidth improvements critical for LLM inference.',
      tags: ['Memory', 'SK Hynix', 'Micron'],
      impact: 'high'
    },
    {
      id: 12,
      title: 'Hyperscaler AI Revenue >$100B',
      date: 'Q4 2026',
      status: 'upcoming',
      category: 'economic',
      description: 'Combined AI revenues from hyperscalers (MSFT, GOOGL, AMZN) exceed $100B annually.',
      tags: ['Economics', 'Revenue'],
      impact: 'critical'
    },
    {
      id: 13,
      title: 'ARC-AGI 85% Benchmark',
      date: 'Q2 2027',
      status: 'upcoming',
      category: 'models',
      description: 'AI models achieve 85%+ on ARC-AGI benchmark, demonstrating broad generalization capabilities.',
      tags: ['Benchmark', 'AGI Progress'],
      impact: 'critical'
    },
    {
      id: 14,
      title: 'TSMC 1.4nm (A14) Production',
      date: 'Q1 2028',
      status: 'upcoming',
      category: 'chips',
      description: 'TSMC advances to A14 node (1.4nm equivalent), continuing Moore\'s Law trajectory.',
      tags: ['TSMC', 'Process Node'],
      impact: 'high'
    },
    {
      id: 15,
      title: 'Global AI CapEx >$2T Annually',
      date: 'Q4 2029',
      status: 'upcoming',
      category: 'economic',
      description: 'Annual AI infrastructure CapEx reaches $2T as projected, split 60-70% chips, 30-40% energy/facilities.',
      tags: ['CapEx', 'Infrastructure'],
      impact: 'critical'
    },
    {
      id: 16,
      title: 'Autonomous AI Researchers',
      date: 'Q2 2030',
      status: 'upcoming',
      category: 'models',
      description: 'AI systems capable of autonomous research and development across multiple domains.',
      tags: ['AGI Milestone', 'Automation'],
      impact: 'critical'
    },
    {
      id: 17,
      title: 'AGI Threshold Reached',
      date: 'Q2 2040',
      status: 'upcoming',
      category: 'models',
      description: '70% probability target: AI systems achieve human-level general intelligence across all cognitive tasks.',
      tags: ['AGI', 'Target'],
      impact: 'critical'
    }
  ];

  const filteredMilestones = filter === 'all'
    ? milestones
    : milestones.filter(m => m.category === filter);

  return (
    <Card>
      <CardTitle>Key Milestones: Critical Path to AGI</CardTitle>

      <FilterButtons>
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          All Milestones
        </FilterButton>
        <FilterButton active={filter === 'chips'} onClick={() => setFilter('chips')}>
          Chips & Semiconductors
        </FilterButton>
        <FilterButton active={filter === 'models'} onClick={() => setFilter('models')}>
          AI Models
        </FilterButton>
        <FilterButton active={filter === 'infrastructure'} onClick={() => setFilter('infrastructure')}>
          Infrastructure
        </FilterButton>
        <FilterButton active={filter === 'economic'} onClick={() => setFilter('economic')}>
          Economic
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
