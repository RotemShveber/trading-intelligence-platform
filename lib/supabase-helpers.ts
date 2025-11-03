import { supabase } from './supabase'

// ============================================
// WATCHLIST FUNCTIONS
// ============================================

export const watchlistHelpers = {
  /**
   * Create a new watchlist for a user
   */
  async createWatchlist(userId: string, name: string, description?: string, isPublic: boolean = false) {
    const { data, error } = await supabase
      .from('watchlists')
      .insert([{ user_id: userId, name, description, is_public: isPublic }])
      .select()
      .single()

    return { data, error }
  },

  /**
   * Get all watchlists for a user
   */
  async getUserWatchlists(userId: string) {
    const { data, error } = await supabase
      .from('watchlists')
      .select('*, watchlist_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return { data, error }
  },

  /**
   * Add a stock/ETF to a watchlist
   */
  async addToWatchlist(watchlistId: string, symbol: string, name: string, type: 'stock' | 'etf' | 'crypto', notes?: string) {
    const { data, error } = await supabase
      .from('watchlist_items')
      .insert([{ watchlist_id: watchlistId, symbol, name, type, notes }])
      .select()
      .single()

    return { data, error }
  },

  /**
   * Remove a stock/ETF from a watchlist
   */
  async removeFromWatchlist(watchlistId: string, symbol: string) {
    const { error } = await supabase
      .from('watchlist_items')
      .delete()
      .eq('watchlist_id', watchlistId)
      .eq('symbol', symbol)

    return { error }
  },

  /**
   * Get all items in a watchlist
   */
  async getWatchlistItems(watchlistId: string) {
    const { data, error } = await supabase
      .from('watchlist_items')
      .select('*')
      .eq('watchlist_id', watchlistId)
      .order('added_at', { ascending: false })

    return { data, error }
  },

  /**
   * Check if a symbol is in any of user's watchlists
   */
  async isInWatchlist(userId: string, symbol: string) {
    const { data, error } = await supabase
      .from('watchlist_items')
      .select('watchlist_id, watchlists!inner(user_id)')
      .eq('symbol', symbol)
      .eq('watchlists.user_id', userId)

    return { isInWatchlist: (data?.length || 0) > 0, watchlists: data, error }
  }
}

// ============================================
// NEWS FUNCTIONS
// ============================================

export const newsHelpers = {
  /**
   * Store news article with sentiment analysis
   */
  async storeNewsArticle(article: {
    title: string
    content: string
    source: string
    url: string
    sentiment: 'bullish' | 'bearish' | 'neutral'
    impact: 'high' | 'medium' | 'low'
    publishedAt: string
    symbols: string[]
  }) {
    // Insert article
    const { data: articleData, error: articleError } = await supabase
      .from('news_articles')
      .insert([{
        title: article.title,
        content: article.content,
        source: article.source,
        url: article.url,
        sentiment: article.sentiment,
        impact: article.impact,
        published_at: article.publishedAt
      }])
      .select()
      .single()

    if (articleError) return { data: null, error: articleError }

    // Insert related symbols
    if (article.symbols.length > 0 && articleData) {
      const symbolInserts = article.symbols.map(symbol => ({
        article_id: articleData.id,
        symbol: symbol.toUpperCase()
      }))

      const { error: symbolsError } = await supabase
        .from('news_article_stocks')
        .insert(symbolInserts)

      if (symbolsError) return { data: articleData, error: symbolsError }
    }

    return { data: articleData, error: null }
  },

  /**
   * Get latest news articles with optional filters
   */
  async getNews(options?: {
    limit?: number
    sentiment?: 'bullish' | 'bearish' | 'neutral'
    source?: string
    symbols?: string[]
  }) {
    let query = supabase
      .from('news_articles')
      .select('*, news_article_stocks(symbol)')
      .order('published_at', { ascending: false })

    if (options?.sentiment) {
      query = query.eq('sentiment', options.sentiment)
    }

    if (options?.source) {
      query = query.eq('source', options.source)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    const { data, error } = await query

    // Filter by symbols if provided
    let filteredData = data
    if (options?.symbols && data) {
      filteredData = data.filter(article =>
        article.news_article_stocks.some((s: any) =>
          options.symbols!.includes(s.symbol)
        )
      )
    }

    return { data: filteredData, error }
  },

  /**
   * Get news for specific symbol
   */
  async getNewsBySymbol(symbol: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('news_article_stocks')
      .select('news_articles(*)')
      .eq('symbol', symbol.toUpperCase())
      .order('created_at', { ascending: false })
      .limit(limit)

    return { data, error }
  },

  /**
   * Get sentiment summary for a symbol
   */
  async getSentimentSummary(symbol: string, days: number = 7) {
    const dateFrom = new Date()
    dateFrom.setDate(dateFrom.getDate() - days)

    const { data, error } = await supabase
      .from('news_article_stocks')
      .select('news_articles(sentiment, published_at)')
      .eq('symbol', symbol.toUpperCase())
      .gte('news_articles.published_at', dateFrom.toISOString())

    if (error) return { data: null, error }

    // Calculate sentiment counts
    const sentimentCounts = { bullish: 0, bearish: 0, neutral: 0 }
    data?.forEach((item: any) => {
      const sentiment = item.news_articles?.sentiment
      if (sentiment) sentimentCounts[sentiment]++
    })

    return { data: sentimentCounts, error: null }
  }
}

// ============================================
// PORTFOLIO FUNCTIONS
// ============================================

export const portfolioHelpers = {
  /**
   * Add a holding to user's portfolio
   */
  async addHolding(userId: string, holding: {
    symbol: string
    name: string
    quantity: number
    averageCost: number
    currency?: string
    notes?: string
  }) {
    const { data, error } = await supabase
      .from('portfolio_holdings')
      .insert([{
        user_id: userId,
        symbol: holding.symbol.toUpperCase(),
        name: holding.name,
        quantity: holding.quantity,
        average_cost: holding.averageCost,
        currency: holding.currency || 'USD',
        notes: holding.notes
      }])
      .select()
      .single()

    return { data, error }
  },

  /**
   * Get all holdings for a user
   */
  async getHoldings(userId: string) {
    const { data, error } = await supabase
      .from('portfolio_holdings')
      .select('*')
      .eq('user_id', userId)
      .order('symbol', { ascending: true })

    return { data, error }
  },

  /**
   * Record a transaction
   */
  async addTransaction(userId: string, transaction: {
    symbol: string
    type: 'buy' | 'sell' | 'dividend' | 'split'
    quantity: number
    price: number
    fees?: number
    notes?: string
    transactionDate: string
  }) {
    const { data, error } = await supabase
      .from('portfolio_transactions')
      .insert([{
        user_id: userId,
        symbol: transaction.symbol.toUpperCase(),
        transaction_type: transaction.type,
        quantity: transaction.quantity,
        price: transaction.price,
        fees: transaction.fees || 0,
        notes: transaction.notes,
        transaction_date: transaction.transactionDate
      }])
      .select()
      .single()

    return { data, error }
  },

  /**
   * Get transaction history for a user
   */
  async getTransactions(userId: string, symbol?: string) {
    let query = supabase
      .from('portfolio_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('transaction_date', { ascending: false })

    if (symbol) {
      query = query.eq('symbol', symbol.toUpperCase())
    }

    const { data, error } = await query
    return { data, error }
  },

  /**
   * Update holding quantity (after buy/sell)
   */
  async updateHolding(userId: string, symbol: string, newQuantity: number, newAverageCost: number) {
    const { data, error } = await supabase
      .from('portfolio_holdings')
      .update({ quantity: newQuantity, average_cost: newAverageCost })
      .eq('user_id', userId)
      .eq('symbol', symbol.toUpperCase())
      .select()
      .single()

    return { data, error }
  },

  /**
   * Calculate portfolio performance
   */
  async getPortfolioSummary(userId: string) {
    const { data: holdings, error } = await supabase
      .from('portfolio_holdings')
      .select('*')
      .eq('user_id', userId)

    if (error) return { data: null, error }

    // Calculate total cost basis
    const totalCostBasis = holdings?.reduce((sum, h) => sum + (h.quantity * h.average_cost), 0) || 0

    return {
      data: {
        holdings,
        totalCostBasis,
        holdingsCount: holdings?.length || 0,
        symbols: holdings?.map(h => h.symbol) || []
      },
      error: null
    }
  }
}

// ============================================
// ALERTS FUNCTIONS
// ============================================

export const alertHelpers = {
  /**
   * Create a price alert
   */
  async createAlert(userId: string, alert: {
    symbol: string
    alertType: 'price' | 'news' | 'sentiment' | 'volume'
    condition: string
    threshold?: number
  }) {
    const { data, error } = await supabase
      .from('user_alerts')
      .insert([{
        user_id: userId,
        symbol: alert.symbol.toUpperCase(),
        alert_type: alert.alertType,
        condition: alert.condition,
        threshold: alert.threshold,
        is_active: true
      }])
      .select()
      .single()

    return { data, error }
  },

  /**
   * Get all active alerts for a user
   */
  async getActiveAlerts(userId: string) {
    const { data, error } = await supabase
      .from('user_alerts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    return { data, error }
  },

  /**
   * Trigger/deactivate an alert
   */
  async triggerAlert(alertId: string) {
    const { data, error } = await supabase
      .from('user_alerts')
      .update({ is_active: false, triggered_at: new Date().toISOString() })
      .eq('id', alertId)
      .select()
      .single()

    return { data, error }
  },

  /**
   * Delete an alert
   */
  async deleteAlert(alertId: string) {
    const { error } = await supabase
      .from('user_alerts')
      .delete()
      .eq('id', alertId)

    return { error }
  }
}

// ============================================
// MARKET DATA CACHE FUNCTIONS
// ============================================

export const marketDataHelpers = {
  /**
   * Cache stock price data
   */
  async cachePriceData(symbol: string, priceData: {
    price: number
    open?: number
    high?: number
    low?: number
    close?: number
    volume?: number
    timestamp: string
  }) {
    const { data, error } = await supabase
      .from('stock_price_history')
      .insert([{
        symbol: symbol.toUpperCase(),
        price: priceData.price,
        open: priceData.open,
        high: priceData.high,
        low: priceData.low,
        close: priceData.close,
        volume: priceData.volume,
        timestamp: priceData.timestamp
      }])
      .select()
      .single()

    return { data, error }
  },

  /**
   * Get historical price data for a symbol
   */
  async getPriceHistory(symbol: string, days: number = 30) {
    const dateFrom = new Date()
    dateFrom.setDate(dateFrom.getDate() - days)

    const { data, error } = await supabase
      .from('stock_price_history')
      .select('*')
      .eq('symbol', symbol.toUpperCase())
      .gte('timestamp', dateFrom.toISOString())
      .order('timestamp', { ascending: true })

    return { data, error }
  },

  /**
   * Get latest price for a symbol
   */
  async getLatestPrice(symbol: string) {
    const { data, error } = await supabase
      .from('stock_price_history')
      .select('*')
      .eq('symbol', symbol.toUpperCase())
      .order('timestamp', { ascending: false })
      .limit(1)
      .single()

    return { data, error }
  }
}

// ============================================
// USER PREFERENCES
// ============================================

export const userHelpers = {
  /**
   * Get or create user preferences
   */
  async getPreferences(userId: string) {
    let { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single()

    // If preferences don't exist, create default ones
    if (error && error.code === 'PGRST116') {
      const { data: newData, error: insertError } = await supabase
        .from('user_preferences')
        .insert([{ user_id: userId }])
        .select()
        .single()

      return { data: newData, error: insertError }
    }

    return { data, error }
  },

  /**
   * Update user preferences
   */
  async updatePreferences(userId: string, preferences: {
    theme?: 'light' | 'dark' | 'auto'
    defaultCurrency?: string
    newsSources?: string[]
    notificationSettings?: any
    displaySettings?: any
  }) {
    const { data, error } = await supabase
      .from('user_preferences')
      .update(preferences)
      .eq('user_id', userId)
      .select()
      .single()

    return { data, error }
  }
}
