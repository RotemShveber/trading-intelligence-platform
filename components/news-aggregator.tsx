"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsAggregatorProps {
  selectedSource?: string;
  selectedSentiment?: string;
  selectedImpact?: string;
}

export function NewsAggregator({
  selectedSource = "All",
  selectedSentiment = "All",
  selectedImpact = "All",
}: NewsAggregatorProps) {
  const allNewsItems = [
    {
      id: 1,
      title: "NVIDIA Announces New AI Chip, Stock Surges 3.8%",
      source: "CNBC",
      time: "10 min ago",
      content:
        "NVIDIA Corporation unveiled its latest generation of AI processors, leading to a significant rally in tech stocks. The new chip promises 40% better performance for AI workloads.",
      sentiment: "bullish",
      impact: "high",
      stocks: ["NVDA", "AMD", "INTC"],
      url: "#",
    },
    {
      id: 2,
      title: "Federal Reserve Minutes Show Dovish Stance on Interest Rates",
      source: "Bloomberg",
      time: "25 min ago",
      content:
        "Latest meeting minutes from the Federal Reserve indicate a potential shift toward rate cuts in the coming months, signaling confidence in inflation control.",
      sentiment: "neutral",
      impact: "high",
      stocks: ["SPY", "TLT"],
      url: "#",
    },
    {
      id: 3,
      title: "Tesla Reports Record Deliveries in Q4, Beating Estimates",
      source: "Reuters",
      time: "1 hour ago",
      content:
        "Tesla delivered 484,000 vehicles in the fourth quarter, exceeding analyst expectations. The company attributes growth to strong demand in North America and Europe.",
      sentiment: "bullish",
      impact: "medium",
      stocks: ["TSLA"],
      url: "#",
    },
    {
      id: 4,
      title: "Healthcare Stocks Mixed as Medicare Changes Announced",
      source: "WSJ",
      time: "2 hours ago",
      content:
        "New Medicare reimbursement rates create uncertainty in the healthcare sector, with pharmaceutical companies seeing varied reactions from investors.",
      sentiment: "bearish",
      impact: "medium",
      stocks: ["UNH", "CVS", "CI"],
      url: "#",
    },
    {
      id: 5,
      title: "Oil Prices Rise on Supply Concerns",
      source: "TradingView",
      time: "3 hours ago",
      content:
        "Crude oil prices climbed 2.1% amid concerns over potential supply disruptions. Energy sector stocks are showing positive momentum.",
      sentiment: "bullish",
      impact: "medium",
      stocks: ["XOM", "CVX", "USO"],
      url: "#",
    },
  ];

  // Filter news items based on selections
  const newsItems = allNewsItems.filter((item) => {
    const matchesSource = selectedSource === "All" || item.source === selectedSource;
    const matchesSentiment = selectedSentiment === "All" || item.sentiment === selectedSentiment.toLowerCase();
    const matchesImpact = selectedImpact === "All" || item.impact === selectedImpact.toLowerCase();

    return matchesSource && matchesSentiment && matchesImpact;
  });

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "bearish":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "text-green-600";
      case "bearish":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <div className="space-y-4">
      {newsItems.map((news) => (
        <Card key={news.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-start gap-2">
                    {getSentimentIcon(news.sentiment)}
                    <h3 className="font-bold text-lg leading-tight">
                      {news.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="outline">{news.source}</Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{news.time}</span>
                    </div>
                    <Badge
                      variant={
                        news.impact === "high"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {news.impact} impact
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {news.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Related:</span>
                  <div className="flex gap-1">
                    {news.stocks.map((stock) => (
                      <Badge key={stock} variant="secondary" className="text-xs">
                        {stock}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="gap-2">
                  Read more
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>

              <div
                className={`p-3 rounded-lg bg-muted border-l-4 ${
                  news.sentiment === "bullish"
                    ? "border-l-green-600"
                    : news.sentiment === "bearish"
                    ? "border-l-red-600"
                    : "border-l-yellow-600"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">
                    AI ANALYSIS:
                  </span>
                  <p className={`text-xs font-medium ${getSentimentColor(news.sentiment)}`}>
                    {news.sentiment === "bullish" &&
                      "Positive outlook for related stocks. Strong fundamentals and market conditions suggest potential upside."}
                    {news.sentiment === "bearish" &&
                      "Cautious outlook. Investors should monitor developments closely for potential headwinds."}
                    {news.sentiment === "neutral" &&
                      "Mixed signals. Market impact likely to be limited, but monitor for secondary effects."}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
