"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Step5Task2() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Cleaned Data</CardTitle>
        <CardDescription>Export the cleaned dataset</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This subtask will allow you to export the cleaned data in various formats.
        </p>
      </CardContent>
    </Card>
  )
}
