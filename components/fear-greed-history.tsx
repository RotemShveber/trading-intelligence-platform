"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export function FearGreedHistory() {
  // Mock historical data
  const historyData = [
    { date: "Jan 1", value: 45 },
    { date: "Jan 8", value: 52 },
    { date: "Jan 15", value: 48 },
    { date: "Jan 22", value: 55 },
    { date: "Jan 29", value: 58 },
    { date: "Feb 5", value: 62 },
    { date: "Feb 12", value: 59 },
    { date: "Feb 19", value: 65 },
    { date: "Feb 26", value: 63 },
    { date: "Mar 4", value: 68 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Trend</CardTitle>
        <CardDescription>Fear & Greed Index over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            {/* Reference lines for zones */}
            <ReferenceLine y={25} stroke="#ef4444" strokeDasharray="3 3" />
            <ReferenceLine y={45} stroke="#f97316" strokeDasharray="3 3" />
            <ReferenceLine y={55} stroke="#eab308" strokeDasharray="3 3" />
            <ReferenceLine y={75} stroke="#84cc16" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg border">
            <div className="text-sm text-muted-foreground">7-Day Avg</div>
            <div className="text-xl font-bold">62.3</div>
          </div>
          <div className="text-center p-3 rounded-lg border">
            <div className="text-sm text-muted-foreground">30-Day Avg</div>
            <div className="text-xl font-bold">58.7</div>
          </div>
          <div className="text-center p-3 rounded-lg border">
            <div className="text-sm text-muted-foreground">Highest</div>
            <div className="text-xl font-bold">68</div>
          </div>
          <div className="text-center p-3 rounded-lg border">
            <div className="text-sm text-muted-foreground">Lowest</div>
            <div className="text-xl font-bold">45</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
