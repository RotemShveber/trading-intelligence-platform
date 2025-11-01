import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source");
  const sentiment = searchParams.get("sentiment");

  // This is a mock implementation
  // Replace with actual API calls to news providers:
  // - NewsAPI
  // - Alpha Vantage News
  // - Finnhub News
  // - Twitter API for social sentiment
  // - Reddit API for r/wallstreetbets

  const mockNews = [
    {
      id: 1,
      title: "Tech Stocks Rally on Strong Earnings",
      source: "CNBC",
      content: "Major technology companies reported better than expected earnings...",
      sentiment: "bullish",
      impact: "high",
      stocks: ["AAPL", "MSFT", "GOOGL"],
      timestamp: new Date().toISOString(),
      url: "https://example.com/news/1",
    },
    {
      id: 2,
      title: "Federal Reserve Minutes Show Dovish Stance",
      source: "Bloomberg",
      content: "The Federal Reserve released meeting minutes indicating...",
      sentiment: "neutral",
      impact: "high",
      stocks: ["SPY", "TLT"],
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      url: "https://example.com/news/2",
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
