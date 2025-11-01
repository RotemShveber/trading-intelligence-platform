"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";

export function TrendingStocks() {
  // Mock data - will be replaced with real API data
  const trendingStocks = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: "$182.45",
      change: "+2.4%",
      volume: "52.3M",
      isPositive: true,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: "$238.72",
      change: "+5.1%",
      volume: "98.7M",
      isPositive: true,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: "$495.22",
      change: "+3.8%",
      volume: "45.2M",
      isPositive: true,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: "$378.91",
      change: "-0.5%",
      volume: "28.1M",
      isPositive: false,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: "$142.18",
      change: "+1.2%",
      volume: "31.5M",
      isPositive: true,
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          <CardTitle>Trending Now</CardTitle>
        </div>
        <CardDescription>Most active stocks today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{stock.symbol}</span>
                  {stock.isPositive ? (
                    <ArrowUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{stock.name}</p>
                <p className="text-xs text-muted-foreground">
                  Vol: {stock.volume}
                </p>
              </div>
              <div className="text-right space-y-1">
                <div className="font-semibold">{stock.price}</div>
                <Badge
                  variant={stock.isPositive ? "default" : "destructive"}
                  className="text-xs"
                >
                  {stock.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
