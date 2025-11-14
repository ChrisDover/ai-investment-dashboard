# Semiconductor Supercycle Dashboard

A comprehensive React dashboard for tracking the semiconductor industry supercycle driven by AI demand, monitoring foundry roadmaps, accelerator competition, and managing a semiconductor-focused investment portfolio based on SemiAnalysis research.

## Overview

This dashboard integrates insights from SemiAnalysis's extensive semiconductor coverage to provide real-time tracking of:

- **Semiconductor Supercycle Progress**: Tracking revenue growth toward $1T+ target by 2030
- **CAGR Timeline**: Revenue projections across bull/base/bear scenarios (10-30% CAGR)
- **Key Milestones**: TSMC 2nm production, Nvidia Blackwell, HBM4, CoWoS expansion, etc.
- **Portfolio Allocation**: Semiconductor-focused strategy across foundries, AI hardware, infrastructure, and hedges
- **Market Data**: Real-time tracking of key holdings (TSM, NVDA, ASML, MU, AMD, etc.)

## Investment Thesis

Based on comprehensive research from SemiAnalysis, this dashboard tracks a bullish stance on the semiconductor supercycle:

1. **Foundry Dominance**: TSMC consolidates leadership with 2nm GAA + backside power (2024-2025)
2. **AI Hardware Innovation**: Nvidia maintains >80% GPU share; challengers emerge (AMD MI300, custom ASICs)
3. **Datacenter Expansion**: $2T annual CapEx by 2030, with energy/power as key bottlenecks
4. **Portfolio Strategy**: 40% Foundries/Semis, 30% AI Hardware, 20% Infrastructure, 10% Geopolitical Hedges

## Features

### 1. Semiconductor Supercycle Tracker
- Current industry revenue vs. $1T target
- Years remaining to 2030 milestone
- Bull/base/bear revenue projections
- AI-driven CAGR tracking (~22% actual 2020-2025)

### 2. CAGR Timeline
- Bull case: 30% CAGR (explosive AI demand)
- Base case: 20% CAGR (sustained supercycle)
- Bear case: 10% CAGR (AI winter scenario)
- Actual semiconductor revenue tracking

### 3. Key Milestones Tracker
- **Foundry & Process Nodes**: TSMC 2nm/1.4nm, Samsung delays, Intel 18A
- **AI Accelerators**: Nvidia Blackwell, AMD MI350, custom ASICs
- **Memory & HBM**: SK Hynix HBM4, Micron capacity expansion
- **Infrastructure**: 1GW datacenters, CoWoS packaging expansion
- **Economic**: $1T semiconductor revenue, $2T annual CapEx
- **Geopolitical**: CHIPS Act, US-China decoupling, export controls

### 4. Portfolio Allocation
- **Foundries & Semiconductors (40%)**: TSM, ASML, MU, AMD, INTC
- **AI Hardware & Accelerators (30%)**: NVDA, AVGO, ARM, AMZN
- **Infrastructure & Energy (20%)**: VRT, ETN, EQT, EQIX, DLR
- **Geopolitical Hedges (10%)**: GLD, BTC, SMH

### 5. Thesis Validation
Real-time tracking of SemiAnalysis's three core pillars:
- Foundry & Manufacturing Dominance (TSMC leadership)
- AI Hardware Innovation (Nvidia vs. challengers)
- Datacenter Ecosystem Expansion (CapEx, energy bottlenecks)
- Geopolitical Landscape (US-China, CHIPS Act)

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

### Semiconductor Supercycle Progress
- Current semiconductor revenue: ~$700B (2025 est.)
- Expected 2030 revenue: $1,072B (base case, 20% CAGR)
- Bull case 2030: $1,313B (30% CAGR)
- Status: ON TRACK (~22% actual CAGR 2020-2025)

### Revenue Projections
- 2020 baseline: $440B
- Current 2025 (est.): ~$700B
- 2030 target: $1T+ (base case)
- 2035 projection: $2.66T (base case, 20% CAGR)

### Critical Milestones
- ✅ TSMC 3nm production (Q4 2023)
- ✅ Nvidia H100 deployment (Q2 2023)
- ✅ SK Hynix HBM3E production (Q3 2023)
- ✅ TSMC 2nm risk production (Q4 2024)
- 🟡 Nvidia Blackwell GB200 (Q1 2025 - in progress)
- 🔲 TSMC 2nm mass production (Q2 2025)
- 🔲 AMD MI350 launch (Q4 2025)
- 🔲 HBM4 mass production (Q2 2026)
- 🔲 1GW datacenters (Q4 2026)
- 🔲 Semiconductor revenue >$1T (Q4 2029)

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

Investment thesis based on:
- **SemiAnalysis**: Comprehensive semiconductor industry coverage including:
  - Datacenter Industry Model and Accelerator Model
  - Foundry process node analysis (TSMC, Samsung, Intel)
  - AI accelerator competitive landscape (Nvidia, AMD, startups)
  - Memory and HBM technology roadmaps
  - Supply chain dynamics and geopolitical risks
  - Energy and infrastructure buildout analysis

Dashboard developed with Claude Code (Anthropic).

---

**Last Updated**: November 2025
**Version**: 1.0.0
**Author**: Chris Dover
**Website**: [trading.pollinatetrading.com/semianalsys](https://trading.pollinatetrading.com/semianalsys)
