# Supabase Integration - Usage Guide

This document shows how to use the Supabase functions in your Trading Intelligence Platform.

## Helper Functions

All helper functions are located in `lib/supabase-helpers.ts` and organized by feature area.

### 1. Watchlist Management

```typescript
import { watchlistHelpers } from '@/lib/supabase-helpers'

// Create a new watchlist
const { data, error } = await watchlistHelpers.createWatchlist(
  userId,
  "Tech Stocks",
  "My favorite tech companies",
  false // isPublic
)

// Get all user's watchlists
const { data, error } = await watchlistHelpers.getUserWatchlists(userId)

// Add stock to watchlist
await watchlistHelpers.addToWatchlist(
  watchlistId,
  "AAPL",
  "Apple Inc.",
  "stock",
  "Buy on dip"
)

// Remove from watchlist
await watchlistHelpers.removeFromWatchlist(watchlistId, "AAPL")

// Check if symbol is in any watchlist
const { isInWatchlist, watchlists } = await watchlistHelpers.isInWatchlist(userId, "AAPL")
```

### 2. News & Sentiment

```typescript
import { newsHelpers } from '@/lib/supabase-helpers'

// Store a news article
await newsHelpers.storeNewsArticle({
  title: "NVIDIA Earnings Beat",
  content: "Full article content...",
  source: "CNBC",
  url: "https://...",
  sentiment: "bullish",
  impact: "high",
  publishedAt: new Date().toISOString(),
  symbols: ["NVDA", "AMD"]
})

// Get latest news
const { data, error } = await newsHelpers.getNews({
  limit: 10,
  sentiment: "bullish", // optional
  source: "CNBC" // optional
})

// Get news for specific symbol
const { data, error } = await newsHelpers.getNewsBySymbol("AAPL", 10)

// Get sentiment summary
const { data, error } = await newsHelpers.getSentimentSummary("AAPL", 7) // last 7 days
// Returns: { bullish: 5, bearish: 2, neutral: 3 }
```

### 3. Portfolio Management

```typescript
import { portfolioHelpers } from '@/lib/supabase-helpers'

// Add a holding
await portfolioHelpers.addHolding(userId, {
  symbol: "AAPL",
  name: "Apple Inc.",
  quantity: 100,
  averageCost: 150.25,
  currency: "USD",
  notes: "Long-term hold"
})

// Get all holdings
const { data, error } = await portfolioHelpers.getHoldings(userId)

// Record a transaction
await portfolioHelpers.addTransaction(userId, {
  symbol: "AAPL",
  type: "buy",
  quantity: 10,
  price: 155.50,
  fees: 1.99,
  transactionDate: new Date().toISOString()
})

// Get transaction history
const { data, error } = await portfolioHelpers.getTransactions(userId)
// Or for specific symbol:
const { data, error } = await portfolioHelpers.getTransactions(userId, "AAPL")

// Get portfolio summary
const { data, error } = await portfolioHelpers.getPortfolioSummary(userId)
// Returns: { holdings, totalCostBasis, holdingsCount, symbols }
```

### 4. Price Alerts

```typescript
import { alertHelpers } from '@/lib/supabase-helpers'

// Create a price alert
await alertHelpers.createAlert(userId, {
  symbol: "AAPL",
  alertType: "price",
  condition: "above",
  threshold: 200
})

// Get active alerts
const { data, error } = await alertHelpers.getActiveAlerts(userId)

// Trigger/deactivate alert
await alertHelpers.triggerAlert(alertId)

// Delete alert
await alertHelpers.deleteAlert(alertId)
```

### 5. Market Data Cache

```typescript
import { marketDataHelpers } from '@/lib/supabase-helpers'

// Cache price data
await marketDataHelpers.cachePriceData("AAPL", {
  price: 155.50,
  open: 154.25,
  high: 156.00,
  low: 154.00,
  close: 155.50,
  volume: 50000000,
  timestamp: new Date().toISOString()
})

// Get price history
const { data, error } = await marketDataHelpers.getPriceHistory("AAPL", 30) // last 30 days

// Get latest price
const { data, error } = await marketDataHelpers.getLatestPrice("AAPL")
```

### 6. User Preferences

```typescript
import { userHelpers } from '@/lib/supabase-helpers'

// Get or create preferences
const { data, error } = await userHelpers.getPreferences(userId)

// Update preferences
await userHelpers.updatePreferences(userId, {
  theme: "dark",
  defaultCurrency: "USD",
  newsSources: ["CNBC", "Bloomberg", "Reuters"],
  notificationSettings: { email: true, push: false }
})
```

## API Routes

All API routes are REST-based and ready to use. Here are the available endpoints:

### Watchlist APIs

