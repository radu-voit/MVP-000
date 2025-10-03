"use client"

import { useDataStore } from "@/lib/data-store-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function DataGridStep() {
  const { dataStore } = useDataStore()

  // Get the most recent uploaded file
  const latestFile = dataStore.originalData.files[dataStore.originalData.files.length - 1]
  const data = latestFile ? dataStore.originalData.rawData[latestFile.id] : null

  if (!latestFile || !data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Grid</CardTitle>
          <CardDescription>View your uploaded data in a table format</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>No data available. Please upload a file in Step 1.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  // Extract headers from the first row
  const headers = Object.keys(data[0] || {})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Grid</CardTitle>
        <CardDescription>
          Viewing {data.length} rows × {headers.length} columns from {latestFile.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 bg-muted/50">#</TableHead>
                {headers.map((header) => (
                  <TableHead key={header} className="bg-muted/50 font-semibold">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="font-medium text-muted-foreground">{rowIndex + 1}</TableCell>
                  {headers.map((header) => (
                    <TableCell key={`${rowIndex}-${header}`}>
                      {row[header] !== null && row[header] !== undefined && row[header] !== ""
                        ? String(row[header])
                        : "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
