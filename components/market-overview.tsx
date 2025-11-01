"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export function MarketOverview() {
  const marketNews = [
    {
      id: 1,
      title: "Tech Stocks Rally on Strong Earnings Reports",
      source: "CNBC",
      time: "5 min ago",
      sentiment: "positive",
      impact: "high",
    },
    {
      id: 2,
      title: "Federal Reserve Signals Potential Rate Cut",
      source: "Bloomberg",
      time: "15 min ago",
      sentiment: "neutral",
      impact: "high",
    },
    {
      id: 3,
      title: "Energy Sector Shows Mixed Performance",
      source: "Reuters",
      time: "1 hour ago",
      sentiment: "neutral",
      impact: "medium",
    },
    {
      id: 4,
      title: "Retail Sales Beat Expectations in Q4",
      source: "WSJ",
      time: "2 hours ago",
      sentiment: "positive",
      impact: "medium",
    },
  ];

  const marketMovers = [
    { sector: "Technology", change: "+2.3%", isPositive: true },
    { sector: "Healthcare", change: "+1.1%", isPositive: true },
    { sector: "Financials", change: "-0.8%", isPositive: false },
    { sector: "Energy", change: "+0.5%", isPositive: true },
    { sector: "Consumer", change: "+1.7%", isPositive: true },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Latest Market News</CardTitle>
          <CardDescription>Real-time updates from trusted sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketNews.map((news) => (
              <div
                key={news.id}
                className="p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold leading-tight">{news.title}</h3>
                    <Badge
                      variant={
                        news.sentiment === "positive"
                          ? "default"
                          : news.sentiment === "negative"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {news.impact}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="font-medium">{news.source}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sector Performance</CardTitle>
          <CardDescription>Today's sector movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketMovers.map((mover) => (
              <div
                key={mover.sector}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <span className="font-medium">{mover.sector}</span>
                <Badge variant={mover.isPositive ? "default" : "destructive"}>
                  {mover.change}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-muted">
            <h4 className="font-semibold mb-2">Market Sentiment</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">65%</div>
                <div className="text-xs text-muted-foreground">Bullish</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">20%</div>
                <div className="text-xs text-muted-foreground">Neutral</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">15%</div>
                <div className="text-xs text-muted-foreground">Bearish</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
