"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MarketCorrelation() {
  const correlations = [
    { stock1: "AAPL", stock2: "MSFT", correlation: 0.85, strength: "Strong Positive" },
    { stock1: "AAPL", stock2: "TSLA", correlation: 0.42, strength: "Moderate Positive" },
    { stock1: "AAPL", stock2: "SPY", correlation: 0.78, strength: "Strong Positive" },
    { stock1: "AAPL", stock2: "GLD", correlation: -0.15, strength: "Weak Negative" },
    { stock1: "AAPL", stock2: "TLT", correlation: -0.32, strength: "Moderate Negative" },
  ];

  const getCorrelationColor = (value: number) => {
    if (value > 0.7) return "bg-green-600";
    if (value > 0.3) return "bg-green-400";
    if (value > -0.3) return "bg-yellow-500";
    if (value > -0.7) return "bg-red-400";
    return "bg-red-600";
  };

  const getCorrelationWidth = (value: number) => {
    return Math.abs(value) * 100;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Correlations</CardTitle>
        <CardDescription>
          How AAPL moves relative to other assets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {correlations.map((corr, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{corr.stock1}</span>
                  <span className="text-muted-foreground">vs</span>
                  <span className="font-semibold">{corr.stock2}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-semibold">
                    {corr.correlation > 0 ? "+" : ""}
                    {corr.correlation.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {corr.strength}
                  </div>
                </div>
              </div>
              <div className="relative w-full bg-secondary rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getCorrelationColor(
                    corr.correlation
                  )}`}
                  style={{
                    width: `${getCorrelationWidth(corr.correlation)}%`,
                  }}
                />
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-sm mb-2">Understanding Correlation</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• +1.0 = Perfect positive correlation (move together)</p>
              <p>• 0.0 = No correlation (independent movement)</p>
              <p>• -1.0 = Perfect negative correlation (move opposite)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded-lg border text-center">
              <div className="text-xs text-muted-foreground">Beta</div>
              <div className="text-2xl font-bold">1.12</div>
              <div className="text-xs text-muted-foreground mt-1">vs S&P 500</div>
            </div>
            <div className="p-3 rounded-lg border text-center">
              <div className="text-xs text-muted-foreground">Volatility</div>
              <div className="text-2xl font-bold">24.3%</div>
              <div className="text-xs text-muted-foreground mt-1">Annualized</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
