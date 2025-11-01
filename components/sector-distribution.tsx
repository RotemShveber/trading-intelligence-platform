"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export function SectorDistribution() {
  const data = [
    { name: "Technology", value: 28.5, color: "#3b82f6" },
    { name: "Healthcare", value: 15.2, color: "#10b981" },
    { name: "Financials", value: 13.8, color: "#f59e0b" },
    { name: "Consumer Discretionary", value: 12.1, color: "#8b5cf6" },
    { name: "Industrials", value: 10.4, color: "#ef4444" },
    { name: "Energy", value: 8.3, color: "#14b8a6" },
    { name: "Real Estate", value: 6.2, color: "#f97316" },
    { name: "Others", value: 5.5, color: "#6b7280" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Cap Distribution</CardTitle>
        <CardDescription>Distribution by sector (% of total market cap)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(props: any) =>
                `${props.name}: ${(props.percent * 100).toFixed(1)}%`
              }
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
