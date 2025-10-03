"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "00:00", value: 2400, baseline: 2000 },
  { time: "04:00", value: 1398, baseline: 2000 },
  { time: "08:00", value: 9800, baseline: 2000 },
  { time: "12:00", value: 3908, baseline: 2000 },
  { time: "16:00", value: 4800, baseline: 2000 },
  { time: "20:00", value: 3800, baseline: 2000 },
  { time: "24:00", value: 4300, baseline: 2000 },
]

export function AreaChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Volume</CardTitle>
        <CardDescription>Real-time request traffic over 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Requests",
              color: "hsl(var(--chart-1))",
            },
            baseline: {
              label: "Baseline",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="baseline"
                stroke="hsl(var(--chart-2))"
                strokeDasharray="5 5"
                fill="none"
                strokeWidth={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
