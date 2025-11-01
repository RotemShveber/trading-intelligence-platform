"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

export function GlobalMarkets() {
  const markets = [
    {
      name: "Tokyo Stock Exchange",
      country: "Japan",
      timezone: "JST",
      open: "9:00 AM",
      close: "3:00 PM",
      lunch: "11:30 AM - 12:30 PM",
      localTime: new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour12: true }),
    },
    {
      name: "London Stock Exchange",
      country: "United Kingdom",
      timezone: "GMT",
      open: "8:00 AM",
      close: "4:30 PM",
      localTime: new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour12: true }),
    },
    {
      name: "New York Stock Exchange",
      country: "United States",
      timezone: "ET",
      open: "9:30 AM",
      close: "4:00 PM",
      localTime: new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: true }),
    },
    {
      name: "Hong Kong Stock Exchange",
      country: "Hong Kong",
      timezone: "HKT",
      open: "9:30 AM",
      close: "4:00 PM",
      lunch: "12:00 PM - 1:00 PM",
      localTime: new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Hong_Kong', hour12: true }),
    },
    {
      name: "Shanghai Stock Exchange",
      country: "China",
      timezone: "CST",
      open: "9:30 AM",
      close: "3:00 PM",
      lunch: "11:30 AM - 1:00 PM",
      localTime: new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Shanghai', hour12: true }),
    },
    {
      name: "Frankfurt Stock Exchange",
      country: "Germany",
      timezone: "CET",
      open: "9:00 AM",
      close: "5:30 PM",
      localTime: new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/Berlin', hour12: true }),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          <CardTitle>Global Market Hours</CardTitle>
        </div>
        <CardDescription>Trading hours for major stock exchanges worldwide</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {markets.map((market) => (
            <div key={market.name} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold">{market.name}</h3>
                  <p className="text-sm text-muted-foreground">{market.country}</p>
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open:</span>
                    <span className="font-medium">{market.open}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Close:</span>
                    <span className="font-medium">{market.close}</span>
                  </div>
                  {market.lunch && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lunch:</span>
                      <span className="font-medium text-xs">{market.lunch}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {market.timezone}
                    </Badge>
                    <span className="text-xs font-mono">{market.localTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
