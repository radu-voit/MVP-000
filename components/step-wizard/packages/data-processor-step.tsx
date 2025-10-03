"use client"

import { useDataStore } from "@/lib/data-store-context"
import { useStepWizard } from "@/lib/step-wizard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useState, useMemo, useEffect } from "react"
import { SubtaskContainer } from "@/components/step-wizard/subtasks/subtask-container"
import { SubtaskCard } from "@/components/step-wizard/subtasks/subtask-card"
import { Step5Task1 } from "@/components/step-wizard/subtasks/step5-task1/task"
import { Step5Task2 } from "@/components/step-wizard/subtasks/step5-task2/task"
import { Step5Task3 } from "@/components/step-wizard/subtasks/step5-task3/task"

/**
 * DATA PROCESSOR STEP
 *
 * Provides tools to clean and transform data:
 * - Remove rows with missing values
 * - Remove duplicate rows
 * - Trim whitespace from text fields
 * - Preview cleaning operations before applying
 *
 * Features:
 * - Shows data quality metrics
 * - Allows selective cleaning operations
 * - Preview before/after statistics
 */

export function DataProcessorStep() {
  const { dataStore, updateDataStore } = useDataStore()
  const { markStepComplete } = useStepWizard()
  const [selectedOperations, setSelectedOperations] = useState<string[]>([])

  // Get the most recent file's data
  const data = useMemo(() => {
    const files = dataStore.originalData.files
    if (files.length === 0) return null

    const latestFile = files[files.length - 1]
    return dataStore.originalData.rawData[latestFile.id]
  }, [dataStore.originalData.files, dataStore.originalData.rawData])

  // Calculate data quality metrics
  const metrics = useMemo(() => {
    if (!data || data.length === 0) return null

    const totalRows = data.length
    const headers = Object.keys(data[0])

    // Count rows with missing values
    const rowsWithMissing = data.filter((row) =>
      headers.some((header) => row[header] === null || row[header] === undefined || row[header] === ""),
    ).length

    // Count duplicate rows
    const uniqueRows = new Set(data.map((row) => JSON.stringify(row)))
    const duplicateRows = totalRows - uniqueRows.size

    // Count fields with whitespace issues
    let fieldsWithWhitespace = 0
    data.forEach((row) => {
      headers.forEach((header) => {
        const value = row[header]
        if (typeof value === "string" && value !== value.trim()) {
          fieldsWithWhitespace++
        }
      })
    })

    return {
      totalRows,
      rowsWithMissing,
      duplicateRows,
      fieldsWithWhitespace,
      headers: headers.length,
    }
  }, [data])

  const cleaningOperations = [
    {
      id: "remove-missing",
      label: "Remove rows with missing values",
      description: `${metrics?.rowsWithMissing || 0} rows affected`,
      enabled: (metrics?.rowsWithMissing || 0) > 0,
    },
    {
      id: "remove-duplicates",
      label: "Remove duplicate rows",
      description: `${metrics?.duplicateRows || 0} duplicates found`,
      enabled: (metrics?.duplicateRows || 0) > 0,
    },
    {
      id: "trim-whitespace",
      label: "Trim whitespace from text fields",
      description: `${metrics?.fieldsWithWhitespace || 0} fields affected`,
      enabled: (metrics?.fieldsWithWhitespace || 0) > 0,
    },
  ]

  const toggleOperation = (operationId: string) => {
    setSelectedOperations((prev) =>
      prev.includes(operationId) ? prev.filter((id) => id !== operationId) : [...prev, operationId],
    )
  }

  const applyCleaningOperations = () => {
    if (!data) return

    let cleanedData = [...data]

    // Apply selected operations
    if (selectedOperations.includes("remove-missing")) {
      const headers = Object.keys(cleanedData[0])
      cleanedData = cleanedData.filter((row) =>
        headers.every((header) => row[header] !== null && row[header] !== undefined && row[header] !== ""),
      )
    }

    if (selectedOperations.includes("remove-duplicates")) {
      const seen = new Set()
      cleanedData = cleanedData.filter((row) => {
        const key = JSON.stringify(row)
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    }

    if (selectedOperations.includes("trim-whitespace")) {
      cleanedData = cleanedData.map((row) => {
        const newRow: any = {}
        Object.keys(row).forEach((key) => {
          const value = row[key]
          newRow[key] = typeof value === "string" ? value.trim() : value
        })
        return newRow
      })
    }

    // Update the data store with cleaned data
    const files = dataStore.originalData.files
    const latestFile = files[files.length - 1]

    updateDataStore({
      originalData: {
        ...dataStore.originalData,
        rawData: {
          ...dataStore.originalData.rawData,
          [latestFile.id]: cleanedData,
        },
      },
    })

    // Mark step as complete
    markStepComplete(5)
  }

  useEffect(() => {
    // Auto-complete if data exists
    if (data && data.length > 0) {
      markStepComplete(5)
    }
  }, [data, markStepComplete])

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Data Available</CardTitle>
            <CardDescription>Please upload a file in Step 1 to clean data.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Data Quality Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Data Quality Overview</CardTitle>
          <CardDescription>Review data quality metrics before processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold">{metrics?.totalRows}</div>
              <div className="text-sm text-muted-foreground">Total Rows</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{metrics?.headers}</div>
              <div className="text-sm text-muted-foreground">Columns</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-orange-600">{metrics?.rowsWithMissing}</div>
              <div className="text-sm text-muted-foreground">Missing Values</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-red-600">{metrics?.duplicateRows}</div>
              <div className="text-sm text-muted-foreground">Duplicates</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cleaning Operations */}
      <Card>
        <CardHeader>
          <CardTitle>Processing Operations</CardTitle>
          <CardDescription>Select operations to apply to your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cleaningOperations.map((operation) => (
              <div key={operation.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <Checkbox
                  id={operation.id}
                  checked={selectedOperations.includes(operation.id)}
                  onCheckedChange={() => toggleOperation(operation.id)}
                  disabled={!operation.enabled}
                />
                <div className="flex-1 space-y-1">
                  <label
                    htmlFor={operation.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {operation.label}
                  </label>
                  <p className="text-sm text-muted-foreground">{operation.description}</p>
                </div>
                {!operation.enabled && (
                  <Badge variant="secondary" className="text-xs">
                    Not needed
                  </Badge>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={applyCleaningOperations} disabled={selectedOperations.length === 0}>
              Apply Processing Operations
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subtasks Section */}
      <SubtaskContainer>
        <SubtaskCard stepNumber={5} taskNumber={1} TaskComponent={Step5Task1} />
        <SubtaskCard stepNumber={5} taskNumber={2} TaskComponent={Step5Task2} />
        <SubtaskCard stepNumber={5} taskNumber={3} TaskComponent={Step5Task3} />
      </SubtaskContainer>
    </div>
  )
}
