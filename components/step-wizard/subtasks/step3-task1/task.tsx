"use client"

import { useDataStore } from "@/lib/data-store-context"

export function Step3Task1() {
  const { dataStore } = useDataStore()

  const latestFile = dataStore.originalData.files[dataStore.originalData.files.length - 1]
  const data = latestFile ? dataStore.originalData.rawData[latestFile.id] : []

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        This is <span className="font-semibold">Step 3 - Task 1</span>
      </p>
      <p className="text-xs">Grid rows: {data.length}</p>
    </div>
  )
}
