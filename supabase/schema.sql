-- Trading Intelligence Platform Database Schema
-- Run this in your Supabase SQL Editor to create all necessary tables

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USER PROFILES
-- ============================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- WATCHLISTS
-- ============================================
CREATE TABLE IF NOT EXISTS watchlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- ============================================
-- WATCHLIST ITEMS
-- ============================================
CREATE TABLE IF NOT EXISTS watchlist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  watchlist_id UUID REFERENCES watchlists(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  name TEXT,
  type TEXT CHECK (type IN ('stock', 'etf', 'crypto')),
  notes TEXT,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(watchlist_id, symbol)
);

-- ============================================
-- NEWS ARTICLES
-- ============================================
CREATE TABLE IF NOT EXISTS news_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  source TEXT NOT NULL,
  url TEXT UNIQUE NOT NULL,
  sentiment TEXT CHECK (sentiment IN ('bullish', 'bearish', 'neutral')),
  impact TEXT CHECK (impact IN ('high', 'medium', 'low')),
  published_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NEWS ARTICLE STOCKS (Many-to-Many relationship)
-- ============================================
CREATE TABLE IF NOT EXISTS news_article_stocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID REFERENCES news_articles(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  UNIQUE(article_id, symbol)
);

-- ============================================
-- USER ALERTS
-- ============================================
CREATE TABLE IF NOT EXISTS user_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  alert_type TEXT CHECK (alert_type IN ('price', 'news', 'sentiment', 'volume')),
  condition TEXT NOT NULL, -- e.g., "above", "below", "equals"
  threshold NUMERIC,
  is_active BOOLEAN DEFAULT TRUE,
  triggered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PORTFOLIO HOLDINGS
-- ============================================
CREATE TABLE IF NOT EXISTS portfolio_holdings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  name TEXT,
  quantity NUMERIC NOT NULL CHECK (quantity >= 0),
  average_cost NUMERIC NOT NULL CHECK (average_cost >= 0),
  currency TEXT DEFAULT 'USD',
  notes TEXT,
  acquired_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, symbol)
);

-- ============================================
-- PORTFOLIO TRANSACTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS portfolio_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('buy', 'sell', 'dividend', 'split')),
  quantity NUMERIC NOT NULL,
  price NUMERIC NOT NULL CHECK (price >= 0),
  fees NUMERIC DEFAULT 0 CHECK (fees >= 0),
  notes TEXT,
  transaction_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SAVED MARKET ANALYSIS
-- ============================================
CREATE TABLE IF NOT EXISTS saved_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB NOT NULL, -- Store rich analysis data
  symbols TEXT[], -- Array of related symbols
  tags TEXT[],
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USER PREFERENCES
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'dark' CHECK (theme IN ('light', 'dark', 'auto')),
  default_currency TEXT DEFAULT 'USD',
  news_sources TEXT[], -- Array of preferred news sources
  notification_settings JSONB DEFAULT '{"email": true, "push": false}'::jsonb,
  display_settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STOCK PRICE HISTORY (For caching)
-- ============================================
CREATE TABLE IF NOT EXISTS stock_price_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  symbol TEXT NOT NULL,
  price NUMERIC NOT NULL,
  open NUMERIC,
  high NUMERIC,
  low NUMERIC,
  close NUMERIC,
  volume BIGINT,
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(symbol, timestamp)
);

