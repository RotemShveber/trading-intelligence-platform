import { NewsAggregator } from "@/components/news-aggregator";
import { NewsSentiment } from "@/components/news-sentiment";
import { NewsFilter } from "@/components/news-filter";

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Market News</h1>
        <p className="text-muted-foreground">
          Aggregated news from multiple trusted sources with AI-powered analysis
        </p>
      </div>

      <NewsFilter />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NewsAggregator />
        </div>
        <div>
          <NewsSentiment />
        </div>
      </div>
    </div>
  );
}
