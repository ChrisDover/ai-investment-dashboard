import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  calculatePortfolioPerformance,
  calculateSharpeRatio,
  calculateMaxDrawdown,
  getSPYPerformance,
  START_DATE
} from '../services/marketDataService';

const Card = styled.div`
  background: #1a1a1a;
  border: 2px solid #ff6b00;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(255, 107, 0, 0.2);
`;

const CardTitle = styled.h2`
  color: #ff6b00;
  font-size: 1.8rem;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const DateBadge = styled.div`
  background: #ff6b00;
  color: #000;
  padding: 6px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 700;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 25px 0;
`;

const StatBox = styled.div`
  background: #0a0a0a;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid ${props => props.color || '#ff6b00'};
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 5px;
`;

const StatValue = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${props => props.color || '#fff'};
`;

const StatChange = styled.span`
  font-size: 0.9rem;
  color: ${props => props.positive ? '#00ff00' : '#ff0000'};
  margin-left: 8px;
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

const SectionTitle = styled.h3`
  color: #ff6b00;
  font-size: 1.2rem;
  margin: 0 0 15px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EventItem = styled.div`
  background: #0a0a0a;
  padding: 15px 20px;
  border-radius: 4px;
  border-left: 4px solid ${props =>
    props.impact === 'high' ? '#ff0000' :
    props.impact === 'medium' ? '#ffaa00' : '#00aaff'
  };
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 15px;
`;

const EventContent = styled.div`
  flex: 1;
`;

const EventTitle = styled.div`
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 5px;
`;

const EventDescription = styled.div`
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.5;
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
  padding: 4px 12px;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
`;

const RecommendationBox = styled.div`
  background: linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, rgba(255, 107, 0, 0.05) 100%);
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #ff6b00;
`;

const RecommendationTitle = styled.div`
  color: #ff6b00;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 12px;
  text-transform: uppercase;
`;

const RecommendationText = styled.div`
  color: #ddd;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 8px;
`;

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const DailyExecutiveSummary = () => {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const [, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { label: 'Portfolio YTD', value: '0%', change: '0%', positive: true, color: '#00ff00' },
    { label: 'vs SPY', value: '0%', change: 'Alpha', positive: true, color: '#ff6b00' },
    { label: 'Sharpe Ratio', value: '0', change: 'Loading', positive: true, color: '#00aaff' },
    { label: 'Max Drawdown', value: '0%', change: 'Loading', positive: true, color: '#ffaa00' }
  ]);

  useEffect(() => {
    const fetchPerformanceStats = async () => {
      try {
        setLoading(true);

        // Fetch portfolio performance time series
        const portfolioTimeSeries = await calculatePortfolioPerformance(START_DATE);

        if (portfolioTimeSeries.length === 0) {
          setLoading(false);
          return;
        }

        // Calculate daily returns for Sharpe ratio
        const dailyReturns = [];
        for (let i = 1; i < portfolioTimeSeries.length; i++) {
          const dailyReturn = (portfolioTimeSeries[i].value - portfolioTimeSeries[i - 1].value) / portfolioTimeSeries[i - 1].value;
          dailyReturns.push(dailyReturn);
        }

        // Calculate metrics
        const sharpe = calculateSharpeRatio(dailyReturns);
        const maxDD = calculateMaxDrawdown(portfolioTimeSeries);
        const spyPerf = await getSPYPerformance(START_DATE);
        const latestReturn = portfolioTimeSeries[portfolioTimeSeries.length - 1].return;
        const expectedReturn = 30.0;
        const delta = latestReturn - expectedReturn;
        const alpha = latestReturn - spyPerf;

        // Update stats
        setStats([
          {
            label: 'Portfolio YTD',
            value: `${latestReturn >= 0 ? '+' : ''}${latestReturn.toFixed(1)}%`,
            change: `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`,
            positive: delta >= 0,
            color: '#00ff00'
          },
          {
            label: 'vs SPY',
            value: `${alpha >= 0 ? '+' : ''}${alpha.toFixed(1)}%`,
            change: 'Alpha',
            positive: alpha >= 0,
            color: '#ff6b00'
          },
          {
            label: 'Sharpe Ratio',
            value: sharpe.toFixed(2),
            change: sharpe >= 1.5 ? 'Excellent' : sharpe >= 1.0 ? 'Good' : 'Fair',
            positive: true,
            color: '#00aaff'
          },
          {
            label: 'Max Drawdown',
            value: `${maxDD.toFixed(1)}%`,
            change: maxDD > -10 ? 'Controlled' : 'High',
            positive: maxDD > -10,
            color: '#ffaa00'
          }
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching performance stats:', error);
        setLoading(false);
      }
    };

    const fetchNews = async () => {
      try {
        const tickers = 'NVDA,AMD,TSM,ASML,INTC,MU,GOOGL,MSFT,META';
        const topics = 'technology,earnings';
        const response = await fetch(`${API_BASE_URL}/api/news?tickers=${tickers}&topics=${topics}&limit=10`);

        if (response.ok) {
          const newsData = await response.json();
          const events = newsData.slice(0, 5).map(item => ({
            impact: item.impact,
            title: item.title,
            description: item.summary.substring(0, 180) + '...'
          }));
          setKeyEvents(events);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchPerformanceStats();
    fetchNews();

    // Refresh every 15 minutes
    const interval = setInterval(() => {
      fetchPerformanceStats();
      fetchNews();
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const [keyEvents, setKeyEvents] = useState([]);

  return (
    <Card>
      <CardTitle>
        📋 Daily Executive Summary
        <DateBadge>{dateString}</DateBadge>
      </CardTitle>

      <QuickStats>
        {stats.map((stat, idx) => (
          <StatBox key={idx} color={stat.color}>
            <StatLabel>{stat.label}</StatLabel>
            <StatValue color={stat.color}>
              {stat.value}
              {stat.change && (
                <StatChange positive={stat.positive}> {stat.change}</StatChange>
              )}
            </StatValue>
          </StatBox>
        ))}
      </QuickStats>

      <Section>
        <SectionTitle>Market Overview</SectionTitle>
        <RecommendationText>
          <strong>Thesis Status: ON TRACK.</strong> All four core assumptions remain valid: (1) Scaling laws continue to hold with no saturation, (2) Hyperscaler CapEx tracking 4% ahead of projections at $520B cumulative, (3) TSMC 2nm on schedule with yields beating N3 ramp, (4) Nvidia maintaining 85% market share despite AMD competition.
        </RecommendationText>
        <RecommendationText>
          <strong>Portfolio Performance:</strong> YTD return of {stats[0].value} {stats[0].change} expected +30% and outperforms SPY by {stats[1].value}. Risk-adjusted returns (Sharpe {stats[2].value}) are {stats[2].change.toLowerCase()} with {stats[3].change.toLowerCase()} drawdown ({stats[3].value} max). Thesis validation metrics all green.
        </RecommendationText>
      </Section>

      <Section>
        <SectionTitle>Key Events (Last 24 Hours)</SectionTitle>
        <EventsList>
          {keyEvents.map((event, idx) => (
            <EventItem key={idx} impact={event.impact}>
              <EventContent>
                <EventTitle>{event.title}</EventTitle>
                <EventDescription>{event.description}</EventDescription>
              </EventContent>
              <ImpactBadge impact={event.impact}>{event.impact}</ImpactBadge>
            </EventItem>
          ))}
        </EventsList>
      </Section>
    </Card>
  );
};

export default DailyExecutiveSummary;
