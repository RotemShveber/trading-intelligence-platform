import { StockAnalyzer } from "@/components/stock-analyzer";
import { TechnicalIndicators } from "@/components/technical-indicators";
import { MarketCorrelation } from "@/components/market-correlation";

export default function AnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Market Analysis</h1>
        <p className="text-muted-foreground">
          Deep dive into stocks with technical indicators and AI-powered insights
        </p>
      </div>

      <StockAnalyzer />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TechnicalIndicators />
        <MarketCorrelation />
      </div>
    </div>
  );
}
