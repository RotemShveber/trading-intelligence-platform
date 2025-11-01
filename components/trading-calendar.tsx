"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, XCircle, Clock } from "lucide-react";

export function TradingCalendar() {
  const upcomingHolidays = [
    { date: "January 1, 2025", name: "New Year's Day", status: "Market Closed" },
    { date: "January 20, 2025", name: "Martin Luther King Jr. Day", status: "Market Closed" },
    { date: "February 17, 2025", name: "Presidents' Day", status: "Market Closed" },
    { date: "April 18, 2025", name: "Good Friday", status: "Market Closed" },
    { date: "May 26, 2025", name: "Memorial Day", status: "Market Closed" },
    { date: "June 19, 2025", name: "Juneteenth", status: "Market Closed" },
    { date: "July 4, 2025", name: "Independence Day", status: "Market Closed" },
    { date: "September 1, 2025", name: "Labor Day", status: "Market Closed" },
    { date: "November 27, 2025", name: "Thanksgiving Day", status: "Market Closed" },
    { date: "November 28, 2025", name: "Day After Thanksgiving", status: "Early Close 1:00 PM ET" },
    { date: "December 25, 2025", name: "Christmas Day", status: "Market Closed" },
  ];

  const earlyCloseDates = [
    { date: "July 3, 2025", reason: "Day Before Independence Day" },
    { date: "November 28, 2025", reason: "Day After Thanksgiving" },
    { date: "December 24, 2025", reason: "Christmas Eve" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <CardTitle>2025 Market Holidays</CardTitle>
          </div>
          <CardDescription>NYSE and NASDAQ holiday schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {upcomingHolidays.map((holiday, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <div>
                  <div className="font-medium">{holiday.name}</div>
                  <div className="text-sm text-muted-foreground">{holiday.date}</div>
                </div>
                <Badge
                  variant={holiday.status.includes("Early") ? "secondary" : "destructive"}
                  className="whitespace-nowrap"
                >
                  {holiday.status.includes("Early") ? (
                    <Clock className="h-3 w-3 mr-1" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1" />
                  )}
                  {holiday.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Early Close Days</CardTitle>
          <CardDescription>Market closes at 1:00 PM ET on these days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {earlyCloseDates.map((day, index) => (
              <div key={index} className="p-4 rounded-lg border bg-yellow-50 dark:bg-yellow-950">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{day.date}</div>
                    <div className="text-sm text-muted-foreground mt-1">{day.reason}</div>
                  </div>
                  <Badge className="bg-yellow-600 text-white">1:00 PM Close</Badge>
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2 text-sm">Trading Tips for Holidays:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Lower trading volumes typical before/after holidays</li>
                <li>• Wider bid-ask spreads possible on half days</li>
                <li>• Plan trades around holiday schedules</li>
                <li>• Check broker-specific holiday hours</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
