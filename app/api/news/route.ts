import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source");
  const sentiment = searchParams.get("sentiment");

  // This is a mock implementation
  // Replace with actual API calls to news providers:
  //
  // Integration Guide:
  // 1. NewsAPI (newsapi.org) - Multi-source news aggregation
  //    const newsApiResponse = await fetch(`https://newsapi.org/v2/everything?q=stocks&apiKey=${process.env.NEWS_API_KEY}`);
  //
  // 2. Alpha Vantage News (alphavantage.co)
  //    const avNews = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${process.env.ALPHA_VANTAGE_KEY}`);
  //
  // 3. Finnhub News (finnhub.io)
  //    const finnhubNews = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${process.env.FINNHUB_KEY}`);
  //
  // 4. MarketWatch RSS Feed
  //    Parse RSS: https://www.marketwatch.com/rss/
  //
  // 5. Yahoo Finance (via unofficial API or RSS)
  //    https://finance.yahoo.com/news/rss
  //
  // 6. Seeking Alpha (via web scraping or RSS)
  //    https://seekingalpha.com/market-news
  //
  // 7. Twitter/X API for social sentiment
  //    const tweets = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=stocks`, {headers: {Authorization: `Bearer ${process.env.TWITTER_BEARER}`}});
  //
  // 8. Reddit API for r/wallstreetbets
  //    const reddit = await fetch(`https://www.reddit.com/r/wallstreetbets/hot.json`);

  const mockNews = [
    {
      id: 1,
      title: "NVIDIA Reports Record Q4 Earnings, Stock Surges 8%",
      source: "CNBC",
      content: "NVIDIA Corporation exceeded analyst expectations with record Q4 earnings driven by AI chip demand. Revenue jumped 265% year-over-year to $22.1 billion.",
      sentiment: "bullish",
      impact: "high",
      stocks: ["NVDA", "AMD", "INTC"],
      timestamp: new Date().toISOString(),
      url: "https://www.cnbc.com/nvidia-earnings",
    },
    {
      id: 2,
      title: "Federal Reserve Signals Potential Rate Cuts in 2025",
      source: "Bloomberg",
      content: "The Federal Reserve released meeting minutes indicating potential interest rate cuts later this year as inflation shows signs of cooling.",
      sentiment: "neutral",
      impact: "high",
      stocks: ["SPY", "TLT", "GLD"],
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      url: "https://www.bloomberg.com/fed-minutes",
    },
    {
      id: 3,
      title: "Tesla Deliveries Beat Estimates, Musk Announces New Model",
      source: "Reuters",
      content: "Tesla delivered 484,000 vehicles in Q4, beating Wall Street estimates. CEO Elon Musk announced a new affordable EV model launching in 2025.",
      sentiment: "bullish",
      impact: "medium",
      stocks: ["TSLA", "GM", "F"],
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      url: "https://www.reuters.com/tesla-deliveries",
    },
    {
      id: 4,
      title: "Healthcare Sector Faces Uncertainty from Medicare Changes",
      source: "MarketWatch",
      content: "New Medicare reimbursement rates announced by CMS create uncertainty for pharmaceutical and insurance companies, analysts say.",
      sentiment: "bearish",
      impact: "medium",
      stocks: ["UNH", "CVS", "CI", "PFE"],
      timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
      url: "https://www.marketwatch.com/medicare-changes",
    },
    {
      id: 5,
      title: "Oil Prices Surge on Middle East Supply Concerns",
      source: "WSJ",
      content: "Crude oil prices climbed 3.2% amid concerns over potential supply disruptions in the Middle East. Energy stocks rally across the board.",
      sentiment: "bullish",
      impact: "medium",
      stocks: ["XOM", "CVX", "COP", "USO"],
      timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
      url: "https://www.wsj.com/oil-prices",
    },
    {
      id: 6,
      title: "Apple Vision Pro Pre-Orders Exceed Expectations",
      source: "Yahoo Finance",
      content: "Apple's Vision Pro mixed reality headset sees strong pre-order demand, signaling potential new revenue stream for the tech giant.",
      sentiment: "bullish",
      impact: "medium",
      stocks: ["AAPL", "META", "GOOGL"],
      timestamp: new Date(Date.now() - 150 * 60000).toISOString(),
      url: "https://finance.yahoo.com/apple-vision-pro",
    },
    {
      id: 7,
      title: "Bank Earnings Season Kicks Off with Mixed Results",
      source: "Seeking Alpha",
      content: "Major banks report Q4 earnings with JPMorgan beating estimates while Bank of America misses on net interest income concerns.",
      sentiment: "neutral",
      impact: "high",
      stocks: ["JPM", "BAC", "WFC", "C"],
      timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
      url: "https://seekingalpha.com/bank-earnings",
    },
    {
      id: 8,
      title: "Reddit IPO Filing Reveals Strong User Growth",
      source: "TradingView",
      content: "Social media platform Reddit files for IPO, showing 73 million daily active users and growing advertising revenue.",
      sentiment: "bullish",
      impact: "low",
      stocks: ["META", "SNAP", "PINS"],
      timestamp: new Date(Date.now() - 240 * 60000).toISOString(),
      url: "https://www.tradingview.com/reddit-ipo",
    },
  ];

  // Filter based on query params
  let filteredNews = mockNews;
  if (source && source !== "All") {
    filteredNews = filteredNews.filter((n) => n.source === source);
  }
  if (sentiment && sentiment !== "All") {
    filteredNews = filteredNews.filter((n) => n.sentiment === sentiment.toLowerCase());
  }

  return NextResponse.json({
    news: filteredNews,
    total: filteredNews.length,
    lastUpdated: new Date().toISOString(),
  });
}
