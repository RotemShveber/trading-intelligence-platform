# Testing Your Supabase Integration

Your dev server is running at **http://localhost:3001**

## Quick Test Links

### 1. Test Connection
**URL:** http://localhost:3001/api/supabase-test

**Expected Response:**
```json
{
  "status": "connected",
  "message": "Supabase client is configured correctly",
  "note": "Create your tables in Supabase dashboard"
}
```

### 2. Interactive Test Page
**URL:** http://localhost:3001/test-supabase

This page includes:
- ✅ Connection status check
- ✅ Environment variables verification
- ✅ Interactive test buttons
- ✅ Live news article display
- ✅ Code examples

## Testing API Endpoints

### Watchlist APIs

```bash
# Create a watchlist (replace USER_ID with your test user ID)
curl -X POST http://localhost:3001/api/watchlist \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user-123","name":"Tech Stocks","description":"My tech watchlist","isPublic":false}'

# Get user's watchlists
curl "http://localhost:3001/api/watchlist?userId=test-user-123"

# Add stock to watchlist (replace WATCHLIST_ID)
curl -X POST http://localhost:3001/api/watchlist/WATCHLIST_ID/items \
  -H "Content-Type: application/json" \
  -d '{"symbol":"AAPL","name":"Apple Inc.","type":"stock","notes":"Long term hold"}'

# Get watchlist items
curl "http://localhost:3001/api/watchlist/WATCHLIST_ID/items"

# Remove from watchlist
curl -X DELETE "http://localhost:3001/api/watchlist/WATCHLIST_ID/items?symbol=AAPL"
```

### Portfolio APIs

```bash
# Add a holding
curl -X POST http://localhost:3001/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user-123","symbol":"AAPL","name":"Apple Inc.","quantity":100,"averageCost":150.25,"currency":"USD","notes":"Bought on dip"}'

# Get portfolio
curl "http://localhost:3001/api/portfolio?userId=test-user-123"

# Record a transaction
curl -X POST http://localhost:3001/api/portfolio/transactions \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user-123","symbol":"AAPL","type":"buy","quantity":10,"price":155.50,"fees":1.99,"transactionDate":"2025-11-03T00:00:00Z"}'

# Get transactions
curl "http://localhost:3001/api/portfolio/transactions?userId=test-user-123"

# Get transactions for specific symbol
curl "http://localhost:3001/api/portfolio/transactions?userId=test-user-123&symbol=AAPL"
```

### Alert APIs

```bash
# Create price alert
curl -X POST http://localhost:3001/api/alerts \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user-123","symbol":"AAPL","alertType":"price","condition":"above","threshold":200}'

# Get active alerts
curl "http://localhost:3001/api/alerts?userId=test-user-123"

# Delete alert (replace ALERT_ID)
curl -X DELETE "http://localhost:3001/api/alerts?alertId=ALERT_ID"
```

### News APIs

```bash
# Get news from Supabase
curl "http://localhost:3001/api/news/supabase?limit=10"

# Filter by sentiment
curl "http://localhost:3001/api/news/supabase?sentiment=bullish&limit=10"

# Filter by source
curl "http://localhost:3001/api/news/supabase?source=CNBC&limit=10"

# Get news for specific symbol
curl "http://localhost:3001/api/news/supabase?symbol=AAPL&limit=10"

# Store a news article
curl -X POST http://localhost:3001/api/news/supabase \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Test Article",
    "content":"Test content",
    "source":"Test Source",
    "url":"https://example.com/test-'$(date +%s)'",
    "sentiment":"bullish",
    "impact":"high",
    "publishedAt":"'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "symbols":["AAPL","MSFT"]
  }'

# Get sentiment summary for a symbol
curl "http://localhost:3001/api/sentiment/AAPL?days=7"
```

## Before You Can Use the Database

1. **Create the tables in Supabase:**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Navigate to **SQL Editor**
   - Copy the entire contents of `supabase/schema.sql`
   - Paste and click **Run**

