"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Step5Task1() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Validation</CardTitle>
        <CardDescription>Validate cleaned data meets quality standards</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This subtask will validate that the cleaned data meets your quality requirements.
        </p>
      </CardContent>
    </Card>
  )
}
