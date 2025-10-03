"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Lock } from "lucide-react"
import { useStepWizard } from "@/lib/step-wizard-context"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  component: React.ComponentType<any>
  subtasks?: React.ReactNode
}

interface StepWizardProps {
  steps: Step[]
  showNavigation?: boolean
  className?: string
}

export function StepWizard({ steps, showNavigation = true, className }: StepWizardProps) {
  const { currentStep, goToStep, nextStep, prevStep, canGoNext, canGoPrev, canNavigateToStep, isStepComplete } =
    useStepWizard()

  const CurrentStepComponent = steps[currentStep]?.component
  const currentSubtasks = steps[currentStep]?.subtasks

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Step Indicator */}
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const canNavigate = canNavigateToStep(index)
          const isComplete = isStepComplete(index)
          const isCurrent = index === currentStep

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => goToStep(index)}
                disabled={!canNavigate}
                className={cn(
                  "flex flex-1 flex-col items-center gap-2 rounded-lg border p-4 transition-all relative",
                  isCurrent
                    ? "border-primary bg-primary/10 text-primary"
                    : isComplete
                      ? "border-primary/50 bg-primary/5 text-primary/70 hover:bg-primary/10"
                      : canNavigate
                        ? "border-border bg-card text-muted-foreground hover:bg-accent"
                        : "border-border bg-muted/50 text-muted-foreground/50 cursor-not-allowed",
                )}
              >
                {isCurrent && currentSubtasks && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-6 bg-primary/50 z-10" />
                )}
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : isComplete
                        ? "bg-primary/70 text-primary-foreground"
                        : canNavigate
                          ? "bg-muted text-muted-foreground"
                          : "bg-muted/50 text-muted-foreground/50",
                  )}
                >
                  {!canNavigate ? <Lock className="h-4 w-4" /> : index + 1}
                </div>
                <span className="text-sm font-medium">{step.title}</span>
              </button>
              {index < steps.length - 1 && (
                <div className={cn("h-0.5 w-8 transition-colors", isComplete ? "bg-primary" : "bg-border")} />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {currentSubtasks && <div className="w-full border-l-2 border-primary/30 pl-4 -mt-2">{currentSubtasks}</div>}

      {/* Step Content */}
      <Card className="p-6">{CurrentStepComponent && <CurrentStepComponent />}</Card>

      {/* Navigation */}
      {showNavigation && (
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={prevStep} disabled={!canGoPrev} className="gap-2 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="relative group">
            <Button onClick={nextStep} disabled={!canGoNext} className="gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
            {!canGoNext && currentStep < steps.length - 1 && (
              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
                <div className="bg-popover text-popover-foreground text-sm rounded-md px-3 py-2 shadow-md whitespace-nowrap">
                  Complete this step to continue
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
