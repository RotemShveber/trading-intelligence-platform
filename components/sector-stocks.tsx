"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SECTORS } from "@/lib/market-data";
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SectorStocks() {
  const [isRefreshing, setIsRefreshing] = useState(false);

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
            <CardTitle>Stocks by Sector</CardTitle>
            <CardDescription>Comprehensive list of popular stocks organized by sector</CardDescription>
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
        <Tabs defaultValue="Technology" className="space-y-4">
          <TabsList className="flex-wrap h-auto">
            {Object.keys(SECTORS).map((sector) => (
              <TabsTrigger key={sector} value={sector} className="text-xs sm:text-sm">
                {sector} ({SECTORS[sector as keyof typeof SECTORS].length})
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(SECTORS).map(([sectorName, stocks]) => (
            <TabsContent key={sectorName} value={sectorName} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="p-4 rounded-lg border hover:shadow-md transition-all cursor-pointer hover:border-primary"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-bold text-lg">{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {stock.name}
                        </div>
                      </div>
                      {Math.random() > 0.5 ? (
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-600" />
                      )}
                    </div>

                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Market Cap:</span>
                        <span className="font-semibold">${stock.marketCap}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-semibold">
                          ${(Math.random() * 500 + 50).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Change:</span>
                        <Badge
                          variant={Math.random() > 0.5 ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {Math.random() > 0.5 ? "+" : "-"}
                          {(Math.random() * 5).toFixed(2)}%
                        </Badge>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full mt-3">
                      View Analysis
                    </Button>
                  </div>
                ))}
              </div>

              {stocks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No stocks found in this sector
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
