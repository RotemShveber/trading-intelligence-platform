"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ETFComparison() {
  const comparisons = [
    {
      category: "S&P 500 Trackers",
      etfs: [
        { symbol: "SPY", expenseRatio: "0.09%", aum: "$442B", note: "Most liquid" },
        { symbol: "VOO", expenseRatio: "0.03%", aum: "$421B", note: "Lowest cost" },
        { symbol: "IVV", expenseRatio: "0.03%", aum: "$389B", note: "Tax efficient" },
      ],
    },
    {
      category: "Tech Exposure",
      etfs: [
        { symbol: "QQQ", expenseRatio: "0.20%", aum: "$237B", note: "Nasdaq-100" },
        { symbol: "VGT", expenseRatio: "0.10%", aum: "$64B", note: "Broad tech" },
        { symbol: "XLK", expenseRatio: "0.10%", aum: "$56B", note: "S&P 500 tech" },
      ],
    },
    {
      category: "Bond ETFs",
      etfs: [
        { symbol: "AGG", expenseRatio: "0.03%", aum: "$98B", note: "Total bond market" },
        { symbol: "TLT", expenseRatio: "0.15%", aum: "$47B", note: "Long-term treasury" },
        { symbol: "BND", expenseRatio: "0.03%", aum: "$103B", note: "Total bond index" },
      ],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>ETF Comparisons</CardTitle>
        <CardDescription>
          Side-by-side comparison of similar ETFs to help you choose the right one
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {comparisons.map((comparison) => (
            <div key={comparison.category}>
              <h3 className="font-semibold mb-3">{comparison.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {comparison.etfs.map((etf) => (
                  <div key={etf.symbol} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-lg">{etf.symbol}</span>
                      <Badge variant="secondary" className="text-xs">
                        {etf.note}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expense:</span>
                        <span className="font-medium">{etf.expenseRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">AUM:</span>
                        <span className="font-medium">{etf.aum}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Key Takeaways */}
          <div className="mt-8 p-6 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-3">💡 ETF Selection Tips</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Expense Ratio:</strong> Lower is better for long-term holdings</li>
              <li>• <strong>AUM (Assets Under Management):</strong> Higher AUM typically means better liquidity</li>
              <li>• <strong>Tracking Error:</strong> How closely the ETF follows its index</li>
              <li>• <strong>Bid-Ask Spread:</strong> Tighter spreads reduce trading costs</li>
              <li>• <strong>Tax Efficiency:</strong> Important for taxable accounts</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
