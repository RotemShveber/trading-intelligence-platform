import { MarketOverview } from "@/components/market-overview";
import { TrendingStocks } from "@/components/trending-stocks";
import { MarketIndices } from "@/components/market-indices";
import { QuickStats } from "@/components/quick-stats";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Market Overview</h1>
        <p className="text-muted-foreground">
          Real-time market data and insights at your fingertips
        </p>
      </div>

      <QuickStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MarketIndices />
        </div>
        <div>
          <TrendingStocks />
        </div>
      </div>

      <MarketOverview />
    </div>
  );
}
