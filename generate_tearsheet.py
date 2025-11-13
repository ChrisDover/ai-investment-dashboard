import requests
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import quantstats as qs

# Portfolio allocation from the dashboard
PORTFOLIO_ALLOCATION = {
    'NVDA': 0.25,
    'TSM': 0.08,
    'MSFT': 0.10,
    'GOOGL': 0.07,
    'AMD': 0.05,
    'ASML': 0.05,
    'MU': 0.05,
    'VRT': 0.06,
    'ETN': 0.04,
    'EQT': 0.05,
    'SPY': 0.10,
    'GLD': 0.05,
    'BTC-USD': 0.05
}

ALPHA_VANTAGE_KEY = 'ZAN2YWHAD299PEE8'
START_DATE = '2023-01-01'

def fetch_historical_data(symbol, start_date):
    """Fetch historical data from Alpha Vantage"""
    print(f"Fetching data for {symbol}...")

    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol={symbol}&outputsize=full&apikey={ALPHA_VANTAGE_KEY}'

    response = requests.get(url)
    data = response.json()

    if 'Time Series (Daily)' not in data:
        print(f"Error fetching {symbol}: {data}")
        return None

    time_series = data['Time Series (Daily)']

    # Convert to DataFrame
    df = pd.DataFrame.from_dict(time_series, orient='index')
    df.index = pd.to_datetime(df.index)
    df = df.sort_index()

    # Use adjusted close
    df['close'] = df['5. adjusted close'].astype(float)

    # Filter by start date
    df = df[df.index >= start_date]

    return df[['close']]

def calculate_portfolio_returns():
    """Calculate portfolio returns based on allocation"""
    print(f"\nCalculating portfolio returns from {START_DATE}...")

    # Fetch data for all symbols
    all_data = {}
    for symbol in PORTFOLIO_ALLOCATION.keys():
        data = fetch_historical_data(symbol, START_DATE)
        if data is not None:
            all_data[symbol] = data

    if not all_data:
        print("No data fetched!")
        return None

    # Combine all data into one DataFrame
    prices = pd.DataFrame()
    for symbol, data in all_data.items():
        prices[symbol] = data['close']

    # Forward fill missing values
    prices = prices.fillna(method='ffill')

    # Calculate daily returns for each asset
    returns = prices.pct_change()

    # Calculate weighted portfolio returns
    weights = pd.Series(PORTFOLIO_ALLOCATION)
    portfolio_returns = (returns * weights).sum(axis=1)

    # Remove NaN values
    portfolio_returns = portfolio_returns.dropna()

    print(f"\nPortfolio Stats:")
    print(f"Start Date: {portfolio_returns.index[0]}")
    print(f"End Date: {portfolio_returns.index[-1]}")
    print(f"Total Days: {len(portfolio_returns)}")
    print(f"Total Return: {(portfolio_returns + 1).prod() - 1:.2%}")

    return portfolio_returns

def fetch_spy_benchmark():
    """Fetch SPY returns as benchmark"""
    print("\nFetching SPY benchmark...")

    spy_data = fetch_historical_data('SPY', START_DATE)
    if spy_data is None:
        return None

    spy_returns = spy_data['close'].pct_change().dropna()

    return spy_returns

if __name__ == '__main__':
    # Calculate portfolio returns
    portfolio_returns = calculate_portfolio_returns()

    if portfolio_returns is None:
        print("Failed to calculate portfolio returns")
        exit(1)

    # Fetch SPY benchmark
    spy_returns = fetch_spy_benchmark()

    # Generate quantstats report
    print("\nGenerating QuantStats HTML tearsheet...")

    output_file = 'portfolio_tearsheet.html'

    # Create the tearsheet
    qs.reports.html(
        portfolio_returns,
        benchmark=spy_returns,
        output=output_file,
        title='AI Investment Portfolio Performance',
        download_filename='ai_portfolio_tearsheet.html'
    )

    print(f"\n✅ Tearsheet generated: {output_file}")
    print(f"\nOpen the file in your browser to view the complete analysis!")
