# Data Store Documentation

## Overview

The Data Store is a centralized state management system for handling all data operations in the application. It provides a single source of truth for both original uploaded data and processed data.

## Architecture

### Data Structure

\`\`\`typescript
interface DataStore {
  originalData: {
    files: UploadedFile[]      // Metadata about uploaded files
    rawData: Record<string, any[]>  // Raw data keyed by file ID
  }
  processedData: {
    [key: string]: any         // Processed/transformed data
  }
  metadata: {
    lastUpdated: Date | null
    processingStatus: "idle" | "processing" | "complete" | "error"
    errors: string[]
  }
}
\`\`\`

## Usage

### Accessing the Data Store

\`\`\`typescript
import { useDataStore } from "@/lib/data-store-context"

function MyComponent() {
  const { dataStore, addOriginalData, updateProcessedData } = useDataStore()
  
  // Access original data
  const files = dataStore.originalData.files
  
  // Access processed data
  const processedResults = dataStore.processedData.myKey
}
\`\`\`

### Adding Original Data

When uploading files, use `addOriginalData` to store the raw data:

\`\`\`typescript
addOriginalData(
  fileId,      // Unique identifier for the file
  fileName,    // Original file name
  fileType,    // MIME type
  fileSize,    // Size in bytes
  data         // Parsed data array
)
\`\`\`

### Updating Processed Data

After processing or transforming data, store results using `updateProcessedData`:

\`\`\`typescript
updateProcessedData("myProcessingKey", {
  transformed: [...],
  statistics: {...},
  visualizations: {...}
})
\`\`\`

### Retrieving Data

\`\`\`typescript
// Get original data by file ID
const rawData = getOriginalData(fileId)

// Get processed data by key
const processed = getProcessedData("myProcessingKey")
\`\`\`

## Best Practices

1. **Always use the data store** - Never store data in local component state if it needs to be accessed elsewhere
2. **Use descriptive keys** - When storing processed data, use clear, descriptive keys
3. **Handle errors** - Always check for errors in `dataStore.metadata.errors`
4. **Monitor processing status** - Check `dataStore.metadata.processingStatus` before operations
5. **Clear when needed** - Use `clearDataStore()` to reset the entire store

## Data Flow

1. User uploads file → Uploader Step
2. File is parsed → Raw data extracted
3. `addOriginalData()` → Stored in `originalData.rawData`
4. Processing occurs → Transformations applied
5. `updateProcessedData()` → Stored in `processedData`
6. Other components access data via `getOriginalData()` or `getProcessedData()`

## Integration with Step Wizard

The Data Store is independent of the Step Wizard but works alongside it:

- **Step Wizard Context**: Manages navigation and step-specific UI state
- **Data Store Context**: Manages all data operations and storage

Both contexts should be used together at the app level:

\`\`\`typescript
<DataStoreProvider>
  <StepWizardProvider totalSteps={4}>
    <StepWizard steps={steps} />
  </StepWizardProvider>
</DataStoreProvider>
