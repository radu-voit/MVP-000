"use client"

import { useDataStore } from "@/lib/data-store-context"

export function Step3Task3() {
  const { dataStore } = useDataStore()

  const latestFile = dataStore.originalData.files[dataStore.originalData.files.length - 1]
  const data = latestFile ? dataStore.originalData.rawData[latestFile.id] : []
  const headers = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        This is <span className="font-semibold">Step 3 - Task 3</span>
      </p>
      <p className="text-xs">Grid columns: {headers.length}</p>
    </div>
  )
}
