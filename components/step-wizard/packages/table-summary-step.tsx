"use client"

import { useDataStore } from "@/lib/data-store-context"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileSpreadsheet, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

/**
 * TABLE SUMMARY STEP PACKAGE
 *
 * Displays a summary of uploaded table data from the data store.
 * Shows file information, row/column counts, and a preview of the data.
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
          <p className="text-muted-foreground">View a summary of your uploaded data</p>
        </div>

        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-1">No data uploaded</p>
          <p className="text-sm text-muted-foreground">Please upload a file in the previous step</p>
        </Card>
      </div>
    )
  }

  // Get column names from first row
  const columns = tableData.length > 0 ? Object.keys(tableData[0]) : []
  const rowCount = tableData.length
  const columnCount = columns.length

  // Preview first 10 rows
  const previewData = tableData.slice(0, 10)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Table Summary</h2>
        <p className="text-muted-foreground">Overview of your uploaded data</p>
      </div>

      {/* File Information */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <FileSpreadsheet className="h-8 w-8 text-primary" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{latestFile.name}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{rowCount} rows</Badge>
              <Badge variant="secondary">{columnCount} columns</Badge>
              <Badge variant="secondary">{(latestFile.size / 1024).toFixed(2)} KB</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Uploaded {latestFile.uploadedAt.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      {/* Column Names */}
      <Card className="p-6">
        <h3 className="font-semibold mb-3">Columns ({columnCount})</h3>
        <div className="flex flex-wrap gap-2">
          {columns.map((col, idx) => (
            <Badge key={idx} variant="outline">
              {col}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Data Preview */}
      <Card className="p-6">
        <h3 className="font-semibold mb-3">Data Preview (First 10 rows)</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                {columns.map((col, idx) => (
                  <TableHead key={idx}>{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewData.map((row, rowIdx) => (
                <TableRow key={rowIdx}>
                  <TableCell className="font-medium">{rowIdx + 1}</TableCell>
                  {columns.map((col, colIdx) => (
                    <TableCell key={colIdx}>
                      {row[col] !== null && row[col] !== undefined ? String(row[col]) : "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {rowCount > 10 && (
          <p className="text-sm text-muted-foreground mt-4 text-center">Showing 10 of {rowCount} rows</p>
        )}
      </Card>
    </div>
  )
}