```bash
# Get all watchlists
GET /api/watchlist?userId=xxx

# Create watchlist
POST /api/watchlist
Body: { userId, name, description, isPublic }

# Get watchlist items
GET /api/watchlist/[id]/items

# Add to watchlist
POST /api/watchlist/[id]/items
Body: { symbol, name, type, notes }

# Remove from watchlist
DELETE /api/watchlist/[id]/items?symbol=AAPL
```

### Portfolio APIs

```bash
# Get portfolio
GET /api/portfolio?userId=xxx

# Add holding
POST /api/portfolio
Body: { userId, symbol, name, quantity, averageCost, currency, notes }

# Get transactions
GET /api/portfolio/transactions?userId=xxx&symbol=AAPL

# Add transaction
POST /api/portfolio/transactions
Body: { userId, symbol, type, quantity, price, fees, notes, transactionDate }
```

### Alert APIs

```bash
# Get alerts
GET /api/alerts?userId=xxx

# Create alert
POST /api/alerts
Body: { userId, symbol, alertType, condition, threshold }

# Delete alert
DELETE /api/alerts?alertId=xxx
```

### News & Sentiment APIs

```bash
# Get news from Supabase
GET /api/news/supabase?sentiment=bullish&source=CNBC&limit=20

# Get news for symbol
GET /api/news/supabase?symbol=AAPL&limit=10

# Store news article
POST /api/news/supabase
Body: { title, content, source, url, sentiment, impact, publishedAt, symbols }

# Get sentiment summary
GET /api/sentiment/[symbol]?days=7
```

## Usage in React Components

### Example: Watchlist Component

```typescript
'use client'

import { useEffect, useState } from 'react'
import { watchlistHelpers } from '@/lib/supabase-helpers'

export function WatchlistComponent({ userId }: { userId: string }) {
  const [watchlists, setWatchlists] = useState([])

  useEffect(() => {
    loadWatchlists()
  }, [])

  const loadWatchlists = async () => {
    const { data } = await watchlistHelpers.getUserWatchlists(userId)
    setWatchlists(data || [])
  }

  const addStock = async (watchlistId: string) => {
    await watchlistHelpers.addToWatchlist(
      watchlistId,
      "AAPL",
      "Apple Inc.",
      "stock"
    )
    loadWatchlists() // Refresh
  }

  return (
    <div>
      {watchlists.map(wl => (
        <div key={wl.id}>
          <h3>{wl.name}</h3>
          <button onClick={() => addStock(wl.id)}>Add AAPL</button>
        </div>
      ))}
    </div>
  )
}
```

### Example: Sentiment Display

```typescript
'use client'

import { useEffect, useState } from 'react'
import { newsHelpers } from '@/lib/supabase-helpers'

export function SentimentDisplay({ symbol }: { symbol: string }) {
  const [sentiment, setSentiment] = useState(null)

  useEffect(() => {
    loadSentiment()
  }, [symbol])

  const loadSentiment = async () => {
    const { data } = await newsHelpers.getSentimentSummary(symbol, 7)
    setSentiment(data)
  }

  if (!sentiment) return <div>Loading...</div>

  return (
    <div>
      <h3>Sentiment for {symbol}</h3>
      <div>Bullish: {sentiment.bullish}</div>
      <div>Bearish: {sentiment.bearish}</div>
      <div>Neutral: {sentiment.neutral}</div>
    </div>
  )
}
```

## Testing

Visit the test page to try out all features:
```
http://localhost:3001/test-supabase
```

This page provides:
- Connection status check
- Environment variable verification
- Interactive buttons to test CRUD operations
- Code examples for each feature

## Important Notes

1. **User Authentication**: These examples assume you have a `userId`. You'll need to implement Supabase Auth to get real user IDs.

2. **Row Level Security**: All tables have RLS enabled. Users can only access their own data.

3. **Error Handling**: Always check for errors in the response:
   ```typescript
   const { data, error } = await someFunction()
   if (error) {
     console.error('Error:', error.message)
     // Handle error
   }
   ```

4. **Type Safety**: Consider adding TypeScript types for your database schema using Supabase's type generation:
   ```bash
   npx supabase gen types typescript --project-id your-project-id > lib/database.types.ts
   ```

5. **Real-time Subscriptions**: You can subscribe to changes:
   ```typescript
   const channel = supabase
     .channel('watchlist-changes')
     .on('postgres_changes', {
       event: '*',
       schema: 'public',
       table: 'watchlist_items'
     }, (payload) => {
       console.log('Change detected!', payload)
     })
     .subscribe()
   ```

## Next Steps

1. Set up Supabase Auth for user management
2. Integrate these functions into your existing components
3. Add real-time subscriptions for live updates
4. Implement caching strategies for better performance
5. Add analytics and monitoring
