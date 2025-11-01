import { MarketSchedule } from "@/components/market-schedule";
import { GlobalMarkets } from "@/components/global-markets";
import { TradingCalendar } from "@/components/trading-calendar";

export default function MarketHoursPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Market Hours & Schedule</h1>
        <p className="text-muted-foreground">
          Trading hours, market holidays, and global market status
        </p>
      </div>

      <MarketSchedule />

      <GlobalMarkets />

      <TradingCalendar />
    </div>
  );
}
