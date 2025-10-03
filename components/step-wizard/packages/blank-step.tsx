"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface BlankStepProps {
  stepId: string
  title: string
}

export function BlankStep({ stepId, title }: BlankStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>This step is ready for your package</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[300px] flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-lg">Blank canvas</p>
          <p className="text-sm mt-2">Choose a package to display on this step</p>
        </div>
      </CardContent>
    </Card>
  )
}