2. **Verify tables were created:**
   - Go to **Table Editor**
   - You should see all 11 tables listed

## Expected Behavior

### Before Creating Tables
- API calls will return error: `"relation does not exist"`
- Test page will show helpful instructions to create tables

### After Creating Tables
- All API endpoints will work
- You can insert, read, update, and delete data
- Row Level Security (RLS) will ensure data isolation

## Using Helper Functions in Code

```typescript
// Import helpers
import {
  watchlistHelpers,
  newsHelpers,
  portfolioHelpers,
  alertHelpers,
  marketDataHelpers,
  userHelpers
} from '@/lib/supabase-helpers'

// Example: Create watchlist
const { data, error } = await watchlistHelpers.createWatchlist(
  userId,
  "My Watchlist",
  "Description",
  false
)

// Example: Get news with sentiment
const { data, error } = await newsHelpers.getNews({
  sentiment: 'bullish',
  limit: 10
})

// Example: Add to portfolio
const { data, error } = await portfolioHelpers.addHolding(userId, {
  symbol: "AAPL",
  name: "Apple Inc.",
  quantity: 100,
  averageCost: 150.25
})
```

## Common Testing Scenarios

### Scenario 1: User Creates Watchlist and Adds Stocks

```bash
# 1. Create watchlist
curl -X POST http://localhost:3001/api/watchlist \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user","name":"Tech Watch","isPublic":false}'

# Note the returned watchlist ID, then:

# 2. Add stocks
curl -X POST http://localhost:3001/api/watchlist/YOUR_ID/items \
  -H "Content-Type: application/json" \
  -d '{"symbol":"AAPL","name":"Apple","type":"stock"}'

curl -X POST http://localhost:3001/api/watchlist/YOUR_ID/items \
  -H "Content-Type: application/json" \
  -d '{"symbol":"GOOGL","name":"Google","type":"stock"}'

# 3. View watchlist
curl "http://localhost:3001/api/watchlist/YOUR_ID/items"
```

### Scenario 2: Track Portfolio Performance

```bash
# 1. Add holdings
curl -X POST http://localhost:3001/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user","symbol":"AAPL","name":"Apple","quantity":50,"averageCost":145.00}'

# 2. Record transactions
curl -X POST http://localhost:3001/api/portfolio/transactions \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user","symbol":"AAPL","type":"buy","quantity":50,"price":145.00,"transactionDate":"2025-11-01T00:00:00Z"}'

# 3. View portfolio
curl "http://localhost:3001/api/portfolio?userId=test-user"
```

### Scenario 3: News and Sentiment Tracking

```bash
# 1. Store news articles (do this a few times with different sentiments)
curl -X POST http://localhost:3001/api/news/supabase \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Apple Announces New Product",
    "source":"CNBC",
    "url":"https://example.com/1",
    "sentiment":"bullish",
    "publishedAt":"'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "symbols":["AAPL"]
  }'

# 2. Get sentiment summary
curl "http://localhost:3001/api/sentiment/AAPL?days=7"
```

## Documentation

- **Full Usage Guide:** See `SUPABASE_USAGE.md`
- **Database Schema:** See `supabase/schema.sql`
- **Setup Instructions:** See `supabase/README.md`

## Troubleshooting

### Problem: "relation does not exist" error
**Solution:** You need to run the schema.sql in your Supabase dashboard first

### Problem: "Missing Supabase environment variables"
**Solution:** Your `.env.local` is already configured with credentials

### Problem: "Row Level Security" errors
**Solution:** Make sure you're using the correct userId that matches the data owner

### Problem: API returns empty array
**Solution:** This is normal if no data exists yet. Insert some test data first.

## Next Steps

1. ✅ Test the connection (you've already done this!)
2. Create tables in Supabase dashboard
3. Test inserting data via the test page
4. Try the API endpoints with curl
5. Integrate into your existing React components
6. Set up Supabase Auth for real user management

Happy testing! 🚀
