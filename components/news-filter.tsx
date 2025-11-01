"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

export function NewsFilter() {
  const sources = [
    "All",
    "CNBC",
    "Bloomberg",
    "Reuters",
    "WSJ",
    "TradingView",
    "MarketWatch",
    "Yahoo Finance",
    "Seeking Alpha",
  ];
  const sentiments = ["All", "Bullish", "Neutral", "Bearish"];
  const impacts = ["All", "High Impact", "Medium Impact", "Low Impact"];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-sm">Filters</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-medium text-muted-foreground mb-2 block">
                Source
              </span>
              <div className="flex flex-wrap gap-2">
                {sources.map((source) => (
                  <Button
                    key={source}
                    variant={source === "All" ? "default" : "outline"}
                    size="sm"
                  >
                    {source}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-medium text-muted-foreground mb-2 block">
                Sentiment
              </span>
              <div className="flex flex-wrap gap-2">
                {sentiments.map((sentiment) => (
                  <Button
                    key={sentiment}
                    variant={sentiment === "All" ? "default" : "outline"}
                    size="sm"
                  >
                    {sentiment}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-medium text-muted-foreground mb-2 block">
                Impact Level
              </span>
              <div className="flex flex-wrap gap-2">
                {impacts.map((impact) => (
                  <Button
                    key={impact}
                    variant={impact === "All" ? "default" : "outline"}
                    size="sm"
                  >
                    {impact}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