-- ============================================
-- INDEXES for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_watchlists_user_id ON watchlists(user_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_items_watchlist_id ON watchlist_items(watchlist_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_items_symbol ON watchlist_items(symbol);
CREATE INDEX IF NOT EXISTS idx_news_articles_published_at ON news_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_articles_sentiment ON news_articles(sentiment);
CREATE INDEX IF NOT EXISTS idx_news_article_stocks_symbol ON news_article_stocks(symbol);
CREATE INDEX IF NOT EXISTS idx_news_article_stocks_article_id ON news_article_stocks(article_id);
CREATE INDEX IF NOT EXISTS idx_user_alerts_user_id ON user_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_alerts_symbol ON user_alerts(symbol);
CREATE INDEX IF NOT EXISTS idx_portfolio_holdings_user_id ON portfolio_holdings(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_transactions_user_id ON portfolio_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_transactions_symbol ON portfolio_transactions(symbol);
CREATE INDEX IF NOT EXISTS idx_saved_analyses_user_id ON saved_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_stock_price_history_symbol ON stock_price_history(symbol);
CREATE INDEX IF NOT EXISTS idx_stock_price_history_timestamp ON stock_price_history(timestamp DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_article_stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_price_history ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view all profiles" ON user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Watchlists Policies
CREATE POLICY "Users can view own watchlists" ON watchlists FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can create own watchlists" ON watchlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own watchlists" ON watchlists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own watchlists" ON watchlists FOR DELETE USING (auth.uid() = user_id);

-- Watchlist Items Policies
CREATE POLICY "Users can view watchlist items" ON watchlist_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM watchlists
    WHERE watchlists.id = watchlist_items.watchlist_id
    AND (watchlists.user_id = auth.uid() OR watchlists.is_public = true)
  ));
CREATE POLICY "Users can manage own watchlist items" ON watchlist_items FOR ALL
  USING (EXISTS (
    SELECT 1 FROM watchlists
    WHERE watchlists.id = watchlist_items.watchlist_id
    AND watchlists.user_id = auth.uid()
  ));

-- News Articles Policies (Public read, admin write)
CREATE POLICY "Anyone can view news articles" ON news_articles FOR SELECT USING (true);
CREATE POLICY "Service role can manage news" ON news_articles FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- News Article Stocks Policies
CREATE POLICY "Anyone can view news article stocks" ON news_article_stocks FOR SELECT USING (true);
CREATE POLICY "Service role can manage news stocks" ON news_article_stocks FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- User Alerts Policies
CREATE POLICY "Users can view own alerts" ON user_alerts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own alerts" ON user_alerts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own alerts" ON user_alerts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own alerts" ON user_alerts FOR DELETE USING (auth.uid() = user_id);

-- Portfolio Holdings Policies
CREATE POLICY "Users can view own holdings" ON portfolio_holdings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own holdings" ON portfolio_holdings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own holdings" ON portfolio_holdings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own holdings" ON portfolio_holdings FOR DELETE USING (auth.uid() = user_id);

-- Portfolio Transactions Policies
CREATE POLICY "Users can view own transactions" ON portfolio_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own transactions" ON portfolio_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own transactions" ON portfolio_transactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own transactions" ON portfolio_transactions FOR DELETE USING (auth.uid() = user_id);

-- Saved Analyses Policies
CREATE POLICY "Users can view own or public analyses" ON saved_analyses FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can create own analyses" ON saved_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own analyses" ON saved_analyses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own analyses" ON saved_analyses FOR DELETE USING (auth.uid() = user_id);

-- User Preferences Policies
CREATE POLICY "Users can view own preferences" ON user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own preferences" ON user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON user_preferences FOR UPDATE USING (auth.uid() = user_id);

-- Stock Price History Policies (Public read, service write)
CREATE POLICY "Anyone can view stock prices" ON stock_price_history FOR SELECT USING (true);
CREATE POLICY "Service role can manage prices" ON stock_price_history FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_watchlists_updated_at BEFORE UPDATE ON watchlists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE ON news_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_alerts_updated_at BEFORE UPDATE ON user_alerts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_holdings_updated_at BEFORE UPDATE ON portfolio_holdings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_analyses_updated_at BEFORE UPDATE ON saved_analyses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Uncomment below to insert sample news articles
/*
INSERT INTO news_articles (title, content, source, url, sentiment, impact, published_at) VALUES
  ('NVIDIA Reports Record Q4 Earnings, Stock Surges 8%',
   'NVIDIA Corporation exceeded analyst expectations with record Q4 earnings driven by AI chip demand.',
   'CNBC',
   'https://www.cnbc.com/nvidia-earnings-sample',
   'bullish',
   'high',
   NOW() - INTERVAL '1 hour'),
  ('Federal Reserve Signals Potential Rate Cuts in 2025',
   'The Federal Reserve released meeting minutes indicating potential interest rate cuts later this year.',
   'Bloomberg',
   'https://www.bloomberg.com/fed-minutes-sample',
   'neutral',
   'high',
   NOW() - INTERVAL '2 hours')
ON CONFLICT (url) DO NOTHING;

-- Insert related stocks for the sample articles
INSERT INTO news_article_stocks (article_id, symbol)
SELECT id, 'NVDA' FROM news_articles WHERE url = 'https://www.cnbc.com/nvidia-earnings-sample'
UNION ALL
SELECT id, 'AMD' FROM news_articles WHERE url = 'https://www.cnbc.com/nvidia-earnings-sample'
UNION ALL
SELECT id, 'SPY' FROM news_articles WHERE url = 'https://www.bloomberg.com/fed-minutes-sample'
ON CONFLICT (article_id, symbol) DO NOTHING;
*/
