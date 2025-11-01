"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function MarketIndices() {
  // Mock data - will be replaced with real API data
  const chartData = [
    { time: "9:30", sp500: 4750, nasdaq: 14900, dow: 37200 },
    { time: "10:00", sp500: 4760, nasdaq: 14920, dow: 37250 },
    { time: "10:30", sp500: 4755, nasdaq: 14910, dow: 37220 },
    { time: "11:00", sp500: 4770, nasdaq: 14950, dow: 37280 },
    { time: "11:30", sp500: 4775, nasdaq: 14970, dow: 37300 },
    { time: "12:00", sp500: 4783, nasdaq: 15011, dow: 37305 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Indices - Live</CardTitle>
        <CardDescription>Real-time performance tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Indices</TabsTrigger>
            <TabsTrigger value="sp500">S&P 500</TabsTrigger>
            <TabsTrigger value="nasdaq">Nasdaq</TabsTrigger>
            <TabsTrigger value="dow">Dow Jones</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sp500"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="S&P 500"
                />
                <Line
                  type="monotone"
                  dataKey="nasdaq"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Nasdaq"
                />
                <Line
                  type="monotone"
                  dataKey="dow"
                  stroke="#ffc658"
                  strokeWidth={2}
                  name="Dow Jones"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="sp500">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sp500"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="S&P 500"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="nasdaq">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="nasdaq"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Nasdaq"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="dow">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="dow"
                  stroke="#ffc658"
                  strokeWidth={2}
                  name="Dow Jones"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
