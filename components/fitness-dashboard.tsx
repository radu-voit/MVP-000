"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeSettings } from "@/components/theme-settings"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, Line, LineChart, RadialBar, RadialBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Activity, Minus, Plus } from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 1800 },
  { month: "Feb", revenue: 2200 },
  { month: "Mar", revenue: 2100 },
  { month: "Apr", revenue: 2400 },
  { month: "May", revenue: 2600 },
  { month: "Jun", revenue: 2800 },
]

const exerciseData = [
  { day: "Mon", today: 45, average: 40 },
  { day: "Tue", today: 52, average: 42 },
  { day: "Wed", today: 38, average: 45 },
  { day: "Thu", today: 60, average: 48 },
  { day: "Fri", today: 55, average: 50 },
  { day: "Sat", today: 48, average: 35 },
  { day: "Sun", today: 42, average: 30 },
]

const payments = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
]

export function FitnessDashboard() {
  const [goalCalories, setGoalCalories] = useState(350)
  const [timeGoal, setTimeGoal] = useState(60)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center gap-4 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold">Fitness Dashboard</h1>
          </div>
          <div className="ml-auto">
            <ThemeSettings />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10">
          {/* Left Column */}
          <div className="grid gap-4 lg:col-span-6">
            {/* Revenue Cards */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardDescription>Total Revenue</CardDescription>
                  <CardTitle className="text-3xl">$15,231.89</CardTitle>
                  <CardDescription>+20.1% from last month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "hsl(var(--primary))",
                      },
                    }}
                    className="h-20"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="var(--color-revenue)"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--background))", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardDescription>Subscriptions</CardDescription>
                  <CardTitle className="text-3xl">+2,350</CardTitle>
                  <CardDescription>+18.1% from last month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      subscription: {
                        label: "Subscriptions",
                        color: "hsl(var(--primary))",
                      },
                    }}
                    className="h-20"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="var(--color-subscription)"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--background))", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Exercise Minutes */}
            <Card>
              <CardHeader>
                <CardTitle>Exercise Minutes</CardTitle>
                <CardDescription>Your exercise minutes are ahead of where you normally are.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    today: {
                      label: "Today",
                      color: "hsl(var(--primary))",
                    },
                    average: {
                      label: "Average",
                      color: "hsl(var(--muted-foreground))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={exerciseData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="today" fill="var(--color-today)" radius={4} />
                      <Bar dataKey="average" fill="var(--color-average)" radius={4} opacity={0.5} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="grid gap-4 lg:col-span-4">
            {/* Move Goal */}
            <Card>
              <CardHeader>
                <CardTitle>Move Goal</CardTitle>
                <CardDescription>Set your daily activity goal.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-transparent"
                    onClick={() => setGoalCalories(Math.max(100, goalCalories - 50))}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="text-center">
                    <div className="text-4xl font-bold tabular-nums">{goalCalories}</div>
                    <div className="text-xs uppercase text-muted-foreground">Calories/day</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-transparent"
                    onClick={() => setGoalCalories(Math.min(1000, goalCalories + 50))}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
                <ChartContainer
                  config={{
                    goal: {
                      label: "Goal",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[120px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      data={[{ value: (goalCalories / 1000) * 100 }]}
                      startAngle={90}
                      endAngle={-270}
                      innerRadius="80%"
                      outerRadius="100%"
                    >
                      <RadialBar dataKey="value" fill="var(--color-goal)" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Set Goal</Button>
              </CardFooter>
            </Card>

            {/* Time Outdoors */}
            <Card>
              <CardHeader>
                <CardTitle>Time Outdoors</CardTitle>
                <CardDescription>Set your daily outdoor time goal.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-transparent"
                    onClick={() => setTimeGoal(Math.max(15, timeGoal - 15))}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="text-center">
                    <div className="text-4xl font-bold tabular-nums">{timeGoal}</div>
                    <div className="text-xs uppercase text-muted-foreground">Minutes/day</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-transparent"
                    onClick={() => setTimeGoal(Math.min(240, timeGoal + 15))}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
                <ChartContainer
                  config={{
                    goal: {
                      label: "Goal",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[120px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      data={[{ value: (timeGoal / 240) * 100 }]}
                      startAngle={90}
                      endAngle={-270}
                      innerRadius="80%"
                      outerRadius="100%"
                    >
                      <RadialBar dataKey="value" fill="var(--color-goal)" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Set Goal</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Payments Table */}
          <div className="lg:col-span-10">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Payments</CardTitle>
                <CardDescription>Manage your payments.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                payment.status === "Paid"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                  : payment.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {payment.status}
                            </span>
                          </TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell className="text-right">{payment.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary">Add Payment</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
