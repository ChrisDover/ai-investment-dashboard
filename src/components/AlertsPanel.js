import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatTimeAgo } from '../utils/dateUtils';

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

const LoadingMessage = styled.div`
  color: #888;
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
`;

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const AlertsPanel = () => {
  const [filter, setFilter] = useState('all');
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);

        // Fetch news for semiconductor and AI related companies
        const tickers = 'NVDA,AMD,TSM,ASML,INTC,MU,GOOGL,MSFT,META';
        const topics = 'technology,earnings';

        const response = await fetch(`${API_BASE_URL}/api/news?tickers=${tickers}&topics=${topics}&limit=50`);

        if (!response.ok) {
          throw new Error('Failed to fetch alerts');
        }

        const newsData = await response.json();

        // Convert news to alerts (only high and medium impact)
        const alertsFromNews = newsData
          .filter(item => item.impact === 'high' || item.impact === 'medium')
          .map((item, index) => {
            // Determine severity based on sentiment and impact
            let severity = 'opportunity';
            if (item.sentiment < -0.2) severity = 'critical';
            else if (item.sentiment < -0.1 || (item.sentiment > 0.2)) severity = 'warning';

            return {
              id: index + 1,
              severity,
              title: item.title,
              message: item.summary,
              timestamp: formatTimeAgo(new Date(item.timestamp)),
              tags: [...(item.tickers || []), ...(item.tags || [])].slice(0, 4),
              url: item.url
            };
          })
          .slice(0, 15); // Limit to top 15 alerts

        setAlerts(alertsFromNews);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setLoading(false);
      }
    };

    fetchAlerts();

    // Refresh alerts every 30 minutes
    const interval = setInterval(fetchAlerts, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter);

  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const warningCount = alerts.filter(a => a.severity === 'warning').length;
  const opportunityCount = alerts.filter(a => a.severity === 'opportunity').length;

  const openArticle = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardTitle>⚠ Market Alerts: High-Impact Events</CardTitle>
        <LoadingMessage>Loading market alerts...</LoadingMessage>
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle>⚠ Market Alerts: High-Impact Events</CardTitle>

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
        {filteredAlerts.length === 0 ? (
          <LoadingMessage>No alerts for this filter</LoadingMessage>
        ) : (
          filteredAlerts.map(alert => (
            <AlertItem
              key={alert.id}
              severity={alert.severity}
              onClick={() => openArticle(alert.url)}
            >
              <AlertHeader>
                <AlertTitle severity={alert.severity}>{alert.title}</AlertTitle>
                <AlertTimestamp>{alert.timestamp}</AlertTimestamp>
              </AlertHeader>
              <AlertMessage>{alert.message.substring(0, 200)}...</AlertMessage>
              <AlertTags>
                {alert.tags.map((tag, idx) => (
                  <Tag key={idx}>{tag}</Tag>
                ))}
              </AlertTags>
            </AlertItem>
          ))
        )}
      </AlertsList>
    </Card>
  );
};

export default AlertsPanel;
