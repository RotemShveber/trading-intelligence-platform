"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function TechnicalIndicators() {
  const indicators = [
    {
      name: "RSI (14)",
      value: 62.3,
      signal: "Neutral",
      description: "Relative Strength Index indicates neutral momentum",
      status: "neutral",
    },
    {
      name: "MACD",
      value: "+0.85",
      signal: "Bullish",
      description: "Moving Average Convergence Divergence shows bullish crossover",
      status: "bullish",
    },
    {
      name: "Bollinger Bands",
      value: "Upper Band",
      signal: "Overbought",
      description: "Price near upper band, potential resistance",
      status: "bearish",
    },
    {
      name: "Moving Averages",
      value: "Golden Cross",
      signal: "Bullish",
      description: "50-day MA crossed above 200-day MA",
      status: "bullish",
    },
    {
      name: "Volume Profile",
      value: "High",
      signal: "Strong",
      description: "Above average trading volume confirms trend",
      status: "bullish",
    },
    {
      name: "Stochastic",
      value: 78.5,
      signal: "Overbought",
      description: "Stochastic oscillator in overbought territory",
      status: "bearish",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "bullish":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "bearish":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "bullish":
        return <Badge className="bg-green-600 text-white">Bullish</Badge>;
      case "bearish":
        return <Badge variant="destructive">Bearish</Badge>;
      default:
        return <Badge variant="secondary">Neutral</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Indicators</CardTitle>
        <CardDescription>Key technical analysis signals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {indicators.map((indicator) => (
            <div
              key={indicator.name}
              className="p-4 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(indicator.status)}
                  <span className="font-semibold">{indicator.name}</span>
                </div>
                {getStatusBadge(indicator.status)}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">
                  {indicator.description}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Value:</span>
                <span className="font-mono text-sm font-semibold">
                  {indicator.value}
                </span>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 rounded-lg bg-muted">
            <h4 className="font-semibold mb-2">Technical Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-xs text-muted-foreground">Bullish</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-xs text-muted-foreground">Neutral</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">2</div>
                <div className="text-xs text-muted-foreground">Bearish</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
