"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Minus, Plus } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 1890 },
  { month: "Feb", revenue: 2340 },
  { month: "Mar", revenue: 2100 },
  { month: "Apr", revenue: 2890 },
  { month: "May", revenue: 3200 },
  { month: "Jun", revenue: 3100 },
]

const subscriptionData = [
  { month: "Jan", subscriptions: 145 },
  { month: "Feb", subscriptions: 178 },
  { month: "Mar", subscriptions: 165 },
  { month: "Apr", subscriptions: 198 },
  { month: "May", subscriptions: 220 },
  { month: "Jun", subscriptions: 215 },
]

const exerciseData = [
  { day: "Mon", today: 45, average: 40 },
  { day: "Tue", today: 52, average: 45 },
  { day: "Wed", today: 38, average: 42 },
  { day: "Thu", today: 60, average: 48 },
  { day: "Fri", today: 55, average: 50 },
  { day: "Sat", today: 48, average: 45 },
  { day: "Sun", today: 42, average: 40 },
]

const payments = [
  { id: "INV001", customer: "Olivia Martin", email: "olivia.martin@email.com", status: "Paid", amount: "$1,999.00" },
  { id: "INV002", customer: "Jackson Lee", email: "jackson.lee@email.com", status: "Pending", amount: "$39.00" },
  { id: "INV003", customer: "Isabella Nguyen", email: "isabella.nguyen@email.com", status: "Paid", amount: "$299.00" },
  { id: "INV004", customer: "William Kim", email: "will@email.com", status: "Paid", amount: "$99.00" },
  { id: "INV005", customer: "Sofia Davis", email: "sofia.davis@email.com", status: "Refunded", amount: "$39.00" },
]

export function CardUIPage() {
  const [moveGoal, setMoveGoal] = useState(350)
  const [timeOutdoorsGoal, setTimeOutdoorsGoal] = useState(60)
  const [activeEnergyGoal, setActiveEnergyGoal] = useState(600)

  const moveProgress = [{ value: 75, fill: "hsl(var(--primary))" }]
  const timeOutdoorsProgress = [{ value: 45, fill: "hsl(var(--primary))" }]
  const activeEnergyProgress = [{ value: 82, fill: "hsl(var(--primary))" }]

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10">
          {/* Left Column - Revenue Cards and Exercise */}
          <div className="grid gap-4 lg:col-span-6">
            {/* Revenue Cards Row */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Total Revenue Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Revenue</CardDescription>
                  <CardTitle className="text-3xl">$15,231.89</CardTitle>
                  <CardDescription>+20.1% from last month</CardDescription>
                </CardHeader>
                <CardContent className="pb-0">
                  <div className="h-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ fill: "#fff", strokeWidth: 2, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Subscriptions Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Subscriptions</CardDescription>
                  <CardTitle className="text-3xl">+2,350</CardTitle>
                  <CardDescription>+180.1% from last month</CardDescription>
                </CardHeader>
                <CardContent className="pb-0">
                  <div className="h-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={subscriptionData}>
                        <Line
                          type="monotone"
                          dataKey="subscriptions"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ fill: "#fff", strokeWidth: 2, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Move Goal Card - Mobile Only */}
            <div className="lg:hidden">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Move Goal</CardTitle>
                  <CardDescription>Set your daily activity goal.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-7 rounded-full bg-transparent"
                      onClick={() => setMoveGoal(Math.max(0, moveGoal - 50))}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="text-center">
                      <div className="text-4xl font-bold tabular-nums">{moveGoal}</div>
                      <div className="text-xs uppercase text-muted-foreground">Calories/day</div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-7 rounded-full bg-transparent"
                      onClick={() => setMoveGoal(moveGoal + 50)}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                  <div className="mx-auto mt-6 h-32 w-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        data={moveProgress}
                        startAngle={90}
                        endAngle={-270}
                        innerRadius="80%"
                        outerRadius="100%"
                      >
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar dataKey="value" cornerRadius={10} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Set Goal</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Exercise Minutes Card */}
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Exercise Minutes</CardTitle>
                <CardDescription>Your exercise minutes are ahead of where you normally are.</CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={exerciseData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Bar dataKey="today" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="average" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Goal Cards */}
          <div className="grid gap-4 lg:col-span-4">
            {/* Move Goal Card - Desktop */}
            <Card className="hidden h-full lg:block">
              <CardHeader>
                <CardTitle>Move Goal</CardTitle>
                <CardDescription>Set your daily activity goal.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7 rounded-full bg-transparent"
                    onClick={() => setMoveGoal(Math.max(0, moveGoal - 50))}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="text-center">
                    <div className="text-4xl font-bold tabular-nums">{moveGoal}</div>
                    <div className="text-xs uppercase text-muted-foreground">Calories/day</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7 rounded-full bg-transparent"
                    onClick={() => setMoveGoal(moveGoal + 50)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
                <div className="mx-auto mt-6 h-32 w-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      data={moveProgress}
                      startAngle={90}
                      endAngle={-270}
                      innerRadius="80%"
                      outerRadius="100%"
                    >
                      <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                      <RadialBar dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  Set Goal
                </Button>
              </CardFooter>
            </Card>

            {/* Time Outdoors Card */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Time Outdoors</CardTitle>
                <CardDescription>Set your daily outdoor time goal.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7 rounded-full bg-transparent"
                    onClick={() => setTimeOutdoorsGoal(Math.max(0, timeOutdoorsGoal - 10))}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="text-center">
                    <div className="text-4xl font-bold tabular-nums">{timeOutdoorsGoal}</div>
                    <div className="text-xs uppercase text-muted-foreground">Minutes/day</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7 rounded-full bg-transparent"
                    onClick={() => setTimeOutdoorsGoal(timeOutdoorsGoal + 10)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
                <div className="mx-auto mt-6 h-32 w-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      data={timeOutdoorsProgress}
                      startAngle={90}
                      endAngle={-270}
                      innerRadius="80%"
                      outerRadius="100%"
                    >
                      <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                      <RadialBar dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  Set Goal
                </Button>
              </CardFooter>
            </Card>

            {/* Active Energy Card */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Active Energy</CardTitle>
                <CardDescription>Set your daily active energy goal.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7 rounded-full bg-transparent"
                    onClick={() => setActiveEnergyGoal(Math.max(0, activeEnergyGoal - 50))}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="text-center">
                    <div className="text-4xl font-bold tabular-nums">{activeEnergyGoal}</div>
                    <div className="text-xs uppercase text-muted-foreground">Calories/day</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7 rounded-full bg-transparent"
                    onClick={() => setActiveEnergyGoal(activeEnergyGoal + 50)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
                <div className="mx-auto mt-6 h-32 w-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      data={activeEnergyProgress}
                      startAngle={90}
                      endAngle={-270}
                      innerRadius="80%"
                      outerRadius="100%"
                    >
                      <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                      <RadialBar dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  Set Goal
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Payments Table - Full Width */}
          <Card className="col-span-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">Payments</CardTitle>
                  <CardDescription>Manage your payments.</CardDescription>
                </div>
                <Button variant="secondary" size="sm">
                  Add Payment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell>{payment.email}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              payment.status === "Paid"
                                ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : payment.status === "Pending"
                                  ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                  : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{payment.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
