"use client"

import { StepWizardProvider } from "@/lib/step-wizard-context"
import { DataStoreProvider } from "@/lib/data-store-context"
import { StepWizard } from "@/components/step-wizard/step-wizard"
import { UploaderStep } from "@/components/step-wizard/packages/uploader-step"
import { TableSummaryStep } from "@/components/step-wizard/packages/table-summary-step"
import { DataGridStep } from "@/components/step-wizard/packages/data-grid-step"
import { BlankStep } from "@/components/step-wizard/packages/blank-step"

const steps = [
  {
    id: "step-1",
    title: "Upload Data",
    component: UploaderStep,
  },
  {
    id: "step-2",
    title: "Table Summary",
    component: TableSummaryStep,
  },
  {
    id: "step-3",
    title: "Data Grid",
    component: DataGridStep,
  },
  {
    id: "step-4",
    title: "Step 4",
    component: BlankStep,
  },
]

export function StepWizardDemo() {
  return (
    <DataStoreProvider>
      <div className="container mx-auto max-w-5xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Step Wizard Package System</h1>
          <p className="text-muted-foreground">A modular step-based wizard with centralized data management</p>
        </div>

        <StepWizardProvider totalSteps={steps.length}>
          <StepWizard steps={steps} />
        </StepWizardProvider>
      </div>
    </DataStoreProvider>
  )
}
