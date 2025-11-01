"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FearGreedIndicators() {
  const indicators = [
    { name: "Market Momentum", value: 72, weight: "14.3%", status: "greed" },
    { name: "Stock Price Strength", value: 65, weight: "14.3%", status: "greed" },
    { name: "Stock Price Breadth", value: 58, weight: "14.3%", status: "greed" },
    { name: "Put/Call Options", value: 51, weight: "14.3%", status: "neutral" },
    { name: "Junk Bond Demand", value: 69, weight: "14.3%", status: "greed" },
    { name: "Market Volatility (VIX)", value: 45, weight: "14.3%", status: "neutral" },
    { name: "Safe Haven Demand", value: 38, weight: "14.2%", status: "fear" },
  ];

  const getStatusColor = (value: number) => {
    if (value <= 25) return "bg-red-600";
    if (value <= 45) return "bg-orange-500";
    if (value <= 55) return "bg-yellow-500";
    if (value <= 75) return "bg-lime-500";
    return "bg-green-600";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "fear":
        return <Badge variant="destructive">Fear</Badge>;
      case "neutral":
        return <Badge variant="secondary">Neutral</Badge>;
      case "greed":
        return <Badge variant="default">Greed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Component Indicators</CardTitle>
        <CardDescription>
          Individual metrics that comprise the Fear & Greed Index
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {indicators.map((indicator) => (
            <div
              key={indicator.name}
              className="p-4 rounded-lg border space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold">{indicator.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Weight: {indicator.weight}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">{indicator.value}</span>
                  {getStatusBadge(indicator.status)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all ${getStatusColor(
                      indicator.value
                    )}`}
                    style={{ width: `${indicator.value}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
