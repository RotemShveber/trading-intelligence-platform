import { ETFDirectory } from "@/components/etf-directory";
import { ETFComparison } from "@/components/etf-comparison";

export default function ETFsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">ETF Directory</h1>
        <p className="text-muted-foreground">
          Comprehensive guide to popular Exchange-Traded Funds with detailed descriptions and metrics
        </p>
      </div>

      <ETFDirectory />

      <ETFComparison />
    </div>
  );
}
