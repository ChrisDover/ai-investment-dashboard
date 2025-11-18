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
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    gap: 8px;
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
  flex: 1;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.3;
    width: 100%;
  }

  @media (max-width: 360px) {
    font-size: 0.75rem;
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
    props.action === 'opportunity' ? '#00ff00' :
    props.action === 'risk' ? '#ff0000' :
    props.action === 'watch' ? '#00aaff' : '#ffaa00'
  };
  color: #000;
  width: 80px;
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

const LoadingMessage = styled.div`
  color: #000;
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
`;

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const BLUF = () => {
  const currentDate = new Date();
  const [portfolioReturn, setPortfolioReturn] = useState(0);
  const [loading, setLoading] = useState(true);
  const [marketStatus, setMarketStatus] = useState('neutral');
  const [takeaways, setTakeaways] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch portfolio performance
        const portfolioTimeSeries = await calculatePortfolioPerformance(START_DATE);
        if (portfolioTimeSeries.length > 0) {
          const latestReturn = portfolioTimeSeries[portfolioTimeSeries.length - 1].return;
          setPortfolioReturn(latestReturn);

          // Determine market status based on return
          if (latestReturn > 20) setMarketStatus('bullish');
          else if (latestReturn < 10) setMarketStatus('bearish');
          else setMarketStatus('neutral');
        }

        // Fetch live news for takeaways
        const tickers = 'NVDA,AMD,TSM,ASML,INTC,MU,GOOGL,MSFT,META';
        const topics = 'technology,earnings';
        console.log('[BLUF] Fetching news from:', `${API_BASE_URL}/api/news?tickers=${tickers}&topics=${topics}&limit=20`);
        const response = await fetch(`${API_BASE_URL}/api/news?tickers=${tickers}&topics=${topics}&limit=20`);

        console.log('[BLUF] Response status:', response.status, response.ok);
        if (response.ok) {
          const newsData = await response.json();
          console.log('[BLUF] Received', newsData.length, 'news items');

          // Generate takeaways from high-impact news
          const newTakeaways = newsData
            .filter(item => item.impact === 'high')
            .slice(0, 4)
            .map(item => {
              let type = 'watch';
              if (item.sentiment > 0.2) type = 'opportunity';
              else if (item.sentiment < -0.2) type = 'risk';

              return {
                type,
                text: item.summary.substring(0, 150) + '...'
              };
            });

          setTakeaways(newTakeaways);

          // Generate actions from news
          const newsActions = newsData
            .slice(0, 4)
            .map(item => {
              let action = 'watch';
              if (item.sentiment > 0.2) action = 'opportunity';
              else if (item.sentiment < -0.2) action = 'risk';

              return {
                action,
                text: item.title
              };
            });

          setActions(newsActions);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching BLUF data:', error);
        setLoading(false);
      }
    };

    fetchData();

    // Refresh every 15 minutes
    const interval = setInterval(fetchData, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const expectedReturn = 30.0; // Expected CAGR
  const delta = portfolioReturn - expectedReturn;

  if (loading) {
    return (
      <BLUFContainer>
        <BLUFTitle>⚡ BLUF: Bottom Line Up Front</BLUFTitle>
        <LoadingMessage>Loading latest market intelligence...</LoadingMessage>
      </BLUFContainer>
    );
  }

  return (
    <BLUFContainer>
      <BLUFTitle>⚡ BLUF: Bottom Line Up Front</BLUFTitle>

      <MarketStatus>
        <StatusIndicator status={marketStatus} />
        <StatusText>
          Market Status: {marketStatus.toUpperCase()} | Thesis {delta >= 0 ? 'ON TRACK' : 'NEEDS ATTENTION'} | Portfolio: {loading ? 'Loading...' : `${portfolioReturn >= 0 ? '+' : ''}${portfolioReturn.toFixed(1)}% YTD (${delta >= 0 ? '+' : ''}${delta.toFixed(1)}% vs Expected)`}
        </StatusText>
      </MarketStatus>

      {takeaways.length > 0 && (
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
      )}

      {actions.length > 0 && (
        <ActionsSection>
          <ActionsTitle>🎯 Latest Market Intelligence</ActionsTitle>
          <ActionsList>
            {actions.map((action, idx) => (
              <ActionItem key={idx}>
                <ActionIcon action={action.action}>{action.action}</ActionIcon>
                <div>{action.text}</div>
              </ActionItem>
            ))}
          </ActionsList>
        </ActionsSection>
      )}

      <Timestamp>
        Last updated: {currentDate.toLocaleString()} | Updates every 15 minutes
      </Timestamp>
    </BLUFContainer>
  );
};

export default BLUF;
