"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { endpoint: "/api/users", requests: 4000, errors: 24 },
  { endpoint: "/api/posts", requests: 3000, errors: 13 },
  { endpoint: "/api/auth", requests: 2000, errors: 8 },
  { endpoint: "/api/data", requests: 2780, errors: 19 },
  { endpoint: "/api/files", requests: 1890, errors: 5 },
  { endpoint: "/api/search", requests: 2390, errors: 12 },
]

export function BarChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Endpoint Performance</CardTitle>
        <CardDescription>Request volume and error rates by endpoint</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            requests: {
              label: "Requests",
              color: "hsl(var(--chart-1))",
            },
            errors: {
              label: "Errors",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="endpoint" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="requests" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="errors" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
