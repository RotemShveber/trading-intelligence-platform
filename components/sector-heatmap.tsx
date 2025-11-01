"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SectorHeatmap() {
  const sectors = [
    {
      name: "Technology",
      companies: [
        { symbol: "AAPL", change: 2.4 },
        { symbol: "MSFT", change: 1.8 },
        { symbol: "GOOGL", change: 1.2 },
        { symbol: "NVDA", change: 3.8 },
        { symbol: "META", change: 2.1 },
        { symbol: "TSLA", change: 5.1 },
      ],
    },
    {
      name: "Healthcare",
      companies: [
        { symbol: "UNH", change: 1.5 },
        { symbol: "JNJ", change: 0.8 },
        { symbol: "PFE", change: -0.3 },
        { symbol: "ABBV", change: 1.2 },
        { symbol: "TMO", change: 1.9 },
        { symbol: "MRK", change: 0.6 },
      ],
    },
    {
      name: "Financials",
      companies: [
        { symbol: "JPM", change: -0.5 },
        { symbol: "BAC", change: -0.8 },
        { symbol: "WFC", change: 0.2 },
        { symbol: "GS", change: -1.1 },
        { symbol: "MS", change: -0.6 },
        { symbol: "C", change: 0.1 },
      ],
    },
    {
      name: "Energy",
      companies: [
        { symbol: "XOM", change: 0.9 },
        { symbol: "CVX", change: 0.7 },
        { symbol: "COP", change: 1.2 },
        { symbol: "SLB", change: 0.4 },
        { symbol: "EOG", change: 0.8 },
        { symbol: "MPC", change: -0.2 },
      ],
    },
  ];

  const getColorClass = (change: number) => {
    if (change > 2) return "bg-green-600 hover:bg-green-700";
    if (change > 0) return "bg-green-500 hover:bg-green-600";
    if (change > -1) return "bg-red-400 hover:bg-red-500";
    return "bg-red-600 hover:bg-red-700";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sector Heatmap</CardTitle>
        <CardDescription>
          Visual representation of stock performance by sector
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sectors.map((sector) => (
            <div key={sector.name}>
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
                {sector.name}
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {sector.companies.map((company) => (
                  <div
                    key={company.symbol}
                    className={`p-4 rounded-lg text-white transition-colors cursor-pointer ${getColorClass(
                      company.change
                    )}`}
                  >
                    <div className="font-bold text-sm">{company.symbol}</div>
                    <div className="text-xs mt-1">
                      {company.change > 0 ? "+" : ""}
                      {company.change.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <span className="text-muted-foreground">Strong Gain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-muted-foreground">Gain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <span className="text-muted-foreground">Loss</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span className="text-muted-foreground">Strong Loss</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
