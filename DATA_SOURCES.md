# Data Sources Integration Guide

This document explains how to integrate real financial data sources into the Trading Intelligence Platform.

## Overview

The platform is designed to pull data from multiple sources to provide comprehensive market insights:
- **Market Data**: Real-time quotes, indices, and stock prices
- **News**: Multi-source news aggregation with sentiment analysis
- **Technical Data**: Historical prices, volume, and technical indicators
- **Sentiment**: Fear & Greed Index and social media sentiment

---

## News Sources

### Currently Integrated (Mock Data)

The platform displays news from these sources:
1. **CNBC** - Breaking financial news
2. **Bloomberg** - Market analysis and insights
3. **Reuters** - Global financial news
4. **Wall Street Journal (WSJ)** - In-depth market coverage
5. **MarketWatch** - Real-time market data and news
6. **Yahoo Finance** - Stock quotes and financial news
7. **Seeking Alpha** - Investment research and analysis
8. **TradingView** - Trading ideas and market analysis

### API Integration Instructions

#### 1. NewsAPI (newsapi.org)
**Purpose**: Multi-source news aggregation
**Cost**: Free tier available (100 requests/day)
**Setup**:
```typescript
// In app/api/news/route.ts
const response = await fetch(
  `https://newsapi.org/v2/everything?q=stocks&apiKey=${process.env.NEWS_API_KEY}&pageSize=20&sortBy=publishedAt`
);
const data = await response.json();
```

**Environment Variable**:
```bash
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
```

---

#### 2. Alpha Vantage News Sentiment
**Purpose**: News with AI sentiment analysis
**Cost**: Free tier available (25 requests/day)
**Setup**:
```typescript
const response = await fetch(
  `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${process.env.ALPHA_VANTAGE_KEY}&limit=50`
);
const data = await response.json();
```

**Environment Variable**:
```bash
ALPHA_VANTAGE_KEY=your_alphavantage_key
```

---

#### 3. Finnhub News
**Purpose**: Company-specific financial news
**Cost**: Free tier available (60 calls/minute)
**Setup**:
```typescript
const response = await fetch(
  `https://finnhub.io/api/v1/news?category=general&token=${process.env.FINNHUB_KEY}`
);
const data = await response.json();
```

**Environment Variable**:
```bash
FINNHUB_KEY=your_finnhub_key
```

---

#### 4. MarketWatch RSS Feed
**Purpose**: Latest market news
**Cost**: Free
**Setup**:
```typescript
import Parser from 'rss-parser';
const parser = new Parser();
const feed = await parser.parseURL('https://www.marketwatch.com/rss/');
```

**Dependencies**:
```bash
npm install rss-parser
```

---

#### 5. Yahoo Finance API (Unofficial)
**Purpose**: Stock news and quotes
**Cost**: Free (unofficial)
**Setup**:
```typescript
// Using yahoo-finance2
import yahooFinance from 'yahoo-finance2';
const news = await yahooFinance.search('AAPL', { newsCount: 10 });
```

**Dependencies**:
```bash
npm install yahoo-finance2
```

---

#### 6. Seeking Alpha (Web Scraping/RSS)
**Purpose**: Investment analysis
**Cost**: Free (with rate limits)
**Setup**:
```bash
# RSS Feed approach
https://seekingalpha.com/market-news/all.xml
```

---

#### 7. Twitter/X API
**Purpose**: Social media sentiment
**Cost**: Various tiers (Free tier limited)
**Setup**:
```typescript
const response = await fetch(
  `https://api.twitter.com/2/tweets/search/recent?query=%24AAPL&max_results=10`,
  {
    headers: {
      'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
  }
);
```

**Environment Variable**:
```bash
TWITTER_BEARER_TOKEN=your_bearer_token
```

---

#### 8. Reddit API
**Purpose**: r/wallstreetbets sentiment
**Cost**: Free
**Setup**:
```typescript
const response = await fetch('https://www.reddit.com/r/wallstreetbets/hot.json?limit=25');
const data = await response.json();
```

---

## Market Data Sources

### 1. Alpha Vantage
**Purpose**: Stock quotes, intraday data, technical indicators
**Cost**: Free tier (25 requests/day)

```typescript
// Real-time quote
const quote = await fetch(
  `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${process.env.ALPHA_VANTAGE_KEY}`
);

// Intraday data
const intraday = await fetch(
  `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${process.env.ALPHA_VANTAGE_KEY}`
);
```

---

### 2. Finnhub
**Purpose**: Real-time stock data, fundamentals
**Cost**: Free tier (60 calls/minute)

```typescript
// Quote
const quote = await fetch(
  `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${process.env.FINNHUB_KEY}`
);

// Company profile
const profile = await fetch(
  `https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=${process.env.FINNHUB_KEY}`
);
```

---

### 3. Polygon.io
**Purpose**: Comprehensive market data
**Cost**: Free tier (5 API calls/minute)

```typescript
const aggregates = await fetch(
  `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-02-10?apiKey=${process.env.POLYGON_KEY}`
);
```

---

### 4. Yahoo Finance
**Purpose**: Historical data, real-time quotes
**Cost**: Free (unofficial API)

```typescript
import yahooFinance from 'yahoo-finance2';

const quote = await yahooFinance.quote('AAPL');
const historical = await yahooFinance.historical('AAPL', {
  period1: '2024-01-01',
  period2: '2024-12-31',
});
```

---

## Fear & Greed Index

### Alternative.me Crypto Fear & Greed API
**Purpose**: Market sentiment indicator
**Cost**: Free, no authentication required

```typescript
const response = await fetch('https://api.alternative.me/fng/?limit=30');
const data = await response.json();
```

### Custom Implementation
For stocks, you can calculate your own Fear & Greed Index using:
- VIX (Market Volatility)
- Put/Call Ratio
- Market Momentum
- Stock Price Strength
- Market Breadth
- Safe Haven Demand

---

## AI Sentiment Analysis

### OpenAI API
**Purpose**: Analyze news sentiment
**Cost**: Pay-per-use

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: "Analyze the following news and determine if it's bullish, bearish, or neutral for the mentioned stocks."
    },
    {
      role: "user",
      content: newsArticle
    }
  ],
});
```

---

## Implementation Priority

### Phase 1 - Essential (Start Here)
1. **Alpha Vantage** - Market data and news (Free)
2. **Finnhub** - Real-time quotes (Free)
3. **Alternative.me** - Fear & Greed Index (Free)

### Phase 2 - Enhanced Coverage
4. **NewsAPI** - Multi-source news (Free tier)
5. **Yahoo Finance** - Additional market data (Free)
6. **MarketWatch RSS** - Latest news (Free)

### Phase 3 - Advanced Features
7. **OpenAI/Anthropic** - AI sentiment analysis
8. **Twitter API** - Social sentiment
9. **Reddit API** - Community sentiment

---

## Rate Limiting & Caching

To avoid hitting API rate limits:

1. **Use SWR for caching** (already implemented in hooks/use-market-data.ts)
2. **Implement server-side caching**:
```typescript
// app/api/news/route.ts
import { unstable_cache } from 'next/cache';

const getCachedNews = unstable_cache(
  async () => {
    // Fetch news from APIs
    return newsData;
  },
  ['news-cache'],
  { revalidate: 120 } // Cache for 2 minutes
);
```

3. **Respect API rate limits**:
```typescript
// Implement request queuing or throttling
import pLimit from 'p-limit';
const limit = pLimit(5); // Max 5 concurrent requests
```

---

## Environment Variables Setup

Create a `.env.local` file:

```bash
# Market Data
ALPHA_VANTAGE_KEY=your_key_here
FINNHUB_KEY=your_key_here
POLYGON_KEY=your_key_here

# News
NEWS_API_KEY=your_key_here
TWITTER_BEARER_TOKEN=your_token_here

# AI Analysis
OPENAI_API_KEY=your_key_here
# OR
ANTHROPIC_API_KEY=your_key_here

# Public URLs
NEXT_PUBLIC_FEAR_GREED_API=https://api.alternative.me/fng/
```

---

## Testing Data Sources

Before deploying, test each integration:

```bash
# Test news API
curl "http://localhost:3000/api/news?source=CNBC"

# Test market data
curl "http://localhost:3000/api/market-data"

# Test Fear & Greed
curl "http://localhost:3000/api/fear-greed"

# Test stock data
curl "http://localhost:3000/api/stock/AAPL"
```

---

## Next Steps

1. Sign up for free API keys from recommended providers
2. Add keys to `.env.local`
3. Replace mock data in API routes with real API calls
4. Test thoroughly in development
5. Monitor API usage to stay within rate limits
6. Deploy to Vercel with environment variables configured

---

## Support & Resources

- [Alpha Vantage Docs](https://www.alphavantage.co/documentation/)
- [Finnhub Docs](https://finnhub.io/docs/api)
- [NewsAPI Docs](https://newsapi.org/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Polygon.io Docs](https://polygon.io/docs)

---

**Note**: Always check the terms of service for each API provider and ensure you comply with rate limits and usage restrictions.
