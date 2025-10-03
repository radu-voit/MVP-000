"use client"

import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { responseTime: 120, throughput: 450, size: 80 },
  { responseTime: 98, throughput: 520, size: 100 },
  { responseTime: 145, throughput: 380, size: 60 },
  { responseTime: 132, throughput: 420, size: 75 },
  { responseTime: 110, throughput: 490, size: 90 },
  { responseTime: 125, throughput: 440, size: 85 },
  { responseTime: 115, throughput: 470, size: 95 },
  { responseTime: 140, throughput: 390, size: 65 },
  { responseTime: 105, throughput: 510, size: 105 },
  { responseTime: 135, throughput: 400, size: 70 },
]

export function ScatterChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Distribution</CardTitle>
        <CardDescription>Response time vs throughput correlation</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            scatter: {
              label: "Performance",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                dataKey="responseTime"
                name="Response Time"
                unit="ms"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                type="number"
                dataKey="throughput"
                name="Throughput"
                unit="req/s"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Scatter name="Performance" data={data} fill="hsl(var(--chart-1))" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
