import { NextResponse } from "next/server";

export async function GET() {
  // This is a mock implementation
  // Replace with actual API calls to financial data providers like:
  // - Alpha Vantage
  // - Finnhub
  // - Polygon.io
  // - Yahoo Finance API

  const mockData = {
    indices: {
      sp500: { value: 4783.45, change: 1.2 },
      nasdaq: { value: 15011.35, change: 0.8 },
      dow: { value: 37305.16, change: -0.3 },
    },
    trendingStocks: [
      { symbol: "AAPL", price: 182.45, change: 2.4, volume: "52.3M" },
      { symbol: "TSLA", price: 238.72, change: 5.1, volume: "98.7M" },
      { symbol: "NVDA", price: 495.22, change: 3.8, volume: "45.2M" },
    ],
    lastUpdated: new Date().toISOString(),
  };

  return NextResponse.json(mockData);
}
