"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { POPULAR_ETFS } from "@/lib/market-data";
import { RefreshCw, ExternalLink, TrendingUp } from "lucide-react";
import { useState } from "react";

export function ETFDirectory() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Large Cap", "Technology", "Bonds", "Commodities", "Sector", "International"];

  const filteredETFs = selectedCategory === "All"
    ? POPULAR_ETFS
    : POPULAR_ETFS.filter(etf => etf.category === selectedCategory);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Popular ETFs</CardTitle>
            <CardDescription>{POPULAR_ETFS.length} most traded ETFs with comprehensive details</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Updating...' : 'Refresh'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <div className="text-sm font-medium mb-3">Filter by Category:</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* ETF Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredETFs.map((etf) => (
              <Card key={etf.symbol} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-xl">{etf.symbol}</h3>
                          <Badge variant="outline">{etf.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {etf.name}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <TrendingUp className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed">
                      {etf.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-muted">
                        <div className="text-xs text-muted-foreground">Holdings</div>
                        <div className="font-semibold mt-1">{etf.holdings}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted">
                        <div className="text-xs text-muted-foreground">Expense Ratio</div>
                        <div className="font-semibold mt-1">{etf.expenseRatio}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted">
                        <div className="text-xs text-muted-foreground">AUM</div>
                        <div className="font-semibold mt-1">{etf.aum}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted">
                        <div className="text-xs text-muted-foreground">Type</div>
                        <div className="font-semibold mt-1">
                          {etf.category.includes("Bond") ? "Bond" : etf.category.includes("Commodit") ? "Commodity" : "Equity"}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                      <Button size="sm" className="flex-1">
                        Add to Analysis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredETFs.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No ETFs found in this category
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
