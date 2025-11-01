"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { useState } from "react";
import { POPULAR_STOCKS, POPULAR_ETFS } from "@/lib/market-data";

export function StockAnalyzer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Combine stocks and ETFs for search
  const allSecurities = [
    ...POPULAR_STOCKS.map(s => ({ ...s, type: "Stock" })),
    ...POPULAR_ETFS.map(e => ({ symbol: e.symbol, name: e.name, sector: e.category, type: "ETF" }))
  ];

  // Filter based on search
  const filteredSecurities = allSecurities.filter(
    (security) =>
      security.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      security.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10);

  // Get current security data
  const currentSecurity = allSecurities.find(s => s.symbol === selectedSymbol) || allSecurities[0];

  // Mock data - will be replaced with real API
  const stockData = {
    symbol: selectedSymbol,
    name: currentSecurity.name,
    price: Math.random() * 300 + 50, // Random price for demo
    change: (Math.random() * 10 - 5).toFixed(2),
    analysis: {
      overall: Math.random() > 0.5 ? "Buy" : Math.random() > 0.3 ? "Hold" : "Sell",
      technicalScore: Math.floor(Math.random() * 40 + 60),
      fundamentalScore: Math.floor(Math.random() * 40 + 60),
      sentimentScore: Math.floor(Math.random() * 40 + 60),
    },
    keyMetrics: {
      pe: (Math.random() * 40 + 10).toFixed(1),
      marketCap: currentSecurity.type === "Stock" ?
        (POPULAR_STOCKS.find(s => s.symbol === selectedSymbol)?.marketCap || "N/A") :
        "ETF",
      volume: `${(Math.random() * 100 + 10).toFixed(1)}M`,
      avg50: (Math.random() * 300 + 50).toFixed(2),
      avg200: (Math.random() * 300 + 50).toFixed(2),
    },
  };

  const handleSearch = (symbol: string) => {
    setSelectedSymbol(symbol);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Stock & ETF Deep Dive</CardTitle>
            <CardDescription>Comprehensive analysis of any stock or ETF</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Updating...' : 'Refresh Data'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search stocks or ETFs (e.g., AAPL, SPY, TSLA)..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
              </div>
            </div>

            {/* Search Suggestions */}
            {showSuggestions && searchTerm && (
              <div className="absolute z-10 w-full mt-2 bg-background border rounded-lg shadow-lg max-h-96 overflow-y-auto">
                {filteredSecurities.length > 0 ? (
                  filteredSecurities.map((security) => (
                    <button
                      key={security.symbol}
                      className="w-full px-4 py-3 text-left hover:bg-accent transition-colors border-b last:border-b-0"
                      onClick={() => handleSearch(security.symbol)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold">{security.symbol}</div>
                          <div className="text-sm text-muted-foreground">
                            {security.name}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {security.type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {security.sector}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-muted-foreground text-center">
                    No results found. Try searching for popular stocks like AAPL, TSLA, MSFT, or ETFs like SPY, QQQ.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Popular Quick Select */}
          <div>
            <div className="text-sm font-medium mb-2">Quick Select:</div>
            <div className="flex flex-wrap gap-2">
              {["AAPL", "MSFT", "GOOGL", "TSLA", "NVDA", "SPY", "QQQ", "VOO"].map((symbol) => (
                <Button
                  key={symbol}
                  variant={selectedSymbol === symbol ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSearch(symbol)}
                >
                  {symbol}
                </Button>
              ))}
            </div>
          </div>

          {/* Stock Info */}
          <div className="p-6 rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold">{stockData.symbol}</h2>
                  {Number(stockData.change) > 0 ? (
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  )}
                  <Badge variant={currentSecurity.type === "ETF" ? "secondary" : "outline"}>
                    {currentSecurity.type}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">{stockData.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Sector: {currentSecurity.sector}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">${stockData.price.toFixed(2)}</div>
                <Badge
                  variant={Number(stockData.change) > 0 ? "default" : "destructive"}
                  className="mt-1"
                >
                  {Number(stockData.change) > 0 ? "+" : ""}
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
              <div className={`text-3xl font-bold ${stockData.analysis.technicalScore > 70 ? 'text-green-600' : stockData.analysis.technicalScore > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
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
              <div className={`text-3xl font-bold ${stockData.analysis.fundamentalScore > 70 ? 'text-green-600' : stockData.analysis.fundamentalScore > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
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
              <div className={`text-3xl font-bold ${stockData.analysis.sentimentScore > 70 ? 'text-green-600' : stockData.analysis.sentimentScore > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                {stockData.analysis.sentimentScore}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Based on news/social
              </div>
            </div>
          </div>

          {/* Overall Recommendation */}
          <div className={`p-6 rounded-lg border ${
            stockData.analysis.overall === "Buy" ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" :
            stockData.analysis.overall === "Sell" ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800" :
            "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800"
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">AI Recommendation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on comprehensive multi-factor analysis
                </p>
              </div>
              <Badge className={`text-lg px-4 py-2 ${
                stockData.analysis.overall === "Buy" ? "bg-green-600" :
                stockData.analysis.overall === "Sell" ? "bg-red-600" :
                "bg-yellow-600"
              } text-white`}>
                {stockData.analysis.overall}
              </Badge>
            </div>
            <p className="text-sm mt-4 leading-relaxed">
              {currentSecurity.type === "ETF" ?
                `This ETF provides diversified exposure to ${currentSecurity.sector}. Consider as part of a balanced portfolio strategy.` :
                `${stockData.name} shows ${stockData.analysis.overall === "Buy" ? "strong" : stockData.analysis.overall === "Sell" ? "weak" : "mixed"} signals across technical, fundamental, and sentiment indicators.`
              }
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {currentSecurity.type === "Stock" && (
              <>
                <div className="text-center p-3 rounded-lg border">
                  <div className="text-xs text-muted-foreground">P/E Ratio</div>
                  <div className="text-lg font-bold mt-1">{stockData.keyMetrics.pe}</div>
                </div>
                <div className="text-center p-3 rounded-lg border">
                  <div className="text-xs text-muted-foreground">Market Cap</div>
                  <div className="text-lg font-bold mt-1">${stockData.keyMetrics.marketCap}</div>
                </div>
              </>
            )}
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
