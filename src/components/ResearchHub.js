import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HubContainer = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const HubTitle = styled.h2`
  color: #ff6b00;
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const SourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const SourceCard = styled.div`
  background: #0a0a0a;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 20px;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border-color: #ff6b00;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const SourceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 10px;
  flex-wrap: wrap;
`;

const SourceName = styled.h3`
  color: #ff6b00;
  font-size: 1.2rem;
  margin: 0;
  flex: 1;
  min-width: 0;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const SourceTag = styled.span`
  background: rgba(255, 107, 0, 0.2);
  color: #ff6b00;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 3px 8px;
  }
`;

const SourceAuthor = styled.div`
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const SourceDescription = styled.div`
  color: #ddd;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 15px;
  word-wrap: break-word;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const ArticlesList = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #333;
`;

const ArticleItem = styled.a`
  display: block;
  color: #00d4ff;
  font-size: 0.9rem;
  padding: 8px 0;
  text-decoration: none;
  border-left: 2px solid transparent;
  padding-left: 10px;
  margin-left: -10px;
  transition: all 0.2s;
  word-wrap: break-word;
  overflow-wrap: break-word;

  &:hover {
    color: #ff6b00;
    border-left-color: #ff6b00;
    padding-left: 15px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ArticleDate = styled.span`
  color: #666;
  font-size: 0.75rem;
  display: block;
  margin-top: 3px;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const VisitButton = styled.a`
  display: inline-block;
  background: #ff6b00;
  color: #000;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.85rem;
  margin-top: 15px;
  transition: background 0.2s;

  &:hover {
    background: #ff8c33;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 8px 16px;
  }
`;

const LoadingText = styled.div`
  color: #666;
  font-style: italic;
  padding: 10px 0;
`;

const ResearchHub = () => {
  const [loading, setLoading] = useState(true);

  const sources = [
    {
      name: 'Stratechery',
      author: 'Ben Thompson',
      tag: 'Strategy',
      url: 'https://stratechery.com',
      description: 'Deep analysis of tech business models, platform economics, and competitive strategy. Essential for understanding hyperscaler (MSFT, GOOGL) AI infrastructure decisions.',
      focus: 'Business strategy, platform economics, competitive moats',
      latestTopics: [
        { title: 'AI and the Big Five', date: 'Recent', url: 'https://stratechery.com' },
        { title: 'Microsoft and OpenAI', date: 'Recent', url: 'https://stratechery.com' },
        { title: 'The AI Goldmine', date: 'Recent', url: 'https://stratechery.com' }
      ]
    },
    {
      name: 'Asianometry',
      author: 'Jon Y',
      tag: 'Semiconductors',
      url: 'https://www.youtube.com/@Asianometry',
      description: 'Deep semiconductor history and manufacturing analysis. Unmatched coverage of TSMC, ASML, lithography, and Asian supply chains.',
      focus: 'Chip manufacturing, TSMC, ASML, supply chain',
      latestTopics: [
        { title: 'TSMC\'s 2nm Process', date: 'YouTube', url: 'https://www.youtube.com/@Asianometry' },
        { title: 'ASML\'s EUV Monopoly', date: 'YouTube', url: 'https://www.youtube.com/@Asianometry' },
        { title: 'Why Chips Are So Hard', date: 'YouTube', url: 'https://www.youtube.com/@Asianometry' }
      ]
    },
    {
      name: 'Ramez Naam',
      author: 'Ramez Naam',
      tag: 'Energy',
      url: 'https://rameznaam.com',
      description: 'Energy infrastructure, power requirements for AI data centers, and clean energy technology. Critical for understanding AI infrastructure bottlenecks.',
      focus: 'Data center power, energy economics, infrastructure',
      latestTopics: [
        { title: 'AI\'s Energy Problem', date: 'Recent', url: 'https://rameznaam.com' },
        { title: 'Solar + Grid Scale Storage', date: 'Recent', url: 'https://rameznaam.com' },
        { title: 'Power Grid Constraints', date: 'Recent', url: 'https://rameznaam.com' }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <HubContainer>
      <HubTitle>🧠 Research Hub: Key Voices</HubTitle>

      <SourcesGrid>
        {sources.map((source, index) => (
          <SourceCard key={index}>
            <SourceHeader>
              <SourceName>{source.name}</SourceName>
              <SourceTag>{source.tag}</SourceTag>
            </SourceHeader>

            <SourceAuthor>by {source.author}</SourceAuthor>

            <SourceDescription>{source.description}</SourceDescription>

            <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '10px' }}>
              <strong style={{ color: '#ff6b00' }}>Focus:</strong> {source.focus}
            </div>

            <ArticlesList>
              {loading ? (
                <LoadingText>Loading latest content...</LoadingText>
              ) : (
                source.latestTopics.map((article, idx) => (
                  <ArticleItem key={idx} href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                    <ArticleDate>{article.date}</ArticleDate>
                  </ArticleItem>
                ))
              )}
            </ArticlesList>

            <VisitButton href={source.url} target="_blank" rel="noopener noreferrer">
              Visit {source.name} →
            </VisitButton>
          </SourceCard>
        ))}
      </SourcesGrid>
    </HubContainer>
  );
};

export default ResearchHub;
