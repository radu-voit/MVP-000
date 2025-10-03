"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, FileSpreadsheet, FileText, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useDataStore } from "@/lib/data-store-context"
import { useStepWizard } from "@/lib/step-wizard-context"
import Papa from "papaparse"
import * as XLSX from "xlsx"

/**
 * UPLOADER STEP PACKAGE
 *
 * Handles file uploads for CSV and Excel files.
 * Parses files and stores data in the central data store.
 *
 * Supported formats:
 * - CSV (.csv)
 * - Excel (.xlsx, .xls)
 *
 * @see docs/PACKAGES.md for package documentation
 * @see docs/DEV_NOTES.md for development notes
 */

export function UploaderStep() {
  const { addOriginalData, dataStore, setProcessingStatus, addError } = useDataStore()
  const { nextStep } = useStepWizard()
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [uploadMessage, setUploadMessage] = useState("")

  const parseCSV = useCallback((file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error(`CSV parsing errors: ${results.errors.map((e) => e.message).join(", ")}`))
          } else {
            resolve(results.data)
          }
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  }, [])

  const parseExcel = useCallback((file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = e.target?.result
          const workbook = XLSX.read(data, { type: "binary" })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet)
          resolve(jsonData)
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.readAsBinaryString(file)
    })
  }, [])

  const handleFileUpload = useCallback(
    async (file: File) => {
      setUploadStatus("uploading")
      setUploadMessage(`Uploading ${file.name}...`)
      setProcessingStatus("processing")

      try {
        let parsedData: any[] = []

        // Parse based on file type
        if (file.name.endsWith(".csv")) {
          parsedData = await parseCSV(file)
        } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
          parsedData = await parseExcel(file)
        } else {
          throw new Error("Unsupported file type. Please upload CSV or Excel files.")
        }

        // Generate unique file ID
        const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        // Store in data store
        addOriginalData(fileId, file.name, file.type, file.size, parsedData)

        setUploadStatus("success")
        setUploadMessage(`Successfully uploaded ${file.name} with ${parsedData.length} rows`)
        setProcessingStatus("complete")

        setTimeout(() => {
          nextStep()
        }, 1500) // Brief delay to show success message
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
        setUploadStatus("error")
        setUploadMessage(errorMessage)
        setProcessingStatus("error")
        addError(errorMessage)
      }
    },
    [addOriginalData, parseCSV, parseExcel, setProcessingStatus, addError, nextStep],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileUpload(files[0])
      }
    },
    [handleFileUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFileUpload(files[0])
      }
    },
    [handleFileUpload],
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Upload Data</h2>
        <p className="text-muted-foreground">Upload CSV or Excel files to begin processing</p>
      </div>

      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed p-12 text-center transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center gap-4">
          <Upload className="h-12 w-12 text-muted-foreground" />
          <div>
            <p className="text-lg font-medium mb-1">Drag and drop your file here</p>
            <p className="text-sm text-muted-foreground">or click to browse</p>
          </div>
          <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileInput} className="hidden" id="file-upload" />
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Select File
            </label>
          </Button>
          <p className="text-xs text-muted-foreground">Supported formats: CSV, Excel (.xlsx, .xls)</p>
        </div>
      </Card>

      {/* Upload Status */}
      {uploadStatus !== "idle" && (
        <Card className="p-4">
          <div className="flex items-start gap-3">
            {uploadStatus === "uploading" && (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            )}
            {uploadStatus === "success" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
            {uploadStatus === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
            <div className="flex-1">
              <p className="font-medium">
                {uploadStatus === "uploading" ? "Processing..." : uploadStatus === "success" ? "Success" : "Error"}
              </p>
              <p className="text-sm text-muted-foreground">{uploadMessage}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Uploaded Files List */}
      {dataStore.originalData.files.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">Uploaded Files</h3>
          {dataStore.originalData.files.map((file) => (
            <Card key={file.id} className="p-4">
              <div className="flex items-center gap-3">
                {file.name.endsWith(".csv") ? (
                  <FileText className="h-5 w-5 text-blue-500" />
                ) : (
                  <FileSpreadsheet className="h-5 w-5 text-green-500" />
                )}
                <div className="flex-1">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB • Uploaded {file.uploadedAt.toLocaleString()}
                  </p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
