# Step Wizard Packages Documentation

## Overview

Packages are modular components that can be assigned to any step in the wizard. Each package is self-contained and can access both the Step Wizard context and the Data Store context.

## Available Packages

### 1. Uploader Step (`uploader-step.tsx`)

**Purpose**: Upload and parse CSV/Excel files

**Features**:
- Drag-and-drop file upload
- File type validation
- CSV parsing using PapaParse
- Excel parsing using XLSX
- Automatic storage in Data Store
- Upload status feedback
- File list display

**Data Store Integration**:
- Stores original data using `addOriginalData()`
- Updates processing status
- Logs errors to metadata

**Usage**:
\`\`\`typescript
import { UploaderStep } from "@/components/step-wizard/packages/uploader-step"

const steps = [
  {
    id: "upload",
    title: "Upload Data",
    component: UploaderStep,
  },
]
\`\`\`

### 2. Blank Step (`blank-step.tsx`)

**Purpose**: Placeholder for future packages

**Features**:
- Simple placeholder UI
- Ready for custom implementation

**Usage**:
\`\`\`typescript
import { BlankStep } from "@/components/step-wizard/packages/blank-step"
\`\`\`

## Creating New Packages

### Package Template

\`\`\`typescript
"use client"

import { useDataStore } from "@/lib/data-store-context"
import { useStepWizard } from "@/lib/step-wizard-context"

export function MyCustomPackage() {
  const { dataStore, updateProcessedData } = useDataStore()
  const { stepData, updateStepData } = useStepWizard()
  
  // Your package logic here
  
  return (
    <div>
      {/* Your package UI */}
    </div>
  )
}
\`\`\`

### Package Guidelines

1. **Use "use client" directive** - All packages are client components
2. **Access contexts** - Use `useDataStore()` and `useStepWizard()` hooks
3. **Handle errors gracefully** - Always provide user feedback
4. **Document your package** - Add JSDoc comments
5. **Keep it modular** - Packages should be self-contained
6. **Follow naming convention** - Use `*-step.tsx` suffix

## Package Communication

### Accessing Data from Previous Steps

\`\`\`typescript
// Access data from Data Store (recommended for file data)
const originalData = getOriginalData(fileId)

// Access step-specific data from Step Wizard
const previousStepData = stepData.someKey
\`\`\`

### Passing Data to Next Steps

\`\`\`typescript
// Store in Data Store (for processed data)
updateProcessedData("myKey", processedData)

// Store in Step Wizard (for UI state)
updateStepData({ myKey: value })
\`\`\`

## Dependencies

### Required Libraries

- **PapaParse** (`papaparse`): CSV parsing
- **XLSX** (`xlsx`): Excel file parsing
- **Lucide React** (`lucide-react`): Icons

### Installation

\`\`\`bash
npm install papaparse xlsx
npm install -D @types/papaparse
\`\`\`

## Examples

### Example: Data Visualization Package

\`\`\`typescript
"use client"

import { useDataStore } from "@/lib/data-store-context"
import { BarChart } from "@/components/charts/bar-chart"

export function VisualizationStep() {
  const { dataStore, getOriginalData } = useDataStore()
  
  // Get first uploaded file
  const firstFile = dataStore.originalData.files[0]
  const data = firstFile ? getOriginalData(firstFile.id) : []
  
  return (
    <div>
      <h2>Data Visualization</h2>
      {data.length > 0 ? (
        <BarChart data={data} />
      ) : (
        <p>No data available. Please upload a file first.</p>
      )}
    </div>
  )
}
\`\`\`

### Example: Data Transformation Package

\`\`\`typescript
"use client"

import { useDataStore } from "@/lib/data-store-context"
import { Button } from "@/components/ui/button"

export function TransformStep() {
  const { getOriginalData, updateProcessedData, dataStore } = useDataStore()
  
  const handleTransform = () => {
    const firstFile = dataStore.originalData.files[0]
    if (!firstFile) return
    
    const rawData = getOriginalData(firstFile.id)
    
    // Transform data
    const transformed = rawData?.map(row => ({
      ...row,
      processed: true,
      timestamp: new Date()
    }))
    
    // Store processed data
    updateProcessedData("transformed", transformed)
  }
  
  return (
    <div>
      <h2>Transform Data</h2>
      <Button onClick={handleTransform}>Apply Transformation</Button>
    </div>
  )
}
