# Developer Notes

## Project Structure

\`\`\`
├── lib/
│   ├── data-store-context.tsx      # Central data management
│   └── step-wizard-context.tsx     # Step navigation management
├── components/
│   └── step-wizard/
│       ├── step-wizard.tsx         # Main wizard component
│       └── packages/               # Modular step packages
│           ├── uploader-step.tsx
│           ├── blank-step.tsx
│           └── [custom-packages]
├── docs/
│   ├── DATA_STORE.md              # Data store documentation
│   ├── PACKAGES.md                # Package development guide
│   └── DEV_NOTES.md               # This file
\`\`\`

## Key Concepts

### Dual Context System

The application uses two separate contexts:

1. **Data Store Context** (`data-store-context.tsx`)
   - Manages all data operations
   - Stores original and processed data
   - Provides data access methods
   - Independent of UI state

2. **Step Wizard Context** (`step-wizard-context.tsx`)
   - Manages step navigation
   - Stores step-specific UI state
   - Handles wizard flow
   - Independent of data operations

**Why separate?**
- Clear separation of concerns
- Data persists across wizard resets
- Easier testing and debugging
- More flexible architecture

### Data Flow Architecture

\`\`\`
User Upload → Parser → Data Store (Original) → Processing → Data Store (Processed) → Visualization/Export
                                    ↓
                              Step Wizard (UI State)
\`\`\`

## Implementation Details

### File Parsing

**CSV Parsing** (PapaParse):
- Header detection: `header: true`
- Type inference: `dynamicTyping: true`
- Error handling: Check `results.errors`

**Excel Parsing** (XLSX):
- Reads first sheet by default
- Converts to JSON: `XLSX.utils.sheet_to_json()`
- Binary string reading: `readAsBinaryString()`

### Data Storage Strategy

**Original Data**:
- Stored as-is from parser
- Keyed by unique file ID
- Never modified after upload
- Used as source of truth

**Processed Data**:
- Stored by descriptive keys
- Can be updated/overwritten
- Multiple processing results can coexist
- Used for visualizations and exports

### Error Handling

All errors are captured in the Data Store metadata:

\`\`\`typescript
dataStore.metadata.errors // Array of error messages
dataStore.metadata.processingStatus // Current status
\`\`\`

**Best practices**:
- Always wrap parsing in try-catch
- Use `addError()` to log errors
- Update `processingStatus` appropriately
- Provide user-friendly error messages

## Common Tasks

### Adding a New Package

1. Create file in `components/step-wizard/packages/`
2. Import contexts: `useDataStore()`, `useStepWizard()`
3. Implement package logic
4. Add to steps array in demo
5. Document in `PACKAGES.md`

### Accessing Uploaded Data

\`\`\`typescript
// Get all files
const files = dataStore.originalData.files

// Get specific file data
const data = getOriginalData(fileId)

// Check if data exists
if (files.length > 0) {
  const firstFileId = files[0].id
  const firstFileData = getOriginalData(firstFileId)
}
\`\`\`

### Processing Data

\`\`\`typescript
// 1. Get original data
const rawData = getOriginalData(fileId)

// 2. Process/transform
const processed = rawData?.map(row => {
  // Your transformation logic
  return transformedRow
})

// 3. Store processed data
updateProcessedData("myProcessingKey", processed)

// 4. Access later
const result = getProcessedData("myProcessingKey")
\`\`\`

## Performance Considerations

### Large Files

- CSV/Excel parsing is synchronous and can block UI
- Consider showing loading states
- For very large files (>10MB), consider:
  - Web Workers for parsing
  - Chunked processing
  - Pagination for display

### Memory Management

- Original data is kept in memory
- Multiple processed versions can accumulate
- Use `clearDataStore()` when appropriate
- Consider implementing data cleanup strategies

## Testing Strategy

### Unit Tests

- Test parsers independently
- Mock file uploads
- Test data store operations
- Test context providers

### Integration Tests

- Test full upload flow
- Test data passing between steps
- Test error scenarios
- Test wizard navigation with data

## Known Issues & Limitations

1. **Single file upload**: Currently only handles one file at a time
2. **Memory constraints**: Large files stored entirely in memory
3. **No persistence**: Data lost on page refresh
4. **Limited file types**: Only CSV and Excel supported

## Future Enhancements

- [ ] Multiple file upload support
- [ ] Data persistence (localStorage/IndexedDB)
- [ ] More file format support (JSON, XML, etc.)
- [ ] Data export functionality
- [ ] Advanced data transformations
- [ ] Data validation rules
- [ ] Undo/redo for data operations
- [ ] Real-time collaboration features

## Debugging Tips

### Enable Console Logging

Add debug logs to track data flow:

\`\`\`typescript
console.log("[v0] Data Store State:", dataStore)
console.log("[v0] Original Data:", getOriginalData(fileId))
console.log("[v0] Processed Data:", getProcessedData(key))
\`\`\`

### Common Issues

**"useDataStore must be used within a DataStoreProvider"**
- Ensure component is wrapped in `<DataStoreProvider>`
- Check provider hierarchy in layout/page

**"Cannot read property of undefined"**
- Check if data exists before accessing
- Use optional chaining: `data?.property`
- Verify file ID is correct

**Parsing errors**
- Check file format matches extension
- Verify file is not corrupted
- Check for special characters in CSV

## Dependencies

\`\`\`json
{
  "papaparse": "^5.4.1",
  "xlsx": "^0.18.5",
  "lucide-react": "latest"
}
\`\`\`

## Contact & Support

For questions or issues:
1. Check documentation in `/docs`
2. Review code comments
3. Check error messages in Data Store metadata
4. Enable debug logging
