"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "00:00", latency: 120, p95: 180, p99: 250 },
  { time: "04:00", latency: 98, p95: 150, p99: 220 },
  { time: "08:00", latency: 145, p95: 200, p99: 280 },
  { time: "12:00", latency: 132, p95: 185, p99: 260 },
  { time: "16:00", latency: 110, p95: 165, p99: 235 },
  { time: "20:00", latency: 125, p95: 175, p99: 245 },
  { time: "24:00", latency: 115, p95: 170, p99: 240 },
]

export function LineChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Response Time</CardTitle>
        <CardDescription>Average, P95, and P99 latency metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            latency: {
              label: "Avg Latency",
              color: "hsl(var(--chart-1))",
            },
            p95: {
              label: "P95",
              color: "hsl(var(--chart-3))",
            },
            p99: {
              label: "P99",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="latency" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="p95" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="p99" stroke="hsl(var(--chart-5))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
