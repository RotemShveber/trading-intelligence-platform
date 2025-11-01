"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export function FearGreedExplainer() {
  const levels = [
    { range: "0-25", label: "Extreme Fear", description: "Investors are very worried. Potential buying opportunity." },
    { range: "25-45", label: "Fear", description: "Investors are concerned. Market may be undervalued." },
    { range: "45-55", label: "Neutral", description: "Balanced sentiment. Market fairly valued." },
    { range: "55-75", label: "Greed", description: "Investors are optimistic. Watch for overvaluation." },
    { range: "75-100", label: "Extreme Greed", description: "Investors are very optimistic. Potential correction risk." },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          <CardTitle>Understanding the Index</CardTitle>
        </div>
        <CardDescription>What the Fear & Greed levels mean</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {levels.map((level) => (
            <div
              key={level.range}
              className="p-4 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="font-semibold">{level.label}</div>
                  <div className="text-xs text-muted-foreground">
                    Range: {level.range}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {level.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              How It's Calculated
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Fear & Greed Index combines seven different indicators including
              stock price momentum, stock price strength, stock price breadth, put
              and call options, junk bond demand, market volatility, and safe haven
              demand. Each indicator is weighted equally to produce a score from 0
              to 100.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
