"use client"

import { StepWizardProvider } from "@/lib/step-wizard-context"
import { DataStoreProvider } from "@/lib/data-store-context"
import { StepWizard } from "@/components/step-wizard/step-wizard"
import { UploaderStep } from "@/components/step-wizard/packages/uploader-step"
import { TableSummaryStep } from "@/components/step-wizard/packages/table-summary-step"
import { DataGridStep } from "@/components/step-wizard/packages/data-grid-step"
import { RowViewerStep } from "@/components/step-wizard/packages/row-viewer-step"
import { DataProcessorStep } from "@/components/step-wizard/packages/data-processor-step"
import { SubtaskContainer } from "@/components/step-wizard/subtasks/subtask-container"

const steps = [
  {
    id: "step-1",
    title: "Upload Data",
    component: UploaderStep,
    subtasks: <SubtaskContainer stepNumber={1} />,
  },
  {
    id: "step-2",
    title: "Table Summary",
    component: TableSummaryStep,
    subtasks: <SubtaskContainer stepNumber={2} />,
  },
  {
    id: "step-3",
    title: "Data Grid",
    component: DataGridStep,
    subtasks: <SubtaskContainer stepNumber={3} />,
  },
  {
    id: "step-4",
    title: "Row Viewer",
    component: RowViewerStep,
    subtasks: <SubtaskContainer stepNumber={4} />,
  },
  {
    id: "step-5",
    title: "Data Processor",
    component: DataProcessorStep,
    subtasks: <SubtaskContainer stepNumber={5} />,
  },
]

export function StepWizardDemo() {
  return (
    <DataStoreProvider>
      <div className="container mx-auto max-w-5xl py-8">
        <StepWizardProvider totalSteps={steps.length}>
          <StepWizard steps={steps} />
        </StepWizardProvider>
      </div>
    </DataStoreProvider>
  )
}
