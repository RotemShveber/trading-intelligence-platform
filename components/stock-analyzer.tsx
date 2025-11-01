"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

export function StockAnalyzer() {
  const [selectedStock] = useState("AAPL");

  const stockData = {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.45,
    change: 2.4,
    analysis: {
      overall: "Buy",
      technicalScore: 78,
      fundamentalScore: 85,
      sentimentScore: 72,
    },
    keyMetrics: {
      pe: 28.5,
      marketCap: "2.85T",
      volume: "52.3M",
      avg50: 178.32,
      avg200: 175.18,
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Deep Dive</CardTitle>
        <CardDescription>Comprehensive analysis of individual stocks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for a stock symbol (e.g., AAPL, TSLA, MSFT)..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedStock}
              />
            </div>
            <Button>Analyze</Button>
          </div>

          {/* Stock Info */}
          <div className="p-6 rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold">{stockData.symbol}</h2>
                  {stockData.change > 0 ? (
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  )}
                </div>
                <p className="text-muted-foreground mt-1">{stockData.name}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">${stockData.price}</div>
                <Badge
                  variant={stockData.change > 0 ? "default" : "destructive"}
                  className="mt-1"
                >
                  {stockData.change > 0 ? "+" : ""}
                  {stockData.change}%
                </Badge>
              </div>
            </div>
          </div>

          {/* Analysis Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border text-center">
              <div className="text-sm text-muted-foreground mb-2">
                Technical Score
              </div>
              <div className="text-3xl font-bold text-green-600">
                {stockData.analysis.technicalScore}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Based on indicators
              </div>
            </div>
            <div className="p-4 rounded-lg border text-center">
              <div className="text-sm text-muted-foreground mb-2">
                Fundamental Score
              </div>
              <div className="text-3xl font-bold text-green-600">
                {stockData.analysis.fundamentalScore}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Based on financials
              </div>
            </div>
            <div className="p-4 rounded-lg border text-center">
              <div className="text-sm text-muted-foreground mb-2">
                Sentiment Score
              </div>
              <div className="text-3xl font-bold text-green-600">
                {stockData.analysis.sentimentScore}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Based on news/social
              </div>
            </div>
          </div>

          {/* Overall Recommendation */}
          <div className="p-6 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">AI Recommendation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on comprehensive multi-factor analysis
                </p>
              </div>
              <Badge className="bg-green-600 text-white text-lg px-4 py-2">
                {stockData.analysis.overall}
              </Badge>
            </div>
            <p className="text-sm mt-4 leading-relaxed">
              Apple shows strong technical momentum with price trading above both
              50-day and 200-day moving averages. Fundamental metrics remain solid
              with healthy P/E ratio. News sentiment is predominantly positive due
              to recent product launches and AI initiatives.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 rounded-lg border">
              <div className="text-xs text-muted-foreground">P/E Ratio</div>
              <div className="text-lg font-bold mt-1">{stockData.keyMetrics.pe}</div>
            </div>
            <div className="text-center p-3 rounded-lg border">
              <div className="text-xs text-muted-foreground">Market Cap</div>
              <div className="text-lg font-bold mt-1">${stockData.keyMetrics.marketCap}</div>
            </div>
            <div className="text-center p-3 rounded-lg border">
              <div className="text-xs text-muted-foreground">Volume</div>
              <div className="text-lg font-bold mt-1">{stockData.keyMetrics.volume}</div>
            </div>
            <div className="text-center p-3 rounded-lg border">
              <div className="text-xs text-muted-foreground">50-Day MA</div>
              <div className="text-lg font-bold mt-1">${stockData.keyMetrics.avg50}</div>
            </div>
            <div className="text-center p-3 rounded-lg border">
              <div className="text-xs text-muted-foreground">200-Day MA</div>
              <div className="text-lg font-bold mt-1">${stockData.keyMetrics.avg200}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
