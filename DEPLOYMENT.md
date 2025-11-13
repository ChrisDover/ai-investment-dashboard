# Deployment Guide

## Current Status

✅ **Dashboard Built Successfully**
- React production build completed
- All components compiled without errors
- Build size: 179.68 kB (gzipped)

✅ **Deployed to Vercel**
- Live URL: https://ai-investment-dashboard-lmolu6xju-chrisdovers-projects.vercel.app
- Build Command: `react-scripts build`
- Output Directory: `build`
- Auto-detected: Create React App

## Next Steps

### 1. Create GitHub Repository

The code is committed locally but needs to be pushed to GitHub:

```bash
# Option A: Using GitHub CLI (requires login)
cd /Users/chrisdover/ai-investment-dashboard
gh auth login
gh repo create ai-investment-dashboard --public --source=. --remote=origin
git push -u origin main
```

```bash
# Option B: Manual GitHub Repository Creation
# 1. Go to https://github.com/new
# 2. Repository name: ai-investment-dashboard
# 3. Description: AI Investment Dashboard - Tracking AGI Progress & Semiconductor Supercycle
# 4. Public repository
# 5. DO NOT initialize with README (already exists)
# 6. Create repository
# 7. Then run:
cd /Users/chrisdover/ai-investment-dashboard
git remote add origin https://github.com/YOUR_USERNAME/ai-investment-dashboard.git
git branch -M main
git push -u origin main
```

### 2. Configure Custom Domain: trading.pollinatetrading.com/ai

#### Option A: Subdomain (Recommended)
If you want `ai.trading.pollinatetrading.com`:

1. **In Vercel Dashboard:**
   - Go to: https://vercel.com/chrisdovers-projects/ai-investment-dashboard/settings/domains
   - Add domain: `ai.trading.pollinatetrading.com`
   - Copy the CNAME record provided by Vercel

2. **In Your DNS Provider:**
   - Add CNAME record:
     - Name: `ai.trading`
     - Value: `cname.vercel-dns.com`
     - TTL: 3600 (or auto)

3. **Wait for DNS propagation** (5-30 minutes)

#### Option B: Subpath (trading.pollinatetrading.com/ai)
If you want the dashboard at `/ai` subpath on your existing domain:

**Note:** This requires configuring the main domain server to proxy requests, which is more complex. Recommended approach is to use a subdomain instead.

If you must use subpath:
1. Set up reverse proxy on trading.pollinatetrading.com
2. Configure basepath in `package.json`:
   ```json
   {
     "homepage": "https://trading.pollinatetrading.com/ai"
   }
   ```
3. Rebuild and redeploy: `npm run build && vercel --prod`

### 3. Set Up Vercel Production Domain

Once you decide on the domain approach:

```bash
cd /Users/chrisdover/ai-investment-dashboard

# Deploy to production with custom domain
vercel --prod

# Or redeploy if you've made changes
vercel redeploy --prod
```

### 4. Enable Auto-Deployments from GitHub

1. Go to Vercel project settings: https://vercel.com/chrisdovers-projects/ai-investment-dashboard/settings/git
2. Connect GitHub repository (once created)
3. Enable automatic deployments from `main` branch
4. Every push to `main` will trigger automatic deployment

### 5. Environment Variables (Future Enhancement)

If you add real-time API integrations (Yahoo Finance, Alpha Vantage):

1. Go to: https://vercel.com/chrisdovers-projects/ai-investment-dashboard/settings/environment-variables
2. Add variables:
   - `REACT_APP_YAHOO_FINANCE_API_KEY`
   - `REACT_APP_ALPHA_VANTAGE_API_KEY`
3. Rebuild project to apply changes

## Monitoring & Updates

### View Deployment Logs
```bash
vercel inspect ai-investment-dashboard-lmolu6xju-chrisdovers-projects.vercel.app --logs
```

### Redeploy
```bash
vercel redeploy ai-investment-dashboard-lmolu6xju-chrisdovers-projects.vercel.app
```

### Local Development
```bash
cd /Users/chrisdover/ai-investment-dashboard
PORT=3002 npm start
```

## Custom Domain Examples

### Subdomain Approach (Recommended)
- **URL:** `https://ai.trading.pollinatetrading.com`
- **Pros:** Cleaner URL, easier DNS setup, full Vercel features
- **Cons:** Requires subdomain instead of subpath

### Main Domain with Subpath
- **URL:** `https://trading.pollinatetrading.com/ai`
- **Pros:** Keeps everything under main domain
- **Cons:** Requires reverse proxy setup, more complex configuration

## Dashboard Features Live

All features are now deployed and accessible:

1. **AGI Progress Tracker**
   - 2040 timeline with burndown chart
   - Current capability: 42%
   - Status: ON TRACK

2. **CAGR Timeline**
   - Bull case: 40% CAGR
   - Base case: 30% CAGR
   - Bear case: 15% CAGR

3. **Key Milestones**
   - 17 milestones tracked
   - Filterable by category (chips, models, infrastructure, economic)
   - Real-time status updates

4. **Portfolio Allocation**
   - 45% AI/Tech/Semiconductors
   - 30% Infrastructure/Energy
   - 15% Broad Market
   - 10% Defensive

5. **Market Data**
   - 14 key holdings tracked
   - Categorized view (semiconductors, hyperscalers, infrastructure)
   - Mock data (replace with real API in production)

## Next Enhancements

1. **Real-time Market Data**
   - Integrate Yahoo Finance API
   - Auto-refresh every 5 minutes
   - Historical price charts

2. **Performance Tracking**
   - Portfolio performance vs. benchmarks
   - YTD/1Y/5Y returns
   - Risk-adjusted metrics (Sharpe, Sortino)

3. **Alert System**
   - Email notifications for milestone updates
   - Price alerts for key holdings
   - CAGR variance warnings

4. **Mobile Responsiveness**
   - Already responsive, but can be optimized
   - Add mobile-specific views
   - Touch-optimized charts

## Support

For issues or questions:
- Vercel Dashboard: https://vercel.com/chrisdovers-projects/ai-investment-dashboard
- Local development: `PORT=3002 npm start`
- Rebuild production: `npm run build && vercel --prod`

---

**Deployment Date:** November 13, 2025
**Vercel Project:** ai-investment-dashboard
**Status:** ✅ LIVE
