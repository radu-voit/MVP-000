"use client"

import { useDataStore } from "@/lib/data-store-context"

export function Step2Task3() {
  const { dataStore } = useDataStore()

  const latestFile = dataStore.originalData.files[dataStore.originalData.files.length - 1]

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        This is <span className="font-semibold">Step 2 - Task 3</span>
      </p>
      <p className="text-xs">File name: {latestFile?.name || "No file"}</p>
    </div>
  )
}
