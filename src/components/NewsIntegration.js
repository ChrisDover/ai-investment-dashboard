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

const LoadingMessage = styled.div`
  color: #888;
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid #ff0000;
  border-radius: 6px;
`;

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const NewsIntegration = () => {
  const [filter, setFilter] = useState('all');
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch news for semiconductor and AI related companies
        const tickers = 'NVDA,AMD,TSM,ASML,INTC,MU,GOOGL,MSFT,META';
        const topics = 'technology,earnings';

        const response = await fetch(`${API_BASE_URL}/api/news?tickers=${tickers}&topics=${topics}&limit=30`);

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        setNewsItems(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();

    // Refresh news every 30 minutes
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredNews = filter === 'all'
    ? newsItems
    : newsItems.filter(item => item.category === filter);

  const openArticle = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <Card>
        <CardTitle>📰 News & Research Feed</CardTitle>
        <LoadingMessage>Loading live news...</LoadingMessage>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardTitle>📰 News & Research Feed</CardTitle>
        <ErrorMessage>
          Failed to load news: {error}
          <br />
          <small>Please try refreshing the page</small>
        </ErrorMessage>
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle>📰 Live News & Research Feed</CardTitle>

      <FilterButtons>
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          All News ({newsItems.length})
        </FilterButton>
        <FilterButton active={filter === 'research'} onClick={() => setFilter('research')}>
          Research & Analysis
        </FilterButton>
        <FilterButton active={filter === 'earnings'} onClick={() => setFilter('earnings')}>
          Earnings & Reports
        </FilterButton>
        <FilterButton active={filter === 'news'} onClick={() => setFilter('news')}>
          Breaking News
        </FilterButton>
      </FilterButtons>

      <NewsGrid>
        {filteredNews.length === 0 ? (
          <LoadingMessage>No news available for this filter</LoadingMessage>
        ) : (
          filteredNews.map(item => (
            <NewsItem
              key={item.id}
              impact={item.impact}
              onClick={() => openArticle(item.url)}
            >
              <NewsHeader>
                <NewsSource>{item.source}</NewsSource>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <ImpactBadge impact={item.impact}>{item.impact} impact</ImpactBadge>
                  <NewsTimestamp>{formatTimeAgo(new Date(item.timestamp))}</NewsTimestamp>
                </div>
              </NewsHeader>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsSummary>{item.summary.substring(0, 200)}...</NewsSummary>
              <NewsTags>
                {item.tickers && item.tickers.slice(0, 4).map((ticker, idx) => (
                  <Tag key={idx} color="#ff6b00">{ticker}</Tag>
                ))}
                {item.tags && item.tags.slice(0, 3).map((tag, idx) => (
                  <Tag key={`tag-${idx}`}>{tag}</Tag>
                ))}
              </NewsTags>
            </NewsItem>
          ))
        )}
      </NewsGrid>
    </Card>
  );
};

export default NewsIntegration;
