import React from 'react';
import styled from 'styled-components';
import AGIProgressTracker from './components/AGIProgressTracker';
import CAGRTimeline from './components/CAGRTimeline';
import KeyMilestones from './components/KeyMilestones';
import PortfolioAllocation from './components/PortfolioAllocation';
import MarketData from './components/MarketData';
import ThesisValidation from './components/ThesisValidation';
import AlertsPanel from './components/AlertsPanel';
import TradingSignals from './components/TradingSignals';
import PortfolioPerformance from './components/PortfolioPerformance';
import NewsIntegration from './components/NewsIntegration';
import ScenarioTesting from './components/ScenarioTesting';
import CompanyDeepDives from './components/CompanyDeepDives';
import BLUF from './components/BLUF';
import DailyExecutiveSummary from './components/DailyExecutiveSummary';

const DashboardContainer = styled.div`
  background: #0a0a0a;
  color: #f0f0f0;
  min-height: 100vh;
  font-family: 'Monaco', 'Courier New', monospace;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  padding: 30px 0;
  border-bottom: 2px solid #ff6b00;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff6b00;
  margin: 0 0 10px 0;
  font-weight: 700;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #888;
  margin: 0;
  font-style: italic;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
  max-width: 1800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidthSection = styled.div`
  grid-column: 1 / -1;
`;

const LastUpdated = styled.div`
  text-align: center;
  color: #666;
  font-size: 0.85rem;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #333;
`;

function App() {
  const lastUpdate = new Date().toLocaleString();

  return (
    <DashboardContainer>
      <Header>
        <Title>AI INVESTMENT DASHBOARD</Title>
        <Subtitle>Alerts | Thesis Validation | Trading Signals | News | Scenarios | Deep Dives | Performance Tracking</Subtitle>
      </Header>

      <GridContainer>
        {/* PRIORITY 1: Instant Actionable Intelligence */}
        <FullWidthSection>
          <BLUF />
        </FullWidthSection>

        <FullWidthSection>
          <DailyExecutiveSummary />
        </FullWidthSection>

        {/* PRIORITY 2: Critical Alerts & Trading Signals */}
        <FullWidthSection>
          <AlertsPanel />
        </FullWidthSection>

        <FullWidthSection>
          <TradingSignals />
        </FullWidthSection>

        {/* PRIORITY 3: Performance & Thesis Validation */}
        <FullWidthSection>
          <PortfolioPerformance />
        </FullWidthSection>

        <FullWidthSection>
          <ThesisValidation />
        </FullWidthSection>

        {/* PRIORITY 4: Deep Research & Intelligence */}
        <FullWidthSection>
          <NewsIntegration />
        </FullWidthSection>

        <FullWidthSection>
          <CompanyDeepDives />
        </FullWidthSection>

        <FullWidthSection>
          <ScenarioTesting />
        </FullWidthSection>

        {/* PRIORITY 5: Long-term Tracking & Context */}
        <FullWidthSection>
          <AGIProgressTracker />
        </FullWidthSection>

        <FullWidthSection>
          <CAGRTimeline />
        </FullWidthSection>

        <FullWidthSection>
          <KeyMilestones />
        </FullWidthSection>

        <PortfolioAllocation />

        <MarketData />
      </GridContainer>

      <LastUpdated>
        Last updated: {lastUpdate} | Data refreshes every 5 minutes
      </LastUpdated>
    </DashboardContainer>
  );
}

export default App;
