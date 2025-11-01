import { NextResponse } from "next/server";

export async function GET() {
  // This endpoint can fetch from the Alternative.me Fear & Greed API
  // or calculate a custom index based on multiple indicators

  try {
    // Example: Fetch from Alternative.me API
    // const response = await fetch("https://api.alternative.me/fng/?limit=30");
    // const data = await response.json();

    // Mock data for now
    const mockData = {
      current: {
        value: 68,
        classification: "Greed",
        timestamp: new Date().toISOString(),
      },
      history: [
        { date: "2025-11-01", value: 68 },
        { date: "2025-10-31", value: 65 },
        { date: "2025-10-30", value: 63 },
        { date: "2025-10-29", value: 62 },
        { date: "2025-10-28", value: 59 },
        { date: "2025-10-27", value: 62 },
        { date: "2025-10-26", value: 58 },
      ],
      indicators: [
        { name: "Market Momentum", value: 72 },
        { name: "Stock Price Strength", value: 65 },
        { name: "Stock Price Breadth", value: 58 },
        { name: "Put/Call Options", value: 51 },
        { name: "Junk Bond Demand", value: 69 },
        { name: "Market Volatility", value: 45 },
        { name: "Safe Haven Demand", value: 38 },
      ],
    };

    return NextResponse.json(mockData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Fear & Greed data" },
      { status: 500 }
    );
  }
}
