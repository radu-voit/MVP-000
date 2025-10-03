"use client"

import { useDataStore } from "@/lib/data-store-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, ArrowUpDown, Search } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { useState, useMemo } from "react"

export function DataGridStep() {
  const { dataStore } = useDataStore()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  // Extract headers from the first row
  const files = dataStore?.originalData?.files || []
  const latestFile = files.length > 0 ? files[files.length - 1] : null
  const data = dataStore?.originalData?.rawData[latestFile?.id] || []
  const headers = Object.keys(data[0] || {})

  const columns: ColumnDef<any>[] = useMemo(
    () =>
      headers.map((header) => ({
        accessorKey: header,
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 font-semibold"
            >
              {header}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ getValue }) => {
          const value = getValue()
          return value !== null && value !== undefined && value !== "" ? String(value) : "-"
        },
      })),
    [headers],
  )

  // Check if dataStore exists
  const isDataStoreInitialized = !!dataStore && !!dataStore.originalData
  const isDataAvailable = !!latestFile && !!data && Array.isArray(data) && data.length > 0
  const areColumnsFound = headers.length > 0

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Grid</CardTitle>
          <CardDescription>
            {isDataStoreInitialized && isDataAvailable && areColumnsFound
              ? `Viewing ${data.length.toLocaleString()} rows × ${headers.length} columns from ${latestFile.name}`
              : "View and interact with your uploaded data"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isDataStoreInitialized && isDataAvailable && areColumnsFound && (
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search all columns..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="max-w-sm"
              />
            </div>
          )}

          {isDataStoreInitialized && isDataAvailable && areColumnsFound ? (
            <div className="rounded-md border">
              <div className="max-h-[500px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        <TableHead className="w-12 bg-muted/50">#</TableHead>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id} className="bg-muted/50">
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                      table.getRowModel().rows.map((row, idx) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium text-muted-foreground">
                            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + idx + 1}
                          </TableCell>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={headers.length + 1} className="h-24 text-center">
                          No results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {isDataStoreInitialized ? (
                  isDataAvailable ? (
                    areColumnsFound ? (
                      <div>No results found.</div>
                    ) : (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>No columns found in the data.</AlertDescription>
                      </Alert>
                    )
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>No data available. Please upload a file in Step 1.</AlertDescription>
                    </Alert>
                  )
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Data store not initialized. Please refresh the page.</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          )}

          {isDataStoreInitialized && isDataAvailable && areColumnsFound && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length,
                )}{" "}
                of {table.getFilteredRowModel().rows.length.toLocaleString()} rows
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
