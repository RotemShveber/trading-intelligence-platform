# Supabase Setup Instructions

This directory contains the database schema and setup instructions for the Trading Intelligence Platform.

## Quick Setup

### 1. Create Tables

1. Go to your Supabase project dashboard at https://supabase.com/dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `schema.sql` and paste it into the SQL editor
5. Click **Run** to execute the SQL and create all tables

### 2. Verify Tables

After running the schema, verify that all tables were created:

1. Navigate to **Table Editor** in the left sidebar
2. You should see the following tables:
   - `user_profiles`
   - `watchlists`
   - `watchlist_items`
   - `news_articles`
   - `news_article_stocks`
   - `user_alerts`
   - `portfolio_holdings`
   - `portfolio_transactions`
   - `saved_analyses`
   - `user_preferences`
   - `stock_price_history`

## Database Schema Overview

### User Management
- **user_profiles**: Extended user profile information
- **user_preferences**: User settings and preferences

### Watchlists
- **watchlists**: User-created stock watchlists
- **watchlist_items**: Stocks/ETFs in each watchlist

### News & Analysis
- **news_articles**: Financial news articles with sentiment analysis
- **news_article_stocks**: Many-to-many relationship between news and stocks
- **saved_analyses**: User's saved market analyses

### Portfolio Management
- **portfolio_holdings**: User's current stock positions
- **portfolio_transactions**: History of buy/sell transactions

### Alerts
- **user_alerts**: Price alerts and notifications

### Market Data Cache
- **stock_price_history**: Cached historical price data

## Row Level Security (RLS)

All tables have Row Level Security enabled to ensure users can only access their own data:

- Users can only view/edit their own watchlists, portfolios, alerts, etc.
- News articles and price data are publicly readable
- Public watchlists and analyses can be viewed by anyone

## Optional: Sample Data

The schema includes commented-out sample data at the bottom. To insert sample news articles for testing:

1. Open `schema.sql`
2. Uncomment the section under "SAMPLE DATA"
3. Run that section in the SQL Editor

## Authentication Setup

To enable user authentication:

1. Go to **Authentication** > **Providers** in Supabase dashboard
2. Enable the authentication methods you want:
   - Email/Password
   - OAuth (Google, GitHub, etc.)
   - Magic Link
3. Configure email templates under **Authentication** > **Email Templates**

## Next Steps

After setting up the database:

1. Your Next.js app is already configured to connect to Supabase
2. Use the Supabase client in your code:
   ```typescript
   import { supabase } from '@/lib/supabase'
   ```
3. Start building features:
   - User authentication
   - Watchlist management
   - Portfolio tracking
   - News aggregation
   - Price alerts

## Testing the Connection

You can test the Supabase connection by:

1. Starting your Next.js dev server: `npm run dev`
2. Visiting: http://localhost:3000/api/supabase-test
3. You should see a success message if everything is configured correctly

## Useful Supabase Documentation

- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [JavaScript Client Library](https://supabase.com/docs/reference/javascript/introduction)
- [Database Functions](https://supabase.com/docs/guides/database/functions)
- [Realtime Subscriptions](https://supabase.com/docs/guides/realtime)
