"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Step5Task3() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cleaning Report</CardTitle>
        <CardDescription>Generate a report of cleaning operations</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This subtask will generate a detailed report of all cleaning operations performed.
        </p>
      </CardContent>
    </Card>
  )
}
