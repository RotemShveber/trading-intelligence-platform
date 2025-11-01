import { FearGreedGauge } from "@/components/fear-greed-gauge";
import { FearGreedHistory } from "@/components/fear-greed-history";
import { FearGreedExplainer } from "@/components/fear-greed-explainer";
import { FearGreedIndicators } from "@/components/fear-greed-indicators";

export default function FearGreedPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Fear & Greed Index</h1>
        <p className="text-muted-foreground">
          Real-time market sentiment indicator based on multiple data points
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FearGreedGauge />
        <FearGreedExplainer />
      </div>

      <FearGreedIndicators />

      <FearGreedHistory />
    </div>
  );
}
