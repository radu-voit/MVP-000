"use client"

import { useStepWizard } from "@/lib/step-wizard-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export function ReviewStep() {
  const { stepData, resetWizard } = useStepWizard()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Review & Complete</h2>
          <p className="text-muted-foreground">Review all the information you've provided</p>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="mb-3 font-semibold">Basic Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{stepData.name || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{stepData.email || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Description:</span>
              <span className="font-medium">{stepData.description || "Not provided"}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="mb-3 font-semibold">Selected Option</h3>
          <div className="text-sm">
            <span className="font-medium">{stepData.selectedOption || "No option selected"}</span>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="mb-3 font-semibold">Flow Diagram</h3>
          <div className="text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nodes:</span>
              <span className="font-medium">{stepData.flowNodes?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Connections:</span>
              <span className="font-medium">{stepData.flowEdges?.length || 0}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={resetWizard} variant="outline">
          Start Over
        </Button>
      </div>
    </div>
  )
}
