"use client"

import { useDataStore } from "@/lib/data-store-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useMemo } from "react"
import { SubtaskContainer } from "@/components/step-wizard/subtasks/subtask-container"
import { SubtaskCard } from "@/components/step-wizard/subtasks/subtask-card"
import { Step4Task1 } from "@/components/step-wizard/subtasks/step4-task1/task"
import { Step4Task2 } from "@/components/step-wizard/subtasks/step4-task2/task"
import { Step4Task3 } from "@/components/step-wizard/subtasks/step4-task3/task"

/**
 * ROW VIEWER STEP
 *
 * Displays individual rows from uploaded data in a card format.
 * Users can navigate through rows using arrow buttons.
 *
 * Features:
 * - Card-based display of all fields in a row
 * - Navigation arrows to step through rows
 * - Current row indicator
 * - Handles empty values gracefully
 */

export function RowViewerStep() {
  const { dataStore } = useDataStore()
  const [currentRowIndex, setCurrentRowIndex] = useState(0)

  // Get the most recent file's data
  const data = useMemo(() => {
    const files = dataStore.originalData.files
    if (files.length === 0) return null

    const latestFile = files[files.length - 1]
    return dataStore.originalData.rawData[latestFile.id]
  }, [dataStore.originalData.files, dataStore.originalData.rawData])

  // Get headers from the first row
  const headers = useMemo(() => {
    if (!data || data.length === 0) return []
    return Object.keys(data[0])
  }, [data])

  // Get current row data
  const currentRow = useMemo(() => {
    if (!data || data.length === 0) return null
    return data[currentRowIndex]
  }, [data, currentRowIndex])

  const handlePrevious = () => {
    setCurrentRowIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    if (data) {
      setCurrentRowIndex((prev) => Math.min(data.length - 1, prev + 1))
    }
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Data Available</CardTitle>
            <CardDescription>Please upload a file in Step 1 to view row data.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!currentRow) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error Loading Row</CardTitle>
            <CardDescription>Unable to load row data.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentRowIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">
            Row {currentRowIndex + 1} of {data.length}
          </div>
          <Button variant="outline" size="icon" onClick={handleNext} disabled={currentRowIndex === data.length - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Row Data Card */}
      <Card>
        <CardHeader>
          <CardTitle>Row Details</CardTitle>
          <CardDescription>Viewing row {currentRowIndex + 1}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {headers.map((header) => (
              <div key={header} className="grid grid-cols-3 gap-4 border-b pb-3 last:border-b-0">
                <div className="font-medium text-sm text-muted-foreground">{header}</div>
                <div className="col-span-2 text-sm break-words">
                  {currentRow[header] !== null && currentRow[header] !== undefined && currentRow[header] !== "" ? (
                    String(currentRow[header])
                  ) : (
                    <span className="text-muted-foreground italic">Empty</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Navigation */}
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setCurrentRowIndex(0)} disabled={currentRowIndex === 0}>
          First Row
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentRowIndex(data.length - 1)}
          disabled={currentRowIndex === data.length - 1}
        >
          Last Row
        </Button>
      </div>

      {/* Subtasks Section */}
      <SubtaskContainer>
        <SubtaskCard stepNumber={4} taskNumber={1} TaskComponent={Step4Task1} />
        <SubtaskCard stepNumber={4} taskNumber={2} TaskComponent={Step4Task2} />
        <SubtaskCard stepNumber={4} taskNumber={3} TaskComponent={Step4Task3} />
      </SubtaskContainer>
    </div>
  )
}
