"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function MarketSchedule() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [marketStatus, setMarketStatus] = useState<"open" | "closed" | "pre" | "post">("closed");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // NYSE hours: 9:30 AM - 4:00 PM ET
      const hour = now.getHours();
      const minute = now.getMinutes();
      const day = now.getDay();

      // Convert to minutes since midnight
      const currentMinutes = hour * 60 + minute;
      const marketOpen = 9 * 60 + 30; // 9:30 AM
      const marketClose = 16 * 60; // 4:00 PM
      const preMarketStart = 4 * 60; // 4:00 AM
      const afterHoursEnd = 20 * 60; // 8:00 PM

      // Weekend
      if (day === 0 || day === 6) {
        setMarketStatus("closed");
      }
      // Pre-market
      else if (currentMinutes >= preMarketStart && currentMinutes < marketOpen) {
        setMarketStatus("pre");
      }
      // Regular hours
      else if (currentMinutes >= marketOpen && currentMinutes < marketClose) {
        setMarketStatus("open");
      }
      // After hours
      else if (currentMinutes >= marketClose && currentMinutes < afterHoursEnd) {
        setMarketStatus("post");
      }
      // Closed
      else {
        setMarketStatus("closed");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const schedule = [
    {
      name: "Pre-Market",
      time: "4:00 AM - 9:30 AM ET",
      description: "Extended hours trading for qualifying orders",
      active: marketStatus === "pre",
    },
    {
      name: "Regular Trading Hours",
      time: "9:30 AM - 4:00 PM ET",
      description: "Main trading session for all securities",
      active: marketStatus === "open",
    },
    {
      name: "After Hours",
      time: "4:00 PM - 8:00 PM ET",
      description: "Post-market trading for qualifying orders",
      active: marketStatus === "post",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>U.S. Market Hours (NYSE/NASDAQ)</CardTitle>
            <CardDescription>Current status and trading schedule</CardDescription>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-mono">
                {currentTime.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: true })} ET
              </span>
            </div>
            <Badge
              variant={marketStatus === "open" ? "default" : "secondary"}
              className={
                marketStatus === "open"
                  ? "bg-green-600 text-white"
                  : marketStatus === "pre" || marketStatus === "post"
                  ? "bg-yellow-600 text-white"
                  : "bg-red-600 text-white"
              }
            >
              {marketStatus === "open" && "Market Open"}
              {marketStatus === "pre" && "Pre-Market"}
              {marketStatus === "post" && "After Hours"}
              {marketStatus === "closed" && "Market Closed"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedule.map((session, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                session.active ? "bg-primary/5 border-primary" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{session.name}</h3>
                {session.active && (
                  <Badge className="bg-green-600 text-white">Active Now</Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground mb-1">{session.time}</div>
              <div className="text-sm">{session.description}</div>
            </div>
          ))}

          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-2">Important Notes:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Markets are closed on weekends (Saturday & Sunday)</li>
                  <li>• Trading is closed on federal holidays</li>
                  <li>• Extended hours may have lower liquidity and wider spreads</li>
                  <li>• Early close at 1:00 PM ET on some holidays</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
