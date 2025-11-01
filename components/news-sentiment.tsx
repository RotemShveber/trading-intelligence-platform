"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

export function NewsSentiment() {
  const sentimentData = {
    overall: "Bullish",
    score: 72,
    breakdown: {
      positive: 58,
      neutral: 27,
      negative: 15,
    },
  };

  const topMentioned = [
    { symbol: "NVDA", mentions: 145, sentiment: "bullish" },
    { symbol: "TSLA", mentions: 112, sentiment: "bullish" },
    { symbol: "AAPL", mentions: 98, sentiment: "neutral" },
    { symbol: "MSFT", mentions: 87, sentiment: "bullish" },
    { symbol: "META", mentions: 73, sentiment: "neutral" },
  ];

  const marketDrivers = [
    { topic: "AI & Technology", trend: "up" },
    { topic: "Fed Policy", trend: "neutral" },
    { topic: "Earnings Season", trend: "up" },
    { topic: "Geopolitical", trend: "down" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overall Sentiment</CardTitle>
          <CardDescription>Aggregate market news sentiment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-green-600">
              {sentimentData.score}%
            </div>
            <Badge className="text-sm">{sentimentData.overall}</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Positive
              </span>
              <span className="font-semibold">{sentimentData.breakdown.positive}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${sentimentData.breakdown.positive}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-yellow-600" />
                Neutral
              </span>
              <span className="font-semibold">{sentimentData.breakdown.neutral}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-yellow-600 h-2 rounded-full"
                style={{ width: `${sentimentData.breakdown.neutral}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                Negative
              </span>
              <span className="font-semibold">{sentimentData.breakdown.negative}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${sentimentData.breakdown.negative}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Most Mentioned</CardTitle>
          <CardDescription>Stocks in the news today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topMentioned.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold">{stock.symbol}</span>
                  {stock.sentiment === "bullish" && (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  )}
                  {stock.sentiment === "bearish" && (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  {stock.sentiment === "neutral" && (
                    <Activity className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <Badge variant="outline">{stock.mentions} mentions</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Drivers</CardTitle>
          <CardDescription>Key themes trending today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {marketDrivers.map((driver) => (
              <div
                key={driver.topic}
                className="flex items-center justify-between p-2 rounded-lg border"
              >
                <span className="text-sm font-medium">{driver.topic}</span>
                {driver.trend === "up" && (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                )}
                {driver.trend === "down" && (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                {driver.trend === "neutral" && (
                  <Activity className="h-4 w-4 text-yellow-600" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
