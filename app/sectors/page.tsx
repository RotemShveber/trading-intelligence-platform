import { SectorDistribution } from "@/components/sector-distribution";
import { SectorPerformance } from "@/components/sector-performance";
import { SectorHeatmap } from "@/components/sector-heatmap";
import { SectorStocks } from "@/components/sector-stocks";

export default function SectorsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Sector Analysis</h1>
        <p className="text-muted-foreground">
          Comprehensive breakdown of market sectors and performance metrics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectorDistribution />
        <SectorPerformance />
      </div>

      <SectorHeatmap />

      <SectorStocks />
    </div>
  );
}
