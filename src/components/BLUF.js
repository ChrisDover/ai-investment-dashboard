import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  calculatePortfolioPerformance,
  START_DATE
} from '../services/marketDataService';

const BLUFContainer = styled.div`
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c33 100%);
  border: 2px solid #ff6b00;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(255, 107, 0, 0.3);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 6px;
  }

  @media (max-width: 360px) {
    padding: 12px;
  }
`;

const BLUFTitle = styled.h2`
  color: #000;
  font-size: 1.8rem;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const MarketStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
    padding-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const StatusIndicator = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.status === 'bullish' ? '#00ff00' :
                         props.status === 'neutral' ? '#ffaa00' : '#ff0000'};
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

const StatusText = styled.div`
  color: #000;
  font-size: 1.2rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const KeyTakeawaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
  width: 100%;
  max-width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 20px;
  }
`;

const TakeawayCard = styled.div`
  background: rgba(0, 0, 0, 0.9);
  padding: 20px;
  border-radius: 6px;
  border-left: 4px solid ${props =>
    props.type === 'opportunity' ? '#00ff00' :
    props.type === 'risk' ? '#ff0000' : '#ffaa00'
  };
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-wrap: break-word;

  @media (max-width: 480px) {
    padding: 15px;
  }

  @media (max-width: 360px) {
    padding: 12px;
  }
`;

const TakeawayType = styled.div`
  color: ${props =>
    props.type === 'opportunity' ? '#00ff00' :
    props.type === 'risk' ? '#ff0000' : '#ffaa00'
  };
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const TakeawayText = styled.div`
  color: #fff;
  font-size: 1rem;
  line-height: 1.5;
`;

const ActionsSection = styled.div`
  background: rgba(0, 0, 0, 0.9);
  padding: 20px;
  border-radius: 6px;
`;

const ActionsTitle = styled.h3`
  color: #ff6b00;
  font-size: 1.2rem;
  margin: 0 0 15px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ActionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: start;
  gap: 12px;
  color: #fff;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ActionIcon = styled.div`
  background: ${props =>
    props.action === 'buy' ? '#00ff00' :
    props.action === 'sell' ? '#ff0000' :
    props.action === 'hold' ? '#00aaff' : '#ffaa00'
  };
  color: #000;
  width: 60px;
  padding: 4px 8px;
  border-radius: 3px;
  font-weight: 700;
  font-size: 0.8rem;
  text-align: center;
  text-transform: uppercase;
  flex-shrink: 0;
`;

const Timestamp = styled.div`
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.85rem;
  margin-top: 20px;
  text-align: right;
  font-weight: 600;
`;

const BLUF = () => {
  const currentDate = new Date();
  const marketStatus = 'bullish'; // Could be 'bullish', 'neutral', 'bearish'
  const [portfolioReturn, setPortfolioReturn] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const portfolioTimeSeries = await calculatePortfolioPerformance(START_DATE);
        if (portfolioTimeSeries.length > 0) {
          const latestReturn = portfolioTimeSeries[portfolioTimeSeries.length - 1].return;
          setPortfolioReturn(latestReturn);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching performance for BLUF:', error);
        setLoading(false);
      }
    };

    fetchPerformance();

    // Refresh every 15 minutes
    const interval = setInterval(fetchPerformance, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const expectedReturn = 30.0; // Expected CAGR
  const delta = portfolioReturn - expectedReturn;

  const takeaways = [
    {
      type: 'opportunity',
      text: 'TSMC 2nm yields beating expectations by 8%. Strong catalyst for TSM position and validates AI infrastructure thesis.'
    },
    {
      type: 'opportunity',
      text: 'Nvidia Blackwell demand exceeding supply through mid-2025. Margins holding at 75%+. Maintain/add to NVDA position.'
    },
    {
      type: 'risk',
      text: 'AMD MI300 ramp slower than expected ($400M vs $600M target). Watch for MI350 benchmarks in Q4 2025 before adding.'
    },
    {
      type: 'watch',
      text: 'Natural gas prices up 25% M/M. Monitor datacenter economics. If sustained above $5/MMBtu, rotate from VRT/ETN to energy.'
    }
  ];

  const actions = [
    {
      action: 'buy',
      text: 'SK Hynix entry zone $180-185. HBM shortage intensifying. Position size: 3-5%.'
    },
    {
      action: 'hold',
      text: 'NVDA core position (25%). Blackwell ramp validates moat. Stop only if margins <60%.'
    },
    {
      action: 'buy',
      text: 'GOOGL attractive entry $165-170. Undervalued vs MSFT on AI, increasing CapEx 15%.'
    },
    {
      action: 'watch',
      text: 'AMD below $155 or MI350 design wins. Currently at $163, hold for better entry.'
    }
  ];

  return (
    <BLUFContainer>
      <BLUFTitle>⚡ BLUF: Bottom Line Up Front</BLUFTitle>

      <MarketStatus>
        <StatusIndicator status={marketStatus} />
        <StatusText>
          Market Status: {marketStatus.toUpperCase()} | Thesis ON TRACK | Portfolio: {loading ? 'Loading...' : `${portfolioReturn >= 0 ? '+' : ''}${portfolioReturn.toFixed(1)}% YTD (${delta >= 0 ? '+' : ''}${delta.toFixed(1)}% vs Expected)`}
        </StatusText>
      </MarketStatus>

      <KeyTakeawaysGrid>
        {takeaways.map((takeaway, idx) => (
          <TakeawayCard key={idx} type={takeaway.type}>
            <TakeawayType type={takeaway.type}>
              {takeaway.type === 'opportunity' ? '🟢 OPPORTUNITY' :
               takeaway.type === 'risk' ? '🔴 RISK' : '🟡 WATCH'}
            </TakeawayType>
            <TakeawayText>{takeaway.text}</TakeawayText>
          </TakeawayCard>
        ))}
      </KeyTakeawaysGrid>

      <ActionsSection>
        <ActionsTitle>🎯 Top Actions for Today</ActionsTitle>
        <ActionsList>
          {actions.map((action, idx) => (
            <ActionItem key={idx}>
              <ActionIcon action={action.action}>{action.action}</ActionIcon>
              <div>{action.text}</div>
            </ActionItem>
          ))}
        </ActionsList>
      </ActionsSection>

      <Timestamp>
        Last updated: {currentDate.toLocaleString()} | Updates every 15 minutes
      </Timestamp>
    </BLUFContainer>
  );
};

export default BLUF;
