"use client"

import { useDataStore } from "@/lib/data-store-context"
import { Card } from "@/components/ui/card"
import { FileSpreadsheet, AlertCircle, Table2, Columns3, FileX } from "lucide-react"

/**
 * TABLE SUMMARY STEP PACKAGE
 *
 * Displays key metrics of uploaded table data from the data store.
 * Shows number of rows, headers, and empty fields.
 *
 * @see docs/PACKAGES.md for package documentation
 * @see docs/DEV_NOTES.md for development notes
 */

export function TableSummaryStep() {
  const { dataStore, getOriginalData } = useDataStore()

  // Get the most recently uploaded file
  const latestFile = dataStore.originalData.files[dataStore.originalData.files.length - 1]
  const tableData = latestFile ? getOriginalData(latestFile.id) : undefined

  if (!latestFile || !tableData) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Table Summary</h2>
          <p className="text-muted-foreground">View key metrics of your uploaded data</p>
        </div>

        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-1">No data uploaded</p>
          <p className="text-sm text-muted-foreground">Please upload a file in the previous step</p>
        </Card>
      </div>
    )
  }

  const columns = tableData.length > 0 ? Object.keys(tableData[0]) : []
  const rowCount = tableData.length
  const headerCount = columns.length

  // Count empty fields across all rows
  let emptyFieldCount = 0
  tableData.forEach((row) => {
    columns.forEach((col) => {
      const value = row[col]
      if (value === null || value === undefined || value === "" || (typeof value === "string" && value.trim() === "")) {
        emptyFieldCount++
      }
    })
  })

  const totalFields = rowCount * headerCount
  const emptyPercentage = totalFields > 0 ? ((emptyFieldCount / totalFields) * 100).toFixed(1) : "0"

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Table Summary</h2>
        <p className="text-muted-foreground">Key metrics of your uploaded data</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Number of Rows */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Table2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Rows</p>
              <p className="text-3xl font-bold">{rowCount.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* Number of Headers */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Columns3 className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Headers</p>
              <p className="text-3xl font-bold">{headerCount}</p>
            </div>
          </div>
        </Card>

        {/* Empty Fields */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <FileX className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Empty Fields</p>
              <p className="text-3xl font-bold">{emptyFieldCount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">{emptyPercentage}% of total</p>
            </div>
          </div>
        </Card>
      </div>

      {/* File Info Card */}
      <Card className="p-6 bg-muted/50">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="font-medium">{latestFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {(latestFile.size / 1024).toFixed(2)} KB • Uploaded {latestFile.uploadedAt.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
