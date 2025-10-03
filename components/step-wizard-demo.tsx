"use client"

import { StepWizardProvider } from "@/lib/step-wizard-context"
import { StepWizard } from "@/components/step-wizard/step-wizard"
import { BasicFormStep } from "@/components/step-wizard/packages/basic-form-step"
import { SelectionStep } from "@/components/step-wizard/packages/selection-step"
import { ReactFlowStep } from "@/components/step-wizard/packages/react-flow-step"
import { ReviewStep } from "@/components/step-wizard/packages/review-step"

const steps = [
  {
    id: "basic-info",
    title: "Basic Info",
    component: BasicFormStep,
  },
  {
    id: "selection",
    title: "Selection",
    component: SelectionStep,
  },
  {
    id: "flow-design",
    title: "Flow Design",
    component: ReactFlowStep,
  },
  {
    id: "review",
    title: "Review",
    component: ReviewStep,
  },
]

export function StepWizardDemo() {
  return (
    <div className="container mx-auto max-w-5xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Step Wizard Package System</h1>
        <p className="text-muted-foreground">A modular step-based wizard with data passing between steps</p>
      </div>

      <StepWizardProvider totalSteps={steps.length}>
        <StepWizard steps={steps} />
      </StepWizardProvider>
    </div>
  )
}
