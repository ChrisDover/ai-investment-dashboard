# AI Investment Dashboard

A comprehensive React dashboard for tracking the path to AGI (Artificial General Intelligence) by 2040, monitoring semiconductor supercycle trends, and managing AI-focused investment portfolios.

## Overview

This dashboard integrates insights from leading AI researchers and semiconductor analysts to provide real-time tracking of:

- **AGI Progress**: Burndown chart tracking capabilities toward 2040 target (70% probability)
- **CAGR Timeline**: Revenue growth projections across bull/base/bear scenarios (15-40% CAGR)
- **Key Milestones**: Critical events like TSMC 2nm production, Nvidia Blackwell, GPT-5, etc.
- **Portfolio Allocation**: Thesis-aligned strategy across semiconductors, infrastructure, and hedges
- **Market Data**: Real-time tracking of key holdings (NVDA, TSM, MSFT, AMD, etc.)

## Investment Thesis

Based on comprehensive research from Dwarkesh Patel and SemiAnalysis, this dashboard tracks a bullish stance on:

1. **AI Scaling** (70% confidence): Continued scaling will unlock AGI-like capabilities by 2030-2040
2. **Semiconductor Supercycle**: AI-driven compute demand growing 50-60% quarterly since 2023
3. **Infrastructure Buildout**: $6.7T datacenter CapEx by 2030 ($2T/year at peak)
4. **Portfolio Strategy**: 45% AI/Tech/Semis, 30% Infrastructure, 15% Broad Market, 10% Defensive

## Features

### 1. AGI Progress Tracker
- Current capability score vs. expected timeline
- Years remaining to 2040 target
- Optimistic/base/pessimistic path visualization
- 70% scaling confidence probability

### 2. CAGR Timeline
- Bull case: 40% CAGR (explosive growth scenario)
- Base case: 30% CAGR (expected path)
- Bear case: 15% CAGR (stalled scaling)
- Actual performance tracking vs. projections

### 3. Key Milestones Tracker
- **Chips & Semiconductors**: TSMC 2nm/1.4nm, Nvidia Blackwell, HBM4
- **AI Models**: GPT-5, Claude 3, ARC-AGI benchmarks
- **Infrastructure**: 1GW datacenters, $2T annual CapEx
- **Economic**: $100B+ AI revenues, market cap milestones

### 4. Portfolio Allocation
- **AI/Tech/Semiconductors (45%)**: NVDA, TSM, MSFT, AMD, GOOGL, ASML, MU
- **Infrastructure/Energy (30%)**: EQT, VRT, ETN, GE, FSLR, EQIX, DLR
- **Broad Market (15%)**: SPY, QQQ, ARKK
- **Defensive (10%)**: GLD, BTC

### 5. Market Data
Real-time tracking of key holdings across:
- Semiconductors & Foundries
- Hyperscalers & AI Labs
- Infrastructure & Energy

## Tech Stack

- **React 18**: Modern component-based UI
- **Recharts**: Advanced charting library for data visualization
- **Styled Components**: CSS-in-JS styling with Bloomberg terminal aesthetic
- **Axios**: API integration for market data
- **Date-fns**: Date manipulation and formatting

## Installation

```bash
# Clone the repository
git clone https://github.com/chrisdover/ai-investment-dashboard.git

# Navigate to project directory
cd ai-investment-dashboard

# Install dependencies
npm install

# Start development server
npm start
```

The dashboard will open at `http://localhost:3000` (or PORT=3002 if configured).

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Custom Domain Configuration

To deploy to `trading.pollinatetrading.com/ai`:

1. Configure Vercel project with custom domain
2. Add DNS records pointing to Vercel
3. Configure basepath in `package.json` if using subdirectory routing

## Data Updates

### Current Implementation
- Market data: Simulated/mock data (update every 5 minutes)
- Milestones: Manual tracking based on public announcements
- CAGR projections: Static model-based calculations

### Production Enhancements
For real production use, integrate:
- Yahoo Finance API for live stock prices
- Alpha Vantage for extended market data
- Custom backend for milestone tracking
- Database for historical performance

## Key Metrics Tracked

### AGI Progress
- Current capability score: 42% (2024-2025 baseline)
- Expected capability: ~33% (based on 2020-2040 linear progression)
- Status: ON TRACK (within 90% of expected)

### Revenue Projections
- Current AI revenue (est.): ~$149B
- 2030 projection (base): $196B
- 2040 projection (base): $13.8T
- Bull case 2040: $29.2T (40% CAGR)

### Critical Milestones
- ✅ TSMC 3nm production (Q4 2023)
- ✅ Nvidia H100 deployment (Q2 2023)
- ✅ TSMC 2nm risk production (Q4 2024)
- 🟡 Nvidia Blackwell B200 (Q1 2025 - in progress)
- 🔲 TSMC 2nm mass production (Q2 2025)
- 🔲 GPT-5 / Next-gen models (Q3 2025)
- 🔲 1GW datacenters (Q4 2026)
- 🔲 AGI threshold (Q2 2040 - 70% probability)

## Color Scheme

Bloomberg terminal-inspired dark theme:
- **Background**: #0a0a0a (black)
- **Cards**: #1a1a1a (dark gray)
- **Primary**: #ff6b00 (orange)
- **Success**: #00ff00 (green)
- **Warning**: #ffaa00 (amber)
- **Error**: #ff0000 (red)
- **Info**: #00aaff (blue)

## Disclaimer

This dashboard is for informational and research purposes only. It does not constitute financial advice. Past performance does not guarantee future results. Always conduct your own due diligence and consult with qualified financial advisors before making investment decisions.

## License

MIT License

## Credits

Investment thesis synthesized from:
- **Dwarkesh Patel**: AI scaling optimism, infrastructure buildout analysis
- **SemiAnalysis**: Semiconductor industry insights, datacenter models, foundry analysis

Dashboard developed with Claude Code (Anthropic).

---

**Last Updated**: November 2025
**Version**: 1.0.0
**Author**: Chris Dover
**Website**: [trading.pollinatetrading.com/ai](https://trading.pollinatetrading.com/ai)
