"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function QuickStats() {
  // Mock data - will be replaced with real API data
  const stats = [
    {
      title: "S&P 500",
      value: "4,783.45",
      change: "+1.2%",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      title: "Nasdaq",
      value: "15,011.35",
      change: "+0.8%",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      title: "Dow Jones",
      value: "37,305.16",
      change: "-0.3%",
      isPositive: false,
      icon: TrendingDown,
    },
    {
      title: "Market Cap",
      value: "$42.5T",
      change: "+2.1%",
      isPositive: true,
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Badge
                variant={stat.isPositive ? "default" : "destructive"}
                className="mt-1"
              >
                {stat.change}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
