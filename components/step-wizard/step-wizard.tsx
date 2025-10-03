"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useStepWizard } from "@/lib/step-wizard-context"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  component: React.ComponentType<any>
}

interface StepWizardProps {
  steps: Step[]
  showNavigation?: boolean
  className?: string
}

export function StepWizard({ steps, showNavigation = true, className }: StepWizardProps) {
  const { currentStep, goToStep, nextStep, prevStep, canGoNext, canGoPrev } = useStepWizard()

  const CurrentStepComponent = steps[currentStep]?.component

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Step Indicator */}
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <button
              onClick={() => goToStep(index)}
              className={cn(
                "flex flex-1 flex-col items-center gap-2 rounded-lg border p-4 transition-all",
                index === currentStep
                  ? "border-primary bg-primary/10 text-primary"
                  : index < currentStep
                    ? "border-primary/50 bg-primary/5 text-primary/70 hover:bg-primary/10"
                    : "border-border bg-card text-muted-foreground hover:bg-accent",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                  index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : index < currentStep
                      ? "bg-primary/70 text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {index + 1}
              </div>
              <span className="text-sm font-medium">{step.title}</span>
            </button>
            {index < steps.length - 1 && (
              <div className={cn("h-0.5 w-8 transition-colors", index < currentStep ? "bg-primary" : "bg-border")} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <Card className="p-6">{CurrentStepComponent && <CurrentStepComponent />}</Card>

      {/* Navigation */}
      {showNavigation && (
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={prevStep} disabled={!canGoPrev} className="gap-2 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button onClick={nextStep} disabled={!canGoNext} className="gap-2">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
