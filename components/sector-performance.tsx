"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function SectorPerformance() {
  const data = [
    { sector: "Tech", performance: 2.3 },
    { sector: "Health", performance: 1.8 },
    { sector: "Consumer", performance: 1.5 },
    { sector: "Energy", performance: 0.7 },
    { sector: "Industrial", performance: 0.4 },
    { sector: "Finance", performance: -0.6 },
    { sector: "Utilities", performance: -0.9 },
    { sector: "Materials", performance: -1.2 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sector Performance</CardTitle>
        <CardDescription>Today's performance by sector (%)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sector" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="performance" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.performance >= 0 ? "#10b981" : "#ef4444"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
