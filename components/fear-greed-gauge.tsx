"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FearGreedGauge() {
  // Mock data - will be replaced with real API data
  const currentValue = 68; // 0-100 scale
  const status = "Greed";
  const previousValue = 62;
  const change = currentValue - previousValue;

  const getStatusColor = (value: number) => {
    if (value <= 25) return { bg: "bg-red-600", text: "Extreme Fear" };
    if (value <= 45) return { bg: "bg-orange-500", text: "Fear" };
    if (value <= 55) return { bg: "bg-yellow-500", text: "Neutral" };
    if (value <= 75) return { bg: "bg-lime-500", text: "Greed" };
    return { bg: "bg-green-600", text: "Extreme Greed" };
  };

  const statusInfo = getStatusColor(currentValue);
  const rotation = (currentValue / 100) * 180 - 90;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Index</CardTitle>
        <CardDescription>Real-time market sentiment gauge</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Gauge Visualization */}
          <div className="relative w-full aspect-square max-w-sm mx-auto">
            {/* Semi-circle background */}
            <div className="relative w-full h-full">
              <svg viewBox="0 0 200 100" className="w-full">
                {/* Background arc segments */}
                <path
                  d="M 10 100 A 90 90 0 0 1 190 100"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="20"
                  strokeLinecap="round"
                  className="opacity-30"
                  strokeDasharray="28 1"
                  strokeDashoffset="0"
                />
                <path
                  d="M 10 100 A 90 90 0 0 1 190 100"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="20"
                  strokeLinecap="round"
                  className="opacity-30"
                  strokeDasharray="28 1"
                  strokeDashoffset="-36"
                />
                <path
                  d="M 10 100 A 90 90 0 0 1 190 100"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="20"
                  strokeLinecap="round"
                  className="opacity-30"
                  strokeDasharray="28 1"
                  strokeDashoffset="-72"
                />
                <path
                  d="M 10 100 A 90 90 0 0 1 190 100"
                  fill="none"
                  stroke="#84cc16"
                  strokeWidth="20"
                  strokeLinecap="round"
                  className="opacity-30"
                  strokeDasharray="28 1"
                  strokeDashoffset="-108"
                />
                <path
                  d="M 10 100 A 90 90 0 0 1 190 100"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeLinecap="round"
                  className="opacity-30"
                  strokeDasharray="28 1"
                  strokeDashoffset="-144"
                />

                {/* Needle */}
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="30"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  transform={`rotate(${rotation} 100 100)`}
                  className="transition-transform duration-1000"
                />
                <circle cx="100" cy="100" r="5" fill="currentColor" />
              </svg>
            </div>

            {/* Center display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center top-1/2">
              <div className="text-5xl font-bold">{currentValue}</div>
              <Badge className={`mt-2 ${statusInfo.bg} text-white`}>
                {statusInfo.text}
              </Badge>
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between text-xs text-muted-foreground px-4">
            <span>Extreme Fear</span>
            <span>Neutral</span>
            <span>Extreme Greed</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Previous</div>
              <div className="text-2xl font-semibold">{previousValue}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Change</div>
              <div
                className={`text-2xl font-semibold ${
                  change > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {change > 0 ? "+" : ""}
                {change}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">What this means:</span> The market
              is currently showing signs of greed, indicating optimistic investor
              sentiment. This could suggest overvaluation in some areas.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
