"use client"

import { useDataStore } from "@/lib/data-store-context"

export function Step2Task2() {
  const { dataStore } = useDataStore()

  const latestFile = dataStore.originalData.files[dataStore.originalData.files.length - 1]
  const data = latestFile ? dataStore.originalData.rawData[latestFile.id] : []
  const headers = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        This is <span className="font-semibold">Step 2 - Task 2</span>
      </p>
      <p className="text-xs">Total columns: {headers.length}</p>
    </div>
  )
}
